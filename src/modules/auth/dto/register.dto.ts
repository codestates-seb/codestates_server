import { Property } from 'kyoongdev-nestjs';
export class RegisterDTO {
  @Property({ apiProperty: { type: 'string', required: true, description: '이메일' } })
  email: string;

  @Property({ apiProperty: { type: 'string', required: true, description: '비밀번호' } })
  password: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  birth?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  nickname?: string;
}
