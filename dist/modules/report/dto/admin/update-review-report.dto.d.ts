import { ReportType, ReviewReport } from '@prisma/client';
interface Props extends Partial<ReviewReport> {
}
export declare class AdminUpdateReviewReportDTO {
    contents: string;
    reason: string;
    type: ReportType;
    constructor(props?: Props);
}
export {};
