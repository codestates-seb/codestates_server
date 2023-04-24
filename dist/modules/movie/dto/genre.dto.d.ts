import { Genre } from '@prisma/client';
export interface GenreDTOProps {
    movieId?: string;
    genreId: string;
    genre: Genre;
}
export declare class GenreDTO {
    id: string;
    name: string;
    constructor(props: GenreDTOProps);
}
