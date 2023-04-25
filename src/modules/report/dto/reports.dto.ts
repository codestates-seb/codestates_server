import { ReportType, ReviewReport, User } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
import { ReviewDto } from 'modules/review/dto';
import { ReportReviewDTO } from 'modules/review/dto/report-review.dto';
import { UserDTO } from 'modules/user/dto';

interface ReportsDTOProps extends Partial<ReviewReport> {
  user: Partial<User>;
  review: {
    id: string;
    title: string;
    content: string;
  };
}

export class ReportsDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  contents: string;

  @Property({ apiProperty: { type: 'string' } })
  reason: string;

  @Property({ apiProperty: { type: 'string', enum: Object.keys(ReportType) } })
  type: ReportType;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '처리일자' } })
  processedAt: Date;

  @Property({ apiProperty: { type: UserDTO } })
  user: UserDTO;

  @Property({ apiProperty: { type: ReportReviewDTO } })
  review: ReportReviewDTO;

  constructor(props: ReportsDTOProps) {
    this.id = props.id;
    this.contents = props.contents;
    this.reason = props.reason;
    this.type = props.type;
    this.processedAt = props.processedAt;
    this.user = new UserDTO(props.user);
    this.review = new ReportReviewDTO(props.review);
  }
}
