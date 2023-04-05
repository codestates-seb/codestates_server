import { Property } from 'kyoongdev-nestjs';
export class DeleteUsersQuery {
  @Property({ apiProperty: { type: 'string', description: '유저 아이디 (,로 이어주세요)', example: 'id1,id2' } })
  userIds: string;
}
