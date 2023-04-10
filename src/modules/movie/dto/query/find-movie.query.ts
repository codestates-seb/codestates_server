import { IsEnum } from 'class-validator';
import { PagingDTO, Property } from 'kyoongdev-nestjs';

type SortType = 'NAME' | 'RELEASED_AT' | 'LIKE';
type SortBy = 'asc' | 'desc';

export class FindMovieQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '영화 제목 | 감독 이름 | 배우 이름|' } })
  title?: string;

  @Property({
    apiProperty: {
      type: 'string',
      nullable: true,
      description: '정렬 - 영화명 , 개봉, 좋아요',
      example: 'NAME(영화명) | RELEASED_AT(개봉일) | LIKE',
    },
  })
  @IsEnum(['NAME', 'RELEASED_AT', 'LIKE'], {
    message: '정렬 방식은 NAME, RELEASED_AT, LIKE 중 하나여야 합니다.',
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
