import { PagingDTO } from 'kyoongdev-nestjs';
type SortType = 'TITLE' | 'CREATED_AT' | 'USERNAME' | 'CONTENT';
type SortBy = 'asc' | 'desc';
export declare class FindFaqQuery extends PagingDTO {
    userName?: string;
    orderBy?: SortType;
    sortBy?: SortBy;
}
export {};
