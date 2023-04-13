import { IsEnum } from 'class-validator';
import { PagingDTO, Property } from 'kyoongdev-nestjs';

type SortType = 'SCORE_HIGH' | 'SCORE_LOW' | 'CREATED_AT';

export class FindReviewsWithMovieQuery {
  @Property({
    apiProperty: {
      type: 'string',
      nullable: true,
      description: '정렬 - SCORE_HIGH(점수 높은 순)| SCORE_LOW(점수 낮은 순) | CREATED_AT(최신)',
      example: 'SCORE_HIGH(점수 높은 순)| SCORE_LOW(점수 낮은 순) | CREATED_AT(최신) ',
    },
    validation: {
      each: true,
    },
  })
  @IsEnum(['SCORE_HIGH', 'CREATED_AT', 'SCORE_LOW'], {
    message: '정렬 방식은 SCORE_HIGH(점수 높은 순)| SCORE_LOW(점수 낮은 순) | CREATED_AT(최신) 중 하나여야 합니다.',
  })
  orderBy?: SortType;
}
