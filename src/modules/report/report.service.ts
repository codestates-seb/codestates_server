import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { ReviewService } from 'modules/review/review.service';
import { UserService } from 'modules/user/user.service';
import { AdminUpdateReviewReportDTO, CreateReviewReportDTO, UpdateReviewReportDTO } from './dto';
import { ReportDTO } from './dto/report.dto';
import { ReportsDTO } from './dto/reports.dto';

@Injectable()
export class ReportService {
  constructor(
    private readonly database: PrismaService,
    private readonly userService: UserService,
    private readonly reviewService: ReviewService
  ) {}

  async findReport(id: string) {
    const report = await this.database.reviewReport.findUnique({
      where: {
        id,
      },
    });

    if (!report) throw new NotFoundException('신고가 존재하지 않습니다.');

    const review = await this.reviewService.findReview(report.reviewId);

    return new ReportDTO({
      ...report,
      review,
    });
  }

  async findReports(paging: PagingDTO, args = {} as Prisma.ReviewReportFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.database.reviewReport.count();
    const reports = await this.database.reviewReport.findMany({
      skip,
      take,
      where: args.where,
      include: {
        user: true,
      },
    });

    return new PaginationDTO(
      reports.map((report) => new ReportsDTO(report)),
      { paging, count }
    );
  }

  async createReport(userId: string, reviewId: string, props: CreateReviewReportDTO) {
    await this.userService.findUser(userId);
    await this.reviewService.findReview(reviewId);

    const newReport = await this.database.reviewReport.create({
      data: {
        ...props,
        user: {
          connect: {
            id: userId,
          },
        },
        review: {
          connect: {
            id: reviewId,
          },
        },
      },
    });

    return newReport.id;
  }

  async updateReport(id: string, props: UpdateReviewReportDTO, userId?: string) {
    const report = await this.findReport(id);

    if (!report.checkUserId(userId)) {
      throw new NotFoundException('신고를 수정할 권한이 없습니다.');
    }

    await this.database.reviewReport.update({
      where: {
        id,
      },
      data: {
        ...props,
      },
    });
  }

  async adminUpdateReport(id: string, props: AdminUpdateReviewReportDTO) {
    await this.findReport(id);

    await this.database.reviewReport.update({
      where: {
        id,
      },
      data: {
        ...props,
        ...(props.type && {
          processedAt: new Date(),
        }),
      },
    });
  }

  async deleteReport(id: string, userId?: string) {
    const report = await this.findReport(id);

    if (userId && !report.checkUserId(userId)) {
      throw new NotFoundException('신고를 삭제할 권한이 없습니다.');
    }

    await this.database.reviewReport.delete({
      where: {
        id,
      },
    });
  }
}
