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
exports.BookmarkController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../common");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const utils_1 = require("../../utils");
const bookmark_service_1 = require("./bookmark.service");
const dto_1 = require("./dto");
let BookmarkController = class BookmarkController {
    constructor(bookmarkService) {
        this.bookmarkService = bookmarkService;
    }
    async getMyBookmarks(user) {
        return await this.bookmarkService.findBookmarksByUserId(user.id);
    }
    async getUserBookmarks(userId) {
        return await this.bookmarkService.findBookmarksByUserId(userId);
    }
    async getMyBookmarksWithPaging(paging, user) {
        return await this.bookmarkService.findBookmarkByUserIdWithPaging(paging, user.id);
    }
    async createBookmark(movieId, user) {
        await this.bookmarkService.createBookmark(user.id, movieId);
    }
    async deleteBookmark(movieId, user) {
        await this.bookmarkService.deleteBookmark(user.id, movieId);
    }
};
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 북마크 조회',
        description: '내가 북마크한 영화를 조회합니다. 유저만 사용할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.BookmarkDTO,
        isArray: true,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookmarkController.prototype, "getMyBookmarks", null);
__decorate([
    (0, common_1.Get)('users/:userId'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 북마크 조회',
        description: '내가 북마크한 영화를 조회합니다. 유저만 사용할 수 있습니다.',
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
        type: dto_1.BookmarkDTO,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookmarkController.prototype, "getUserBookmarks", null);
__decorate([
    (0, common_1.Get)('me/paging'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 북마크 조회',
        description: '내가 북마크한 영화를 조회합니다. 유저만 사용할 수 있습니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        query: {
            type: kyoongdev_nestjs_1.PagingDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.BookmarkDTO,
        isPaging: true,
    }),
    __param(0, (0, kyoongdev_nestjs_1.Paging)()),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kyoongdev_nestjs_1.PagingDTO, Object]),
    __metadata("design:returntype", Promise)
], BookmarkController.prototype, "getMyBookmarksWithPaging", null);
__decorate([
    (0, common_1.Post)(':movieId'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 북마크 생성',
        description: '북마크를 생성합니다. 유저만 사용할 수 있습니다. 한번 생성했다면 추가 생성할 수 없습니다.',
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
        type: common_2.EmptyResponseDTO,
    }, 201),
    __param(0, (0, common_1.Param)('movieId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookmarkController.prototype, "createBookmark", null);
__decorate([
    (0, common_1.Delete)(':movieId'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 북마크 삭제',
        description: '북마크를 삭제합니다. 유저만 사용할 수 있습니다.',
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
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('movieId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookmarkController.prototype, "deleteBookmark", null);
BookmarkController = __decorate([
    (0, swagger_1.ApiTags)('북마크'),
    (0, common_1.Controller)('bookmarks'),
    __metadata("design:paramtypes", [bookmark_service_1.BookmarkService])
], BookmarkController);
exports.BookmarkController = BookmarkController;
//# sourceMappingURL=bookmark.controller.js.map