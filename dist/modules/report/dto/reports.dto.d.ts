import { ReportType, ReviewReport, User } from '@prisma/client';
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
export declare class ReportsDTO {
    id: string;
    contents: string;
    reason: string;
    type: ReportType;
    processedAt: Date;
    user: UserDTO;
    review: ReportReviewDTO;
    constructor(props: ReportsDTOProps);
}
export {};
