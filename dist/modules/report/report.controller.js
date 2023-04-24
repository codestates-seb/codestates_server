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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const utils_1 = require("../../utils");
const find_reports_query_1 = require("./dto/query/find-reports.query");
const dto_1 = require("./dto");
const report_service_1 = require("./report.service");
const common_2 = require("../../common");
const query_1 = require("./dto/query");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async getReports(query, paging) {
        return this.reportService.findReports(paging, {
            where: {
                user: {
                    name: {
                        contains: query.username,
                    },
                },
            },
        });
    }
    async getMyReports(paging, user) {
        return this.reportService.findReports(paging, {
            where: {
                user: {
                    id: user.id,
                },
            },
        });
    }
    async getReport(id) {
        return this.reportService.findReport(id);
    }
    async updateReport(id, body, user) {
        await this.reportService.updateReport(id, body, user.id);
    }
    async adminUpdateReport(id, body) {
        await this.reportService.adminUpdateReport(id, body);
    }
    async deleteReport(id, user) {
        await this.reportService.deleteReport(id, user.id);
    }
    async adminDeleteReport(id) {
        await this.reportService.deleteReport(id);
    }
    async adminDeleteReports(query) {
        await Promise.all(query.reportIds.split(',').map((id) => this.reportService.deleteReport(id)));
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 신고 목록 조회',
        description: '신고 목록을 조회합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReportsDTO,
        isPaging: true,
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, kyoongdev_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_reports_query_1.FindReportsQuery, kyoongdev_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReports", null);
__decorate([
    (0, common_1.Get)('/me'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 신고 목록 조회',
        description: '나의 신고 목록을 조회합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        query: {
            type: kyoongdev_nestjs_1.PagingDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReportsDTO,
        isPaging: true,
    }),
    __param(0, (0, kyoongdev_nestjs_1.Paging)()),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kyoongdev_nestjs_1.PagingDTO, Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getMyReports", null);
__decorate([
    (0, common_1.Get)(':id/detail'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 신고 목록 조회',
        description: '나의 신고 목록을 조회합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: 'report id',
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReportDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReport", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 신고 수정',
        description: '나의 신고를 수정합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: 'report id',
        },
        body: {
            type: dto_1.UpdateReviewReportDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateReviewReportDTO, Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "updateReport", null);
__decorate([
    (0, common_1.Patch)(':id/admin'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 신고 수정',
        description: '신고를 수정합니다. 관리자만 사용 가능합니다.<br/> 무시 - type : "IGNORE"<br/>탈퇴 - type : "USER_DELETE" (실제 탈퇴는 이루어지지 않습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: 'report id',
        },
        body: {
            type: dto_1.AdminUpdateReviewReportDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.AdminUpdateReviewReportDTO]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "adminUpdateReport", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 신고 삭제',
        description: '나의 신고를 삭제합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: 'report id',
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "deleteReport", null);
__decorate([
    (0, common_1.Delete)(':id/admin'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 신고 삭제',
        description: '신고를 삭제합니다. 관리자만 사용할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: 'report id',
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "adminDeleteReport", null);
__decorate([
    (0, common_1.Delete)('admin/many'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 신고 다수 삭제',
        description: '신고를 다수 삭제합니다. 관리자만 사용할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.DeleteReportQuery]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "adminDeleteReports", null);
ReportController = __decorate([
    (0, swagger_1.ApiTags)('신고'),
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map