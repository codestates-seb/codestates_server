import { MovieReview } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
export class UpdateReviewDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  content: string;

  @Property({ apiProperty: { type: 'number', nullable: true } })
  score: number;

  constructor(props?: Partial<MovieReview>) {
    if (props) {
      this.content = props.content;
      this.score = props.score;
    }
  }
}
