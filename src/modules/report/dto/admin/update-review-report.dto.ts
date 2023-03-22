import { ReportType } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

export class AdminUpdateReviewReportDTO {
  @Property({ apiProperty: { type: 'string' } })
  contents: string;

  @Property({ apiProperty: { type: 'string' } })
  reason: string;

  @Property({ apiProperty: { type: 'string', enum: ReportType, example: Object.keys(ReportType).join(',') } })
  type: ReportType;
}
