import { User } from '@prisma/client';
import { PagingDTO } from 'kyoongdev-nestjs';
import { CreateUserDTO, MeDTO, UpdateUserDTO, UserCountDTO, UserDTO, UserInfoDTO } from './dto';
import { DeleteUsersQuery, FindUsersQuery } from './dto/query';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserCount(): Promise<UserCountDTO>;
    findMe(user: User): Promise<MeDTO>;
    getMyInfo(user: User): Promise<UserInfoDTO>;
    getUserInfo(userId: string): Promise<UserInfoDTO>;
    findUser(id: string): Promise<UserDTO>;
    findUsers(paging: PagingDTO, query: FindUsersQuery): Promise<import("kyoongdev-nestjs").PaginationDTO<UserDTO>>;
    createUser(body: CreateUserDTO): Promise<string>;
    updateUser(id: string, body: UpdateUserDTO): Promise<void>;
    updateMe(user: User, body: UpdateUserDTO): Promise<void>;
    deleteUser(id: string): Promise<void>;
    deleteUsers(query: DeleteUsersQuery): Promise<void>;
}
