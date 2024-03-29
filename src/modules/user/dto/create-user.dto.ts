import bcrypt from 'bcrypt';
import { Property } from 'kyoongdev-nestjs';
interface Props {
  email: string;
  name?: string;
  password: string;
  birth?: string;
  nickname?: string;
}

export class CreateUserDTO {
  @Property({ apiProperty: { type: 'string', description: '비밀번호' } })
  email: string;

  @Property({ apiProperty: { type: 'string', description: '비밀번호' } })
  password: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  birth?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  nickname?: string;

  constructor(props?: Props) {
    if (props) {
      this.email = props.email;
      this.password = props.password;
      this.name = props.name;
      this.birth = props.birth;
      this.nickname = props.nickname;
    }
  }

  async hashPassword(salt: number) {
    this.password = await bcrypt.hash(this.password, salt);
    return this.password;
  }
}
