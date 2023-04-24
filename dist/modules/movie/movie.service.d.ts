import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { UserService } from 'modules/user/user.service';
import { CategoryDTO, MovieDTO, UpdateMovieDTO, CreateCategoryDTO, GenreDTO } from './dto';
import { MovieCountDTO } from './dto/movie-count.dto';
export declare class MovieService {
    private readonly database;
    private readonly userService;
    constructor(database: PrismaService, userService: UserService);
    getMovieTotalCount(): Promise<MovieCountDTO>;
    findMovie(id: string, userId?: string): Promise<MovieDTO>;
    findMoviesByGenre(genreIds: string[]): Promise<MovieDTO[]>;
    findMovieGenres(): Promise<GenreDTO[]>;
    findMovies(paging: PagingDTO, args?: Prisma.MovieFindManyArgs, userId?: string): Promise<PaginationDTO<MovieDTO>>;
    findMoviesWithNoPaging(args?: Prisma.MovieFindManyArgs, userId?: string): Promise<MovieDTO[]>;
    getUserLikeCount(userId: string): Promise<number>;
    createMovieLike(movieId: string, userId: string): Promise<void>;
    deleteMovieLike(movieId: string, userId: string): Promise<void>;
    updateMovie(id: string, props: UpdateMovieDTO): Promise<void>;
    deleteMovie(id: string): Promise<void>;
    findCategory(id: string): Promise<CategoryDTO>;
    findCategories(): Promise<CategoryDTO[]>;
    findCategoryByName(name: string): Promise<CategoryDTO>;
    createCategory(props: CreateCategoryDTO): Promise<string>;
    deleteCategory(id: string): Promise<void>;
}
