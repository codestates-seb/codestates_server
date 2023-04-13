import { IsEnum } from 'class-validator';
import { PagingDTO, Property } from 'kyoongdev-nestjs';

type SortType = 'LIKE_HIGH' | 'LIKE_LOW' | 'CREATED_AT';

export class FindReviewsWithMovieQuery {
  @Property({
    apiProperty: {
      type: 'string',
      nullable: true,
      description: '정렬 - LIKE_HIGH(좋아요 높은 순)| LIKE_LOW(좋아요 낮은 순) | CREATED_AT(최신)',
      example: 'LIKE_HIGH(좋아요 높은 순)| LIKE_LOW(좋아요 낮은 순) | CREATED_AT(최신) ',
    },
    validation: {
      each: true,
    },
  })
  @IsEnum(['LIKE_HIGH', 'CREATED_AT', 'LIKE_LOW'], {
    message: '정렬 방식은 LIKE_HIGH(좋아요 높은 순)| LIKE_LOW(좋아요 낮은 순) | CREATED_AT(최신) 중 하나여야 합니다.',
  })
  orderBy?: SortType;
}
