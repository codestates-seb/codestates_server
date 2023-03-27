import { FAQComment } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
import { UserDTO, UserDTOProps } from 'modules/user/dto';

export interface FaqCommentDTOProps extends Partial<FAQComment> {
  user: UserDTOProps;
}

export class FaqCommentDto {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  updatedAt: Date;

  @Property({ apiProperty: { type: UserDTO } })
  manager: UserDTO;

  constructor(props: FaqCommentDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.manager = new UserDTO(props.user);
  }
}
