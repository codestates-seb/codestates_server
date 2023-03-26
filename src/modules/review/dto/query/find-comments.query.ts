import { PagingDTO, Property } from 'kyoongdev-nestjs';

export class FindCommentsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  nickname?: string;
}
