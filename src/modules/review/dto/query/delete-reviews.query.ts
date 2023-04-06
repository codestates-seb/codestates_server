import { Property } from 'kyoongdev-nestjs';
export class DeleteReviewsQuery {
  @Property({ apiProperty: { type: 'string', description: '리뷰 id들 (,로 구분)' } })
  reviewIds: string;
}
