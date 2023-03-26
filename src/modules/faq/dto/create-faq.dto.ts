import { FAQ } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

interface CreateFaqDTOProps extends Partial<FAQ> {}

export class CreateFaqDTO {
  @Property({ apiProperty: { type: 'string' } })
  title: string;

  @Property({ apiProperty: { type: 'string' } })
  content: string;

  constructor(props?: CreateFaqDTOProps) {
    if (props) {
      this.title = props.title;
      this.content = props.content;
    }
  }
}
