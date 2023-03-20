import { MovieReview } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
export class CreateReviewDTO {
  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({ apiProperty: { type: 'number' } })
  score: number;

  constructor(props?: Partial<MovieReview>) {
    if (props) {
      this.content = props.content;
      this.score = props.score;
    }
  }
}
