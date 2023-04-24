import { User } from '@prisma/client';
import { PagingDTO } from 'kyoongdev-nestjs';
import { FindReportsQuery } from './dto/query/find-reports.query';
import { ReportsDTO, UpdateReviewReportDTO, ReportDTO, AdminUpdateReviewReportDTO } from './dto';
import { ReportService } from './report.service';
import { DeleteReportQuery } from './dto/query';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    getReports(query: FindReportsQuery, paging: PagingDTO): Promise<import("kyoongdev-nestjs").PaginationDTO<ReportsDTO>>;
    getMyReports(paging: PagingDTO, user: User): Promise<import("kyoongdev-nestjs").PaginationDTO<ReportsDTO>>;
    getReport(id: string): Promise<ReportDTO>;
    updateReport(id: string, body: UpdateReviewReportDTO, user: User): Promise<void>;
    adminUpdateReport(id: string, body: AdminUpdateReviewReportDTO): Promise<void>;
    deleteReport(id: string, user: User): Promise<void>;
    adminDeleteReport(id: string): Promise<void>;
    adminDeleteReports(query: DeleteReportQuery): Promise<void>;
}
