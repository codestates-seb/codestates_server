import { FAQ, User } from '@prisma/client';
import { UserDTO } from 'modules/user/dto';
import { FaqCommentDto, FaqCommentDTOProps } from './faq-comment.dto';
interface FAQDTOProps extends Partial<FAQ> {
    user: Partial<User>;
    faqComment?: FaqCommentDTOProps;
}
export declare class FAQDto {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserDTO;
    faqComment?: FaqCommentDto;
    constructor(props: FAQDTOProps);
}
export {};
