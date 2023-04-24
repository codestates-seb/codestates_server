import { ReportType } from '@prisma/client';
export declare class CreateReviewReportDTO {
    contents: string;
    reason: string;
    type: ReportType;
}
