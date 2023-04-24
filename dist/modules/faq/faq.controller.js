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
exports.FaqController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../common");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const utils_1 = require("../../utils");
const dto_1 = require("./dto");
const query_1 = require("./dto/query");
const faq_service_1 = require("./faq.service");
const query_2 = require("./dto/query");
let FaqController = class FaqController {
    constructor(faqService) {
        this.faqService = faqService;
    }
    async findFaq(id) {
        return this.faqService.findFaq(id);
    }
    async findFaqs(paging, query) {
        return this.faqService.findFaqs(paging, {
            where: {
                user: {
                    name: {
                        contains: query.userName,
                    },
                },
            },
            orderBy: {
                ...(query.orderBy === 'CONTENT' && { content: query.sortBy ? query.sortBy : 'desc' }),
                ...(query.orderBy === 'CREATED_AT' && { createdAt: query.sortBy ? query.sortBy : 'desc' }),
                ...(query.orderBy === 'TITLE' && { title: query.sortBy ? query.sortBy : 'desc' }),
                ...(query.orderBy === 'USERNAME' && {
                    user: {
                        name: query.sortBy ? query.sortBy : 'desc',
                    },
                }),
            },
        });
    }
    async findMyFaqs(paging, user) {
        console.log({ user });
        return this.faqService.findFaqs(paging, {
            where: {
                userId: user.id,
            },
        });
    }
    async createFaq(props, user) {
        return this.faqService.createFaq(user.id, props);
    }
    async updateFaq(props, user, id) {
        return this.faqService.updateFaq(id, user.id, props);
    }
    async deleteFaq(user, id) {
        return this.faqService.deleteFaq(id, user.id);
    }
    async adminDeleteFaq(id) {
        return this.faqService.deleteFaq(id);
    }
    async adminDeleteFaqs(query) {
        await Promise.all(query.faqIds.split(',').map(async (id) => this.faqService.deleteFaq(id)));
    }
    async createFaqComment(id, props, user) {
        return this.faqService.createFaqComment(id, user.id, props);
    }
    async updateFaqComment(id, props, user) {
        return this.faqService.updateFaqComment(id, user.id, props);
    }
    async deleteFaqComment(id) {
        return this.faqService.deleteFaqComment(id);
    }
};
__decorate([
    (0, common_1.Get)(':id/detail'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS / 서비스] faq 자세히 불러오기 ',
        description: 'faq를 자세히 불러옵니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.FAQDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "findFaq", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] faq 목록 불러오기 ',
        description: 'faq의 목록을 불러옵니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.FAQsDto,
        isPaging: true,
    }),
    __param(0, (0, kyoongdev_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kyoongdev_nestjs_1.PagingDTO, query_1.FindFaqQuery]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "findFaqs", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 faq 목록 불러오기 ',
        description: '나의 faq 목록을 불러옵니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        query: {
            type: kyoongdev_nestjs_1.PagingDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.FAQsDto,
        isPaging: true,
    }),
    __param(0, (0, kyoongdev_nestjs_1.Paging)()),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kyoongdev_nestjs_1.PagingDTO, Object]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "findMyFaqs", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] faq 생성하기 ',
        description: 'faq를 생성합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER), utils_1.ResponseWithIdInterceptor),
    (0, kyoongdev_nestjs_1.RequestApi)({
        body: {
            type: dto_1.CreateFaqDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateFaqDTO, Object]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "createFaq", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 faq 수정하기 ',
        description: '나의 faq를 수정합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
        },
        body: {
            type: dto_1.UpdateFaqDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateFaqDTO, Object, String]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "updateFaq", null);
__decorate([
    (0, common_1.Delete)(':id/me'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 faq 삭제하기 ',
        description: '나의 faq를 삭제합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "deleteFaq", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] faq 삭제하기 ',
        description: ' faq를 삭제합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "adminDeleteFaq", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] faq 다수 삭제하기 ',
        description: ' faq를 다수 삭제합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_2.DeleteFaqQuery]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "adminDeleteFaqs", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] faq 댓글 생성하기 ',
        description: 'faq 댓글을 생성합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN), utils_1.ResponseWithIdInterceptor),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: 'faq id',
        },
        body: {
            type: dto_1.CreateFaqCommentDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateFaqCommentDTO, Object]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "createFaqComment", null);
__decorate([
    (0, common_1.Patch)('comments/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] faq 댓글 수정하기 ',
        description: 'faq 댓글을 수정합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
        },
        body: {
            type: dto_1.UpdateFaqCommentDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateFaqCommentDTO, Object]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "updateFaqComment", null);
__decorate([
    (0, common_1.Delete)('comments/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] faq 댓글 삭제하기 ',
        description: ' faq 댓글을 삭제합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "deleteFaqComment", null);
FaqController = __decorate([
    (0, common_1.Controller)('faqs'),
    (0, swagger_1.ApiTags)('FAQ'),
    __metadata("design:paramtypes", [faq_service_1.FaqService])
], FaqController);
exports.FaqController = FaqController;
//# sourceMappingURL=faq.controller.js.map