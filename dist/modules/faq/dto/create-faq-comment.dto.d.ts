import { FAQComment } from '@prisma/client';
interface CreateFaqCommentDTOProps extends Partial<FAQComment> {
}
export declare class CreateFaqCommentDTO {
    content: string;
    constructor(props?: CreateFaqCommentDTOProps);
}
export {};
