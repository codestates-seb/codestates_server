import { PagingDTO } from 'kyoongdev-nestjs';
type SortType = 'NAME' | 'CREATED_AT' | 'LIKE';
type SortBy = 'asc' | 'desc';
export declare class FindMovieByGenreQuery extends PagingDTO {
    genreIds: string;
    orderBy?: SortType;
    sortBy?: SortBy;
}
export {};
