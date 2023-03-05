import { Property } from 'kyoongdev-nestjs';

export class LoginDTO {
  @Property({ apiProperty: { type: 'string', required: true, description: '이메일' } })
  email: string;

  @Property({ apiProperty: { type: 'string', required: true, description: '비밀번호' } })
  password: string;
}
