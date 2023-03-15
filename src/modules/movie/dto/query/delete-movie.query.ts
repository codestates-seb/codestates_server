import { Property } from 'kyoongdev-nestjs';
export class DeleteMovieQuery {
  @Property({ apiProperty: { type: 'string', description: ',로 구분된 movie id들', example: 'movie1-id,movie2-id' } })
  ids: string;
}
