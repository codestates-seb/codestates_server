import { Property } from 'kyoongdev-nestjs';

export class UpdateReviewReportDTO {
  @Property({ apiProperty: { type: 'string' } })
  contents: string;

  @Property({ apiProperty: { type: 'string' } })
  reason: string;
}
