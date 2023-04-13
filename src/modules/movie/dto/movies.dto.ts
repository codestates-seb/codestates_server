import { Movie, MovieReview } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
import { GenreDTO, GenreDTOProps } from './genre.dto';
export interface MoviesDTOProps extends Partial<Movie> {
  reviews: Partial<MovieReview>[];
  movieGenres: GenreDTOProps[];
}

export class MoviesDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  title: string;

  @Property({ apiProperty: { type: 'string' } })
  postImage: string;

  @Property({ apiProperty: { type: 'string' } })
  plot: string;

  @Property({ apiProperty: { type: 'string' } })
  releasedAt: string;

  @Property({ apiProperty: { type: 'string' } })
  runtime: string;

  @Property({ apiProperty: { type: 'string' } })
  company: string;

  @Property({ apiProperty: { type: 'number' } })
  averageScore: number;

  @Property({ apiProperty: { type: GenreDTO, isArray: true } })
  genres: GenreDTO[];

  constructor(props: MoviesDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.postImage = props.postImage;
    this.plot = props.plot;
    this.releasedAt = props.releasedAt;
    this.runtime = props.runtime;
    this.company = props.company;
    this.averageScore = props.reviews.reduce<number>((acc, next) => (acc += next.score || 0), 0) / props.reviews.length;
    this.genres = props.movieGenres.map((genre) => new GenreDTO(genre));
  }
}
