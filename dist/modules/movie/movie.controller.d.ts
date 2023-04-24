import { User } from '@prisma/client';
import { PagingDTO } from 'kyoongdev-nestjs';
import { CategoryDTO, CreateCategoryDTO, GenreDTO, MovieDTO, UpdateMovieDTO } from './dto';
import { MovieCountDTO } from './dto/movie-count.dto';
import { DeleteMovieQuery, FindMovieByCategoryQuery, FindMovieByGenreQuery, FindMovieQuery } from './dto/query';
import { MovieService } from './movie.service';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    getMovies(paging: PagingDTO, query: FindMovieQuery, user?: User): Promise<import("kyoongdev-nestjs").PaginationDTO<MovieDTO>>;
    getMovieCount(): Promise<MovieCountDTO>;
    getMyMovieLikes(user: User): Promise<MovieDTO[]>;
    getMoviesByGenre(paging: PagingDTO, query?: FindMovieByGenreQuery, user?: User): Promise<import("kyoongdev-nestjs").PaginationDTO<MovieDTO>>;
    getMoviesByTop(user?: User): Promise<import("kyoongdev-nestjs").PaginationDTO<MovieDTO>>;
    getRelatedMovies(id: string): Promise<MovieDTO[]>;
    getMoviesByCategory(paging: PagingDTO, query?: FindMovieByCategoryQuery, user?: User): Promise<import("kyoongdev-nestjs").PaginationDTO<MovieDTO>>;
    getMovie(id: string, user?: User): Promise<MovieDTO>;
    getCategories(): Promise<CategoryDTO[]>;
    getGenres(): Promise<GenreDTO[]>;
    getUserMovieLike(userId: string): Promise<MovieDTO[]>;
    updateMovie(id: string, body: UpdateMovieDTO): Promise<void>;
    deleteMovie(id: string): Promise<void>;
    deleteMovies(query: DeleteMovieQuery): Promise<void>;
    createMovieLike(id: string, user: User): Promise<void>;
    deleteMovieLike(id: string, user: User): Promise<void>;
    createCategory(body: CreateCategoryDTO): Promise<string>;
    deleteCategory(id: string): Promise<void>;
}
