import { Movie, MovieLike, MovieScore } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
import { ActorDTO, ActorDTOProps } from './actor.dto';
import { GenreDTO, GenreDTOProps } from './genre.dto';
import { StaffDTO, StaffDTOProps } from './staff.dto';

export interface MovieDTOProps extends Partial<Movie> {
  movieGenres: GenreDTOProps[];
  movieActors: ActorDTOProps[];
  movieStaffs: StaffDTOProps[];
  movieLikes: MovieLike[];
  movieScores: Partial<MovieScore>[];
}

export class MovieDTO {
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

  @Property({ apiProperty: { type: 'boolean' } })
  isLiked: boolean;

  @Property({ apiProperty: { type: 'number' } })
  averageScore: number;

  @Property({ apiProperty: { type: GenreDTO, isArray: true } })
  genres: GenreDTO[];

  @Property({ apiProperty: { type: ActorDTO, isArray: true } })
  actors: ActorDTO[];

  @Property({ apiProperty: { type: StaffDTO, isArray: true } })
  staffs: StaffDTO[];

  constructor(props: MovieDTOProps, userId?: string) {
    this.id = props.id;
    this.title = props.title;
    this.postImage = props.postImage;
    this.plot = props.plot;
    this.releasedAt = props.releasedAt;
    this.runtime = props.runtime;
    this.company = props.company;
    this.isLiked = userId ? props.movieLikes.some((like) => like.userId === userId) : false;
    this.averageScore =
      props.movieScores.reduce<number>((acc, next) => (acc += next.score || 0), 0) / props.movieScores.length;
    this.genres = props.movieGenres.map((genre) => new GenreDTO(genre));
    this.actors = props.movieActors.map((actor) => new ActorDTO(actor));
    this.staffs = props.movieStaffs.map((staff) => new StaffDTO(staff));
  }
}
