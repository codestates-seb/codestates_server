import { PagingDTO } from 'kyoongdev-nestjs';
type SortType = 'NAME' | 'CREATED_AT' | 'LIKE' | 'USERNAME';
type SortBy = 'asc' | 'desc';
export declare class FindReviewsQuery extends PagingDTO {
    name?: string;
    nickname?: string;
    orderBy?: SortType;
    sortBy?: SortBy;
}
export {};
