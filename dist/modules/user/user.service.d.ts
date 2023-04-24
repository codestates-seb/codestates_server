import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { MovieService } from 'modules/movie/movie.service';
import { ReviewService } from 'modules/review/review.service';
import { CreateUserDTO, UpdateUserDTO, UserCountDTO, UserDetailDTO, UserDTO, UserInfoDTO } from './dto';
import { UserException } from './user.exception';
export declare class UserService {
    private readonly database;
    private readonly exception;
    private readonly config;
    private readonly reviewService;
    private readonly movieService;
    constructor(database: PrismaService, exception: UserException, config: ConfigService, reviewService: ReviewService, movieService: MovieService);
    getUserTotalCount(): Promise<UserCountDTO>;
    getUserInfo(userId: string): Promise<UserInfoDTO>;
    findUsers(paging: PagingDTO, args?: Prisma.UserFindManyArgs): Promise<PaginationDTO<UserDTO>>;
    findUser(id: string): Promise<UserDetailDTO>;
    createUser(props: CreateUserDTO): Promise<string>;
    updateUser(id: string, props: UpdateUserDTO): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
