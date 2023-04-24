import { MovieReview, User } from '@prisma/client';
import { UserDTO } from 'modules/user/dto';
import { ReviewCommentDTO, ReviewCommentDTOProps } from './review-comment.dto';
import { MoviesDTO, MoviesDTOProps } from 'modules/movie/dto';
export interface ReviewDTOProps extends Partial<MovieReview> {
    user: Partial<User>;
    comments: ReviewCommentDTOProps[];
    likeCount: number;
    hateCount: number;
    isLiked?: boolean;
    isHated?: boolean;
    tensions: string[];
    enjoyPoints: string[];
    movie: MoviesDTOProps;
}
export declare class ReviewDto {
    id: string;
    title?: string;
    content: string;
    score: number;
    createdAt: Date;
    updatedAt: Date;
    user: UserDTO;
    comments: ReviewCommentDTO[];
    likeCount: number;
    hateCount: number;
    isLiked?: boolean;
    isHated?: boolean;
    enjoyPoints?: string[];
    tensions?: string[];
    movie: MoviesDTO;
    constructor(props: ReviewDTOProps);
}
