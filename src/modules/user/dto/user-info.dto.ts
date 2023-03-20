import { Property } from 'kyoongdev-nestjs';
interface UserInfoDTOProps {
  averageScore: number;
  reviewCount: number;
  likeCount: number;
}

export class UserInfoDTO {
  @Property({ apiProperty: { type: 'number' } })
  averageScore: number;

  @Property({ apiProperty: { type: 'number' } })
  reviewCount: number;

  @Property({ apiProperty: { type: 'number' } })
  likeCount: number;

  constructor(props: UserInfoDTOProps) {
    this.averageScore = props.averageScore;
    this.reviewCount = props.reviewCount;
    this.likeCount = props.likeCount;
  }
}
