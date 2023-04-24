import { ReportType, ReviewReport, User } from '@prisma/client';
import { UserDTO } from 'modules/user/dto';
interface ReportsDTOProps extends Partial<ReviewReport> {
    user: Partial<User>;
}
export declare class ReportsDTO {
    id: string;
    contents: string;
    reason: string;
    type: ReportType;
    processedAt: Date;
    user: UserDTO;
    constructor(props: ReportsDTOProps);
}
export {};
