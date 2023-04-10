import { PagingDTO, Property } from 'kyoongdev-nestjs';

type SortType = 'NAME' | 'CREATED_AT' | 'LIKE';
type SortBy = 'asc' | 'desc';

export class FindMovieQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '영화 제목 | 감독 이름 | 배우 이름|' } })
  title?: string;

  @Property({
    apiProperty: {
      type: 'string',
      nullable: true,
      description: '정렬 - 이름 , 최신, 좋아요',
      example: 'NAME | CREATED_AT | LIKE',
    },
  })
  orderBy?: SortType;

  @Property({
    apiProperty: {
      type: 'string',
      nullable: true,
      description: '정렬 방식 - 오름차순, 내림차순',
      example: 'asc(오름차순) | desc(내림차순)',
    },
  })
  sortBy?: SortBy;
}
