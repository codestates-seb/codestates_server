import { PagingDTO, Property } from 'kyoongdev-nestjs';
export class FindUsersQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  nickname?: string;
}
