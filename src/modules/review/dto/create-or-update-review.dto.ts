import { MovieReview } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
export class CreateOrUpdateReviewDTO {
  @Property({ apiProperty: { type: 'string' } })
  content: string;

  constructor(props: Partial<MovieReview>) {
    this.content = props.content;
  }
}
