import { User, UserGender, UserType } from '@prisma/client';
import { GenreDTO, GenreDTOProps } from 'modules/movie/dto';
interface UserDetailDTOProps extends Partial<User> {
    preferredGenres?: GenreDTOProps[];
}
export declare class UserDetailDTO {
    id: string;
    email?: string;
    name?: string;
    birth?: string;
    nickname?: string;
    password?: string;
    description?: string;
    profileImage?: string;
    gender: UserGender;
    isPublic?: boolean;
    isLikeView?: boolean;
    isReviewView?: boolean;
    isPreferenceView?: boolean;
    userType: UserType;
    preferredGenres?: GenreDTO[];
    createdAt?: Date;
    updatedAt?: Date;
    constructor(props: UserDetailDTOProps);
    comparePassword(password: string): Promise<boolean>;
}
export {};
