import { ReportType, ReviewReport } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
import { ReviewDto, type ReviewDTOProps } from 'modules/review/dto';

interface ReportDTOProps extends Partial<ReviewReport> {
  review: ReviewDto;
}

export class ReportDTO {
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

  @Property({ apiProperty: { type: 'string' } })
  userId: string;

  @Property({ apiProperty: { type: ReviewDto } })
  review: ReviewDto;

  constructor(props: ReportDTOProps) {
    this.id = props.id;
    this.contents = props.contents;
    this.reason = props.reason;
    this.type = props.type;
    this.processedAt = props.processedAt;
    this.review = props.review;
    this.userId = props.userId;
  }

  checkUserId(userId?: string): boolean {
    if (!userId) {
      return true;
    }

    return this.userId === userId;
  }
}
