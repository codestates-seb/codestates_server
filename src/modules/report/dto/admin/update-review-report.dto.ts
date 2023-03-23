import { ReportType, ReviewReport } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

interface Props extends Partial<ReviewReport> {}

export class AdminUpdateReviewReportDTO {
  @Property({ apiProperty: { type: 'string' } })
  contents: string;

  @Property({ apiProperty: { type: 'string' } })
  reason: string;

  @Property({ apiProperty: { type: 'string', enum: ReportType, example: Object.keys(ReportType).join(',') } })
  type: ReportType;

  constructor(props?: Props) {
    this.contents = props?.contents;
    this.reason = props?.reason;
    this.type = props?.type;
  }
}
