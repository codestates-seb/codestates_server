import { Property } from 'kyoongdev-nestjs';
import { CreateStaffDTO } from './create-staff.dto';
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

  @Property({ apiProperty: { type: CreateStaffDTO, nullable: true, isArray: true } })
  staffs?: CreateStaffDTO[];

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true } })
  actors?: string[];
}
