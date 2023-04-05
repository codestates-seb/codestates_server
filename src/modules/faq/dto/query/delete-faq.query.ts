import { Property } from 'kyoongdev-nestjs';
export class DeleteFaqQuery {
  @Property({ apiProperty: { type: 'string', description: 'FAQ 아이디 (,로 이어주세요)', example: 'id1,id2' } })
  faqIds: string;
}
