import { IsEnum } from 'class-validator';
import { PagingDTO, Property } from 'kyoongdev-nestjs';

type SortType = 'NAME' | 'CREATED_AT' | 'EMAIL' | 'COMMENT_COUNT';
type SortBy = 'asc' | 'desc';
export class FindUsersQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  nickname?: string;

  @Property({
    apiProperty: {
      type: 'string',
      nullable: true,
      description: '정렬 - 이름, 가입일, 작성한 댓글, 이메일',
      example: 'NAME(이름) | CREATED_AT(가입일) | COMMENT_COUNT(작성한 댓글) | EMAIL(이메일)',
    },
    validation: {
      each: true,
    },
  })
  @IsEnum(['NAME', 'CREATED_AT', 'EMAIL', 'COMMENT_COUNT'], {
    message: '정렬 방식은 NAME, CREATED_AT, EMAIL, COMMENT_COUNT 중 하나여야 합니다.',
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
