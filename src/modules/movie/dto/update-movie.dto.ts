import { Property } from 'kyoongdev-nestjs';
export class UpdateMovieDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  title?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  plot?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  releasedAt?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  rating?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  runtime?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  company?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true } })
  genres?: string[];

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true } })
  staffs?: string[];

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true } })
  actors?: string[];
}
