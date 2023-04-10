import { Movie } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
export interface MoviesDTOProps extends Partial<Movie> {}
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
  constructor(props: MoviesDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.postImage = props.postImage;
    this.plot = props.plot;
    this.releasedAt = props.releasedAt;
    this.runtime = props.runtime;
    this.company = props.company;
  }
}
