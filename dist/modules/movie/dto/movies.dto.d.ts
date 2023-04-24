import { Movie, MovieReview } from '@prisma/client';
import { GenreDTO, GenreDTOProps } from './genre.dto';
export interface MoviesDTOProps extends Partial<Movie> {
    reviews: Partial<MovieReview>[];
    movieGenres: GenreDTOProps[];
}
export declare class MoviesDTO {
    id: string;
    title: string;
    postImage: string;
    plot: string;
    releasedAt: string;
    runtime: string;
    company: string;
    averageScore: number;
    genres: GenreDTO[];
    constructor(props: MoviesDTOProps);
}
