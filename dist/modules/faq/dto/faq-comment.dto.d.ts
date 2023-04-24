import { FAQComment } from '@prisma/client';
import { UserDTO, UserDTOProps } from 'modules/user/dto';
export interface FaqCommentDTOProps extends Partial<FAQComment> {
    user: UserDTOProps;
}
export declare class FaqCommentDto {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    manager: UserDTO;
    constructor(props: FaqCommentDTOProps);
}
