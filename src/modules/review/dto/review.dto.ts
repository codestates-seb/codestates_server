import { MovieReview, User } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
import { UserDTO } from 'modules/user/dto';

export interface ReviewDTOProps extends Partial<MovieReview> {
  user: Partial<User>;
}
export class ReviewDto {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  updatedAt: Date;

  @Property({ apiProperty: { type: UserDTO } })
  user: UserDTO;

  constructor(props: ReviewDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.user = new UserDTO(props.user);
  }
}
