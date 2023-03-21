import { Property } from 'kyoongdev-nestjs';
import { ReviewDto } from './review.dto';
export class ReviewsDto {
  @Property({ apiProperty: { type: ReviewDto, isArray: true } })
  data: ReviewDto[];
}
