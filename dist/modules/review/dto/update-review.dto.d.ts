import { MovieReview } from '@prisma/client';
interface UpdateReviewDTOProps extends Partial<MovieReview> {
    enjoyPoints?: string[];
    tensions: string[];
}
export declare class UpdateReviewDTO {
    content: string;
    title?: string;
    score: number;
    enjoyPoints?: string[];
    tensions: string[];
    constructor(props?: UpdateReviewDTOProps);
}
export {};
