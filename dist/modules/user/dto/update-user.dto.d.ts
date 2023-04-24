import { UserGender } from '@prisma/client';
interface Props {
    name?: string;
    email?: string;
    password: string;
    birth?: string;
    nickname?: string;
    description?: string;
    profileImage?: string;
    gender?: UserGender;
    isPublic?: boolean;
    isLikeView?: boolean;
    isReviewView?: boolean;
    isPreferenceView?: boolean;
    preferredGenres?: string[];
}
export declare class UpdateUserDTO {
    email?: string;
    password?: string;
    name?: string;
    birth?: string;
    nickname?: string;
    description?: string;
    profileImage?: string;
    isPublic?: boolean;
    isLikeView?: boolean;
    isReviewView?: boolean;
    isPreferenceView?: boolean;
    preferredGenres?: string[];
    gender: UserGender;
    constructor(props?: Props);
    hashPassword(salt: number): Promise<void>;
}
export {};
