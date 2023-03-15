import { Property } from 'kyoongdev-nestjs';

export class CreateStaffDTO {
  @Property({ apiProperty: { type: 'string' } })
  name: string;

  @Property({ apiProperty: { type: 'string' } })
  role: string;
}
