import { PartialType } from '@nestjs/swagger';
import { ReportType } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
import { CreateReviewReportDTO } from './create-review-report.dto';

export class UpdateReviewReportDTO {
  @Property({ apiProperty: { type: 'string' } })
  contents: string;

  @Property({ apiProperty: { type: 'string' } })
  reason: string;

  @Property({ apiProperty: { type: 'string', enum: ReportType, example: Object.keys(ReportType).join(',') } })
  type: ReportType;
}
