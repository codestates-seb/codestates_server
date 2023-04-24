import { User } from '@prisma/client';
import { PagingDTO } from 'kyoongdev-nestjs';
import { BookmarkService } from './bookmark.service';
import { BookmarkDTO } from './dto';
export declare class BookmarkController {
    private readonly bookmarkService;
    constructor(bookmarkService: BookmarkService);
    getMyBookmarks(user: User): Promise<BookmarkDTO[]>;
    getUserBookmarks(userId: string): Promise<BookmarkDTO[]>;
    getMyBookmarksWithPaging(paging: PagingDTO, user: User): Promise<import("kyoongdev-nestjs").PaginationDTO<BookmarkDTO>>;
    createBookmark(movieId: string, user: User): Promise<void>;
    deleteBookmark(movieId: string, user: User): Promise<void>;
}
