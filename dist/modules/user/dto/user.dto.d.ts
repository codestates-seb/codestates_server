import { User, UserGender } from '@prisma/client';
import { GenreDTO, GenreDTOProps } from 'modules/movie/dto';
export interface UserDTOProps extends Partial<User> {
    preferredGenres?: GenreDTOProps[];
    reviewCount?: number;
    likeCount?: number;
}
export declare class UserDTO {
    id: string;
    name?: string;
    birth?: string;
    nickname?: string;
    email: string;
    description?: string;
    profileImage?: string;
    gender: UserGender;
    isPublic?: boolean;
    isLikeView?: boolean;
    isReviewView?: boolean;
    isPreferenceView?: boolean;
    preferredGenres?: GenreDTO[];
    reviewCount: number;
    likeCount: number;
    createdAt: Date;
    updatedAt: Date;
    constructor(props: UserDTOProps);
}
