import { FAQ, FAQComment } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

interface CreateFaqCommentDTOProps extends Partial<FAQComment> {}

export class CreateFaqCommentDTO {
  @Property({ apiProperty: { type: 'string' } })
  content: string;

  constructor(props?: CreateFaqCommentDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
