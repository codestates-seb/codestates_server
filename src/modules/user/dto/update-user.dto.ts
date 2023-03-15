import bcrypt from 'bcrypt';
import { Property } from 'kyoongdev-nestjs';
interface Props {
  name?: string;

  password?: string;
}

export class UpdateUserDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '비밀번호' } })
  password?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name?: string;

  constructor(props?: Props) {
    if (props) {
      this.password = props.password;
      this.name = props.name;
    }
  }

  async hashPassword(salt: number) {
    this.password = await bcrypt.hash(this.password, salt);
  }
}
