import { PagingDTO, Property } from 'kyoongdev-nestjs';

type SortType = 'NAME' | 'CREATED_AT' | 'LIKE';
type SortBy = 'asc' | 'desc';

export class FindMovieByGenreQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', description: '장르 id들 ,로 구분', example: 'genre-id1,genre-id2' } })
  genreIds: string;

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
