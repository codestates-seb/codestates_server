import { MovieReview } from '@prisma/client';
interface CreateReviewDTOProps extends Partial<MovieReview> {
    enjoyPoints?: string[];
    tensions: string[];
}
export declare class CreateReviewDTO {
    content?: string;
    title?: string;
    score: number;
    enjoyPoints?: string[];
    tensions: string[];
    constructor(props?: CreateReviewDTOProps);
}
export {};
