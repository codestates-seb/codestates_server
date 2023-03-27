import { Genre } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

export interface GenreDTOProps {
  movieId?: string;
  genreId: string;
  genre: Genre;
}

export class GenreDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  name: string;

  constructor(props: GenreDTOProps) {
    this.id = props.genreId;
    this.name = props.genre.name;
  }
}
