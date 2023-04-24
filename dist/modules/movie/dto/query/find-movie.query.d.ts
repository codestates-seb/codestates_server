import { PagingDTO } from 'kyoongdev-nestjs';
type SortType = 'NAME' | 'RELEASED_AT' | 'LIKE';
type SortBy = 'asc' | 'desc';
export declare class FindMovieQuery extends PagingDTO {
    title?: string;
    orderBy?: SortType;
    sortBy?: SortBy;
}
export {};
