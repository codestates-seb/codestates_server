import { ReportType, ReviewReport } from '@prisma/client';
import { ReviewDto } from 'modules/review/dto';
interface ReportDTOProps extends Partial<ReviewReport> {
    review: ReviewDto;
}
export declare class ReportDTO {
    id: string;
    contents: string;
    reason: string;
    type: ReportType;
    processedAt: Date;
    userId: string;
    review: ReviewDto;
    constructor(props: ReportDTOProps);
    checkUserId(userId?: string): boolean;
}
export {};
