import { MovieReview } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
interface CreateReviewDTOProps extends Partial<MovieReview> {
  enjoyPoints?: string[];
  tensions: string[];
}

export class CreateReviewDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  content?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  title?: string;

  @Property({ apiProperty: { type: 'number' } })
  score: number;

  @Property({ apiProperty: { type: 'string', isArray: true, nullable: true } })
  enjoyPoints?: string[];

  @Property({ apiProperty: { type: 'string', isArray: true, nullable: true } })
  tensions: string[];

  constructor(props?: CreateReviewDTOProps) {
    if (props) {
      this.title = props.title;
      this.content = props.content;
      this.score = props.score;
      this.enjoyPoints = props.enjoyPoints;
      this.tensions = props.tensions;
    }
  }
}
