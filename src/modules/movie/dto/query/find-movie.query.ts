import { PagingDTO, Property } from 'kyoongdev-nestjs';
export class FindMovieQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '영화 제목' } })
  title?: string;
}
