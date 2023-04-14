import { FAQ, User } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
import { UserDTO } from 'modules/user/dto';
import { FaqCommentDTOProps, FaqCommentDto } from './faq-comment.dto';

interface FAQsDTOProps extends Partial<FAQ> {
  user: Partial<User>;
  faqComments: FaqCommentDTOProps[];
}

export class FAQsDto {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  title: string;

  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  updatedAt: Date;

  @Property({ apiProperty: { type: FaqCommentDto, isArray: true } })
  faqComments: FaqCommentDto[];

  @Property({ apiProperty: { type: UserDTO } })
  user: UserDTO;

  constructor(props: FAQsDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.user = new UserDTO(props.user);
    this.faqComments = props.faqComments.map((faqComment) => new FaqCommentDto(faqComment));
  }
}
