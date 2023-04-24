import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { MovieService } from 'modules/movie/movie.service';
import { UserService } from 'modules/user/user.service';
import { BookmarkDTO } from './dto';
export declare class BookmarkService {
    private readonly database;
    private readonly movieService;
    private readonly userService;
    constructor(database: PrismaService, movieService: MovieService, userService: UserService);
    findBookmark(userId: string, movieId: string): Promise<BookmarkDTO>;
    findBookmarkByUserIdWithPaging(paging: PagingDTO, userId: string, args?: Prisma.MovieBookmarkFindManyArgs): Promise<PaginationDTO<BookmarkDTO>>;
    findBookmarksByUserId(userId: string): Promise<BookmarkDTO[]>;
    createBookmark(userId: string, movieId: string): Promise<void>;
    deleteBookmark(userId: string, movieId: string): Promise<void>;
}
