import { Movie, MovieLike, MovieReview } from '@prisma/client';
import { ActorDTO, ActorDTOProps } from './actor.dto';
import { CategoryDTO, CategoryDTOProps } from './category.dto';
import { GenreDTO, GenreDTOProps } from './genre.dto';
import { StaffDTO, StaffDTOProps } from './staff.dto';
export interface MovieDTOProps extends Partial<Movie> {
    movieGenres: GenreDTOProps[];
    movieActors: ActorDTOProps[];
    movieStaffs: StaffDTOProps[];
    movieLikes: MovieLike[];
    movieCategories: CategoryDTOProps[];
    reviews: Partial<MovieReview>[];
}
export declare class MovieDTO {
    id: string;
    title: string;
    postImage: string;
    plot: string;
    releasedAt: string;
    runtime: string;
    company: string;
    isLiked: boolean;
    likeCount: number;
    averageScore: number;
    genres: GenreDTO[];
    actors: ActorDTO[];
    staffs: StaffDTO[];
    categories: CategoryDTO[];
    constructor(props: MovieDTOProps, userId?: string);
}
