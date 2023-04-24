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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../common");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const utils_1 = require("../../utils");
const dto_1 = require("./dto");
const query_1 = require("./dto/query");
const review_service_1 = require("./review.service");
const jwt_nullable_guard_1 = require("../../utils/guards/jwt-nullable.guard");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async getReviewCount() {
        return await this.reviewService.getReviewCount();
    }
    async getReviews(paging, query) {
        return await this.reviewService.findReviews(paging, {
            where: {
                user: {
                    name: {
                        contains: query.name,
                    },
                    nickname: {
                        contains: query.nickname,
                    },
                },
            },
            orderBy: {
                ...(query.orderBy === 'NAME' && { movie: { title: query.sortBy ? query.sortBy : 'desc' } }),
                ...(query.orderBy === 'CREATED_AT' && { createdAt: query.sortBy ? query.sortBy : 'desc' }),
                ...(query.orderBy === 'LIKE' && { reviewLikes: { _count: query.sortBy ? query.sortBy : 'desc' } }),
                ...(query.orderBy === 'USERNAME' && { user: { name: query.sortBy ? query.sortBy : 'desc' } }),
            },
        });
    }
    async getMyReviews(user) {
        return await this.reviewService.findReviewsByUserId(user.id);
    }
    async getMyReviewsWithPaging(paging, user) {
        return await this.reviewService.findReviews(paging, {
            where: {
                userId: user.id,
            },
        });
    }
    async getReviewsByMovieId(movieId, query, user) {
        return await this.reviewService.findReviewsByMovieId(movieId, user?.id, {
            orderBy: {
                ...(query.orderBy === 'CREATED_AT' && { createdAt: 'desc' }),
                ...(query.orderBy === 'SCORE_HIGH' && { score: 'desc' }),
                ...(query.orderBy === 'SCORE_LOW' && { score: 'asc' }),
            },
        });
    }
    async getMyReviewByMovieId(movieId, user) {
        return await this.reviewService.findReviewByMovieAndUser(movieId, user.id);
    }
    async getReviewsByMovieIdWithPaging(paging, movieId, user) {
        return await this.reviewService.findReviews(paging, {
            where: {
                movieId,
            },
        }, user.id);
    }
    async getReview(id, user) {
        return await this.reviewService.findReview(id, user?.id);
    }
    async createReview(movieId, user, body) {
        return await this.reviewService.createReview(movieId, user.id, body);
    }
    async updateReview(id, user, body) {
        await this.reviewService.updateReview(id, body, user.id);
    }
    async updateReviewAdmin(id, body) {
        await this.reviewService.updateReview(id, body);
    }
    async deleteReview(id, user) {
        return await this.reviewService.deleteReview(id, user.id);
    }
    async deleteReviewAdmin(id) {
        await this.reviewService.deleteReview(id);
    }
    async deleteReviewsAdmin(query) {
        await Promise.all(query.reviewIds.split(',').map(async (id) => this.reviewService.deleteReview(id)));
    }
    async getMyReviewCommentsByReview(id, user) {
        return await this.reviewService.findReviewCommentsByUserId(id, user.id);
    }
    async getMyReviewComments(user) {
        return await this.reviewService.findUserReviewComments(user.id);
    }
    async createReviewComment(id, user, body) {
        return await this.reviewService.createReviewComment(id, user.id, body);
    }
    async updateReviewComment(id, user, body) {
        await this.reviewService.updateReviewComment(id, user.id, body);
    }
    async deleteReviewComment(id, user) {
        await this.reviewService.deleteReviewComment(id, user.id);
    }
    async getReviewsByUserId(userId) {
        return await this.reviewService.findReviewsWithNoPaging({
            where: {
                userId,
            },
        });
    }
    async getReviewLikesByUserId(userId) {
        return await this.reviewService.findReviewsWithNoPaging({
            where: {
                reviewLikes: {
                    some: {
                        userId,
                    },
                },
            },
        });
    }
    async createReviewLike(id, user) {
        await this.reviewService.createReviewLike(id, user.id);
    }
    async deleteReviewLike(id, user) {
        await this.reviewService.deleteReviewLike(id, user.id);
    }
    async createReviewHate(id, user) {
        await this.reviewService.createReviewHate(id, user.id);
    }
    async deleteReviewHate(id, user) {
        await this.reviewService.deleteReviewHate(id, user.id);
    }
};
__decorate([
    (0, common_1.Get)('count'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 영화 리뷰 수 구하기',
        description: '영화의 리뷰 수를 구합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReviewCountDTO,
    }, 200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviewCount", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 리뷰 목록 조회',
        description: '리뷰 목록을 조회합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReviewDto,
        isPaging: true,
    }, 200),
    __param(0, (0, kyoongdev_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kyoongdev_nestjs_1.PagingDTO, query_1.FindReviewsQuery]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviews", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 내 리뷰 목록 조회',
        description: '내 리뷰 목록을 조회합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReviewDto,
        isArray: true,
    }, 200),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getMyReviews", null);
