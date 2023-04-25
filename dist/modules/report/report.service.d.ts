import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { ReviewService } from 'modules/review/review.service';
import { UserService } from 'modules/user/user.service';
import { AdminUpdateReviewReportDTO, CreateReviewReportDTO, ReportStatusDTO, UpdateReviewReportDTO } from './dto';
import { ReportDTO } from './dto/report.dto';
import { ReportsDTO } from './dto/reports.dto';
export declare class ReportService {
    private readonly database;
    private readonly userService;
    private readonly reviewService;
    constructor(database: PrismaService, userService: UserService, reviewService: ReviewService);
    getReportStatus(): Promise<ReportStatusDTO>;
    findReport(id: string): Promise<ReportDTO>;
    findReports(paging: PagingDTO, args?: Prisma.ReviewReportFindManyArgs): Promise<PaginationDTO<ReportsDTO>>;
    createReport(userId: string, reviewId: string, props: CreateReviewReportDTO): Promise<string>;
    updateReport(id: string, props: UpdateReviewReportDTO, userId?: string): Promise<void>;
    adminUpdateReport(id: string, props: AdminUpdateReviewReportDTO): Promise<void>;
    deleteReport(id: string, userId?: string): Promise<void>;
}
