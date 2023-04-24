import { FAQComment } from '@prisma/client';
interface UpdateFaqCommentDTOProps extends Partial<FAQComment> {
}
export declare class UpdateFaqCommentDTO {
    content?: string;
    constructor(props?: UpdateFaqCommentDTOProps);
}
export {};
