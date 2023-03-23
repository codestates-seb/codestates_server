import { UserGender } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Property } from 'kyoongdev-nestjs';
interface Props {
  name?: string;
  email?: string;
  password: string;
  birth?: string;
  nickname?: string;
  description?: string;
  profileImage?: string;
  gender?: UserGender;
}

export class UpdateUserDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '비밀번호' } })
  email?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '비밀번호' } })
  password?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  birth?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  nickname?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  description?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  profileImage?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, enum: UserGender, example: Object.keys(UserGender) } })
  gender: UserGender;

  constructor(props?: Props) {
    if (props) {
      this.password = props.password;
      this.name = props.name;
      this.birth = props.birth;
      this.nickname = props.nickname;
      this.email = props.email;
      this.description = props.description;
      this.profileImage = props.profileImage;
      this.gender = props.gender;
    }
  }

  async hashPassword(salt: number) {
    this.password = await bcrypt.hash(this.password, salt);
  }
}
