import { Property } from 'kyoongdev-nestjs';

export class CreateReviewCommentDTO {
  @Property({ apiProperty: { type: 'string' } })
  content: string;
}
