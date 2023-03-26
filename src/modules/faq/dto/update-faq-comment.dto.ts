import { FAQ, FAQComment } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

interface UpdateFaqCommentDTOProps extends Partial<FAQComment> {}

export class UpdateFaqCommentDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  content?: string;

  constructor(props?: UpdateFaqCommentDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
