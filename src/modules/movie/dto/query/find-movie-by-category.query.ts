import { Property } from 'kyoongdev-nestjs';
export class FindMovieByCategoryQuery {
  @Property({
    apiProperty: { type: 'string', description: ',로 구분된 category id들', example: 'category1-id,category2-id' },
  })
  categoryIds: string;
}
