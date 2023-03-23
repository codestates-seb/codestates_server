import { User, UserGender } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Property } from 'kyoongdev-nestjs';
export class UserDetailDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  birth?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  nickname?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  password?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  description?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  profileImage?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, enum: UserGender, example: Object.keys(UserGender) } })
  gender: UserGender;

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true } })
  createdAt?: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true } })
  updatedAt?: Date;

  constructor(props: Partial<User>) {
    this.id = props.id;
    this.name = props.name;
    this.birth = props.birth;
    this.gender = props.gender;
    this.nickname = props.nickname;
    this.password = props.password;
    this.description = props.description;
    this.profileImage = props.profileImage;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
