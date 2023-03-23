import { PagingDTO, Property } from 'kyoongdev-nestjs';

export class FindReportsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  username?: string;
}
