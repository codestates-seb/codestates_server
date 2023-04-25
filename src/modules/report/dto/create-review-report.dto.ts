import { ReportType, ReviewReport } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

export class CreateReviewReportDTO {
  @Property({ apiProperty: { type: 'string' } })
  reason: string;
}
