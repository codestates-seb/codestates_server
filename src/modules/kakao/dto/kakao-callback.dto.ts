import { Property } from 'kyoongdev-nestjs';

interface Props {
  token: string;
  socialId: string;
}

export class KakaoCallbackDTO {
  @Property({ apiProperty: { type: 'string' } })
  token: string;

  @Property({ apiProperty: { type: 'string' } })
  socialId: string;

  constructor(props: Props) {
    this.token = props.token;
    this.socialId = props.socialId;
  }
}
