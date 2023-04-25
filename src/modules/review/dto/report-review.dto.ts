import { Property } from 'kyoongdev-nestjs';
export class ReportReviewDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  title?: string;

  @Property({ apiProperty: { type: 'string' } })
  content: string;

  constructor(props: { id: string; title?: string; content: string }) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
  }
}