__decorate([
    (0, common_1.Get)('me/paging'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 내 리뷰 목록 조회 - 페이징',
        description: '내 리뷰 목록을 조회합니다. - 페이징',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        query: {
            type: kyoongdev_nestjs_1.PagingDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReviewDto,
        isPaging: true,
    }, 200),
    __param(0, (0, kyoongdev_nestjs_1.Paging)()),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kyoongdev_nestjs_1.PagingDTO, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getMyReviewsWithPaging", null);
__decorate([
    (0, common_1.Get)('movie/:movieId'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 영화 리뷰 목록 조회',
        description: '영화의 리뷰 목록을 조회합니다. 유저가 사용할 경우, 유저의 리뷰 정보를 함께 반환합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(jwt_nullable_guard_1.JwtNullableAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'movieId',
            type: 'string',
            required: true,
            description: '영화의 id',
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReviewDto,
        isArray: true,
    }, 200),
    __param(0, (0, common_1.Param)('movieId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_1.FindReviewsWithMovieQuery, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviewsByMovieId", null);
__decorate([
    (0, common_1.Get)('movie/:movieId/me'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 영화 리뷰 조회',
        description: '나의 영화 리뷰를 조회합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'movieId',
            type: 'string',
            required: true,
            description: '영화의 id',
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReviewDto,
    }, 200),
    __param(0, (0, common_1.Param)('movieId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getMyReviewByMovieId", null);
__decorate([
    (0, common_1.Get)('movie/:movieId/paging'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 영화 리뷰 목록 조회 - 페이징',
        description: '영화의 리뷰 목록을 조회합니다. 유저가 사용할 경우, 유저의 리뷰 정보를 함께 반환합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(jwt_nullable_guard_1.JwtNullableAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'movieId',
            type: 'string',
            required: true,
            description: '영화의 id',
        },
        query: {
            type: kyoongdev_nestjs_1.PagingDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReviewDto,
        isPaging: true,
    }, 200),
    __param(0, (0, kyoongdev_nestjs_1.Paging)()),
    __param(1, (0, common_1.Param)('movieId')),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kyoongdev_nestjs_1.PagingDTO, String, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviewsByMovieIdWithPaging", null);
__decorate([
    (0, common_1.Get)(':id/detail'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 영화 리뷰 상세 조회',
        description: '영화의 리뷰를 상세 조회합니다. 유저가 사용할 경우, 유저의 리뷰 정보를 함께 반환합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(jwt_nullable_guard_1.JwtNullableAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: '리뷰의 id',
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReviewDto,
    }, 200),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReview", null);
__decorate([
    (0, common_1.Post)(':movieId'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 영화 리뷰 생성',
        description: '영화의 리뷰를 생성합니다. 유저만 사용이 가능합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor, (0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'movieId',
            type: 'string',
            required: true,
            description: '영화의 id',
        },
        body: {
            type: dto_1.CreateReviewDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Param)('movieId')),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.CreateReviewDTO]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "createReview", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 리뷰 수정',
        description: '리뷰를 수정합니다. 유저만 사용할 수 있으며, 본인의 리뷰만 수정할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: '리뷰의 id',
        },
        body: {
            type: dto_1.UpdateReviewDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.UpdateReviewDTO]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "updateReview", null);
__decorate([
    (0, common_1.Patch)(':id/admin'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 리뷰 수정',
        description: '리뷰를 수정합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: '리뷰의 id',
        },
        body: {
            type: dto_1.UpdateReviewDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateReviewDTO]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "updateReviewAdmin", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 리뷰 삭제',
        description: '리뷰를 삭제합니다. 유저만 사용할 수 있으며, 본인의 리뷰만 삭제할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: '리뷰의 id',
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
], ReviewController.prototype, "deleteReview", null);
__decorate([
    (0, common_1.Delete)(':id/admin'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 리뷰 삭제',
        description: '리뷰를 삭제합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: '리뷰의 id',
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteReviewAdmin", null);
__decorate([
    (0, common_1.Delete)('many/admin'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 리뷰 다수 삭제',
        description: '리뷰를 다수 삭제합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.DeleteReviewsQuery]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteReviewsAdmin", null);
__decorate([
    (0, common_1.Get)(':id/comments/me'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 내가 특정 리뷰에 작성한 리뷰 댓글 조회',
        description: '내가 특정 리뷰에  작성한 리뷰 댓글을 조회합니다. 유저만 사용할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: '리뷰의 id',
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReviewCommentDTO,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getMyReviewCommentsByReview", null);
__decorate([
    (0, common_1.Get)('comments/me'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 내가 작성한 리뷰 댓글 조회',
        description: '내가 작성한 리뷰 댓글을 조회합니다. 유저만 사용할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReviewCommentDTO,
        isArray: true,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getMyReviewComments", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 리뷰 댓글 생성',
        description: '리뷰에 댓글을 생성합니다. 유저만 사용할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: '리뷰의 id',
        },
        body: {
            type: dto_1.CreateReviewCommentDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.CreateReviewCommentDTO]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "createReviewComment", null);
__decorate([
    (0, common_1.Patch)('comments/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 리뷰 댓글 수정',
        description: '리뷰에 댓글을 수정합니다. 본인만 사용할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: '댓글의  id',
        },
        body: {
            type: dto_1.CreateReviewCommentDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.CreateReviewCommentDTO]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "updateReviewComment", null);
__decorate([
    (0, common_1.Delete)('comments/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 리뷰 댓글 삭제',
        description: '리뷰에 댓글을 삭제합니다. 본인만 사용할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: '댓글의  id',
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
], ReviewController.prototype, "deleteReviewComment", null);
__decorate([
    (0, common_1.Get)('users/:userId'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 유저가 남긴 리뷰 조회',
        description: '유저가 남긴 리뷰를 조회합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'userId',
            type: 'string',
            required: true,
            description: '유저의 id',
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReviewDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviewsByUserId", null);
__decorate([
    (0, common_1.Get)('users/:userId/likes'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 유저가 좋아요한 리뷰 조회',
        description: '유저가 좋아요한 리뷰를 조회합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'userId',
            type: 'string',
            required: true,
            description: '유저의 id',
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.ReviewDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviewLikesByUserId", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 리뷰 좋아요  ',
        description: '리뷰에 좋아요를 누릅니다. 유저만 사용할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: '리뷰의 id',
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
], ReviewController.prototype, "createReviewLike", null);
__decorate([
    (0, common_1.Delete)(':id/like'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 리뷰 좋아요 삭제',
        description: '리뷰에 좋아요 삭제를 누릅니다. 유저만 사용할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: '리뷰의 id',
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
], ReviewController.prototype, "deleteReviewLike", null);
__decorate([
    (0, common_1.Post)(':id/hate'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 리뷰 싫어요',
        description: '리뷰에 싫어요를 누릅니다. 유저만 사용할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: '리뷰의 id',
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
], ReviewController.prototype, "createReviewHate", null);
__decorate([
    (0, common_1.Delete)(':id/hate'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 리뷰 싫어요 삭제',
        description: '리뷰에 싫어요 삭제를 누릅니다. 유저만 사용할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
            description: '리뷰의 id',
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
], ReviewController.prototype, "deleteReviewHate", null);
ReviewController = __decorate([
    (0, swagger_1.ApiTags)('리뷰'),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map