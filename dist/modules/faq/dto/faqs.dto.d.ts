import { FAQ, User } from '@prisma/client';
import { UserDTO } from 'modules/user/dto';
import { FaqCommentDTOProps, FaqCommentDto } from './faq-comment.dto';
interface FAQsDTOProps extends Partial<FAQ> {
    user: Partial<User>;
    faqComment?: FaqCommentDTOProps;
}
export declare class FAQsDto {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    faqComment?: FaqCommentDto;
    user: UserDTO;
    constructor(props: FAQsDTOProps);
}
export {};
