import { User, UserGender } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
export class UserDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  birth?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  nickname?: string;

  @Property({ apiProperty: { type: 'string' } })
  email: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  description?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  profileImage?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, enum: UserGender, example: Object.keys(UserGender) } })
  gender: UserGender;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  updatedAt: Date;

  constructor(props: Partial<User>) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.gender = props.gender;
    this.nickname = props.nickname;
    this.description = props.description;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
