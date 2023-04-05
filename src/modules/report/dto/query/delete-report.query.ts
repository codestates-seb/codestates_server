import { Property } from 'kyoongdev-nestjs';
export class DeleteReportQuery {
  @Property({ apiProperty: { type: 'string', description: '신고 아이디 (,로 이어주세요)', example: 'id1,id2' } })
  reportIds: string;
}
