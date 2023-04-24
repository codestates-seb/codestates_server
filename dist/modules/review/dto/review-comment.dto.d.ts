import { ReviewComment, User } from '@prisma/client';
import { UserDTO } from 'modules/user/dto';
export interface ReviewCommentDTOProps extends Partial<ReviewComment> {
    user: Partial<User>;
}
export declare class ReviewCommentDTO {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserDTO;
    constructor(props: ReviewCommentDTOProps);
}
