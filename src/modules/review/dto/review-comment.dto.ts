import { ReviewComment, User } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
import { UserDTO } from 'modules/user/dto';
export interface ReviewCommentDTOProps extends Partial<ReviewComment> {
  user: Partial<User>;
}

export class ReviewCommentDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({ apiProperty: { type: 'string' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string' } })
  updatedAt: Date;

  @Property({ apiProperty: { type: UserDTO } })
  user: UserDTO;

  constructor(props: ReviewCommentDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.user = new UserDTO(props.user);
  }
}
