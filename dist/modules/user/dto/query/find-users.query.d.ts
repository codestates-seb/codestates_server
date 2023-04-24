import { PagingDTO } from 'kyoongdev-nestjs';
type SortType = 'NAME' | 'CREATED_AT' | 'EMAIL' | 'COMMENT_COUNT' | 'REVIEW_COUNT' | 'LIKE_COUNT';
type SortBy = 'asc' | 'desc';
export declare class FindUsersQuery extends PagingDTO {
    name?: string;
    nickname?: string;
    orderBy?: SortType;
    sortBy?: SortBy;
}
export {};
