import { IsEnum } from 'class-validator';
import { PagingDTO, Property } from 'kyoongdev-nestjs';

type SortType = 'NAME' | 'CREATED_AT' | 'LIKE' | 'USERNAME';
type SortBy = 'asc' | 'desc';

export class FindReviewsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  nickname?: string;

  @Property({
    apiProperty: {
      type: 'string',
      nullable: true,
      description: '정렬 - 영화명 , 최신순, 공감(좋아요), 작성자',
      example: 'NAME(영화명) | CREATED_AT(개봉일) | LIKE(공감) | USERNAME(작성자)',
    },
    validation: {
      each: true,
    },
  })
  @IsEnum(['NAME', 'CREATED_AT', 'LIKE', 'USERNAME'], {
    message: '정렬 방식은 NAME, CREATED_AT, LIKE, USERNAME 중 하나여야 합니다.',
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
