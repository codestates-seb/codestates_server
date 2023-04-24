import { MovieBookmark, User } from '@prisma/client';
import { MovieDTOProps, MovieDTO } from 'modules/movie/dto';
import { UserDTO } from 'modules/user/dto';
export interface BookmarkDTOProps extends MovieBookmark {
    user: Partial<User>;
    movie: MovieDTOProps;
}
export declare class BookmarkDTO {
    user: UserDTO;
    movie: MovieDTO;
    constructor(props: BookmarkDTOProps, userId?: string);
}
