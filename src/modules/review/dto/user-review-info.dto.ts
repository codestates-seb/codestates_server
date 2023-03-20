import { Property } from 'kyoongdev-nestjs';

interface UserReviewInfoDTOProps {
  averageScore: number;
  reviewCount: number;
}

export class UserReviewInfoDTO {
  @Property({ apiProperty: { type: 'number' } })
  averageScore: number;

  @Property({ apiProperty: { type: 'number' } })
  reviewCount: number;

  constructor(props: UserReviewInfoDTOProps) {
    this.averageScore = props.averageScore;
    this.reviewCount = props.reviewCount;
  }
}
