import { Staff } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

export interface StaffDTOProps {
  movieId: string;
  staffId: string;
  staff: Staff;
}

export class StaffDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  name: string;

  @Property({ apiProperty: { type: 'string' } })
  role: string;

  constructor(props: StaffDTOProps) {
    this.id = props.staffId;
    this.name = props.staff.name;
    this.role = props.staff.role;
  }
}
