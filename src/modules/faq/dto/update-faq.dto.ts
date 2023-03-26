import { FAQ } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

interface UpdateFaqDTOProps extends Partial<FAQ> {}

export class UpdateFaqDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  title?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  content?: string;

  constructor(props?: UpdateFaqDTOProps) {
    if (props) {
      this.title = props.title;
      this.content = props.content;
    }
  }
}
