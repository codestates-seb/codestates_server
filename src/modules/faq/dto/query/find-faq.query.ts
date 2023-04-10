import { IsEnum } from 'class-validator';
import { PagingDTO, Property } from 'kyoongdev-nestjs';

type SortType = 'TITLE' | 'CREATED_AT' | 'USERNAME' | 'CONTENT';
type SortBy = 'asc' | 'desc';
export class FindFaqQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  userName?: string;

  @Property({
    apiProperty: {
      type: 'string',
      nullable: true,
      description: '정렬 - 이름, 시간, 제목, 내용',
      example: 'USERNAME(이름) | CREATED_AT(시간) | TITLE(제목) | CONTENT(내용)',
    },
    validation: {
      each: true,
    },
  })
  @IsEnum(['USERNAME', 'CREATED_AT', 'TITLE', 'CONTENT'], {
    message: '정렬 방식은 USERNAME, CREATED_AT, TITLE, CONTENT 중 하나여야 합니다.',
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
