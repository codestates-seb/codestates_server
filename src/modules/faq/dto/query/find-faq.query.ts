import { PagingDTO, Property } from 'kyoongdev-nestjs';

export class FindFaqQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  userName?: string;
}
