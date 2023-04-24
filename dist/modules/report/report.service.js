"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const review_service_1 = require("../review/review.service");
const user_service_1 = require("../user/user.service");
const report_dto_1 = require("./dto/report.dto");
const reports_dto_1 = require("./dto/reports.dto");
let ReportService = class ReportService {
    constructor(database, userService, reviewService) {
        this.database = database;
        this.userService = userService;
        this.reviewService = reviewService;
    }
    async findReport(id) {
        const report = await this.database.reviewReport.findUnique({
            where: {
                id,
            },
        });
        if (!report)
            throw new common_1.NotFoundException('신고가 존재하지 않습니다.');
        const review = await this.reviewService.findReview(report.reviewId);
        return new report_dto_1.ReportDTO({
            ...report,
            review,
        });
    }
    async findReports(paging, args = {}) {
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
        return new kyoongdev_nestjs_1.PaginationDTO(reports.map((report) => new reports_dto_1.ReportsDTO(report)), { paging, count });
    }
    async createReport(userId, reviewId, props) {
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
    async updateReport(id, props, userId) {
        const report = await this.findReport(id);
        if (!report.checkUserId(userId)) {
            throw new common_1.NotFoundException('신고를 수정할 권한이 없습니다.');
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
    async adminUpdateReport(id, props) {
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
    async deleteReport(id, userId) {
        const report = await this.findReport(id);
        if (userId && !report.checkUserId(userId)) {
            throw new common_1.NotFoundException('신고를 삭제할 권한이 없습니다.');
        }
        await this.database.reviewReport.delete({
            where: {
                id,
            },
        });
    }
};
ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        review_service_1.ReviewService])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map