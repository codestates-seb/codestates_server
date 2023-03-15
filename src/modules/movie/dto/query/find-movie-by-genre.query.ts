import { PagingDTO, Property } from 'kyoongdev-nestjs';

export class FindMovieByGenreQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', description: '장르 id들 ,로 구분', example: 'genre-id1,genre-id2' } })
  genreIds: string;
}
