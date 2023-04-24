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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../common");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const utils_1 = require("../../utils");
const dto_1 = require("./dto");
const query_1 = require("./dto/query");
const user_service_1 = require("./user.service");
const jwt_nullable_guard_1 = require("../../utils/guards/jwt-nullable.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserCount() {
        return await this.userService.getUserTotalCount();
    }
    async findMe(user) {
        const me = await this.userService.findUser(user.id);
        return new dto_1.MeDTO({
            ...me,
            preferredGenres: me.preferredGenres.map((genre) => ({
                genre: genre,
                genreId: genre.id,
            })),
        });
    }
    async getMyInfo(user) {
        return await this.userService.getUserInfo(user.id);
    }
    async getUserInfo(userId) {
        return await this.userService.getUserInfo(userId);
    }
    async findUser(id) {
        const user = await this.userService.findUser(id);
        return new dto_1.UserDTO({
            ...user,
            preferredGenres: user.preferredGenres.map((genre) => {
                return { genre: genre, genreId: genre.id };
            }),
        });
    }
    async findUsers(paging, query) {
        return await this.userService.findUsers(paging, {
            where: {
                nickname: {
                    contains: query.nickname,
                },
                name: {
                    contains: query.name,
                },
            },
            orderBy: {
                ...(query.orderBy === 'COMMENT_COUNT' && {
                    reviewComment: {
                        _count: query.sortBy ? query.sortBy : 'desc',
                    },
                }),
                ...(query.orderBy === 'CREATED_AT' && {
                    createdAt: query.sortBy ? query.sortBy : 'desc',
                }),
                ...(query.orderBy === 'EMAIL' && {
                    email: query.sortBy ? query.sortBy : 'desc',
                }),
                ...(query.orderBy === 'NAME' && {
                    name: query.sortBy ? query.sortBy : 'desc',
                }),
                ...(query.orderBy === 'REVIEW_COUNT' && {
                    Reviews: {
                        _count: query.sortBy ? query.sortBy : 'desc',
                    },
                }),
                ...(query.orderBy === 'LIKE_COUNT' && {
                    likes: {
                        _count: query.sortBy ? query.sortBy : 'desc',
                    },
                }),
            },
        });
    }
    async createUser(body) {
        return await this.userService.createUser(body);
    }
    async updateUser(id, body) {
        await this.userService.updateUser(id, body);
    }
    async updateMe(user, body) {
        await this.userService.updateUser(user.id, body);
    }
    async deleteUser(id) {
        await this.userService.deleteUser(id);
    }
    async deleteUsers(query) {
        await Promise.all(query.userIds.split(',').map(async (id) => {
            await this.userService.deleteUser(id);
        }));
    }
};
__decorate([
    (0, common_1.Get)('count'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 전체 이용자 수 구하기 ',
        description: '전체 이용자 수를 구합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.UserCountDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserCount", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 정보 불러오기',
        description: '나의 정보를 불러옵니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.MeDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findMe", null);
__decorate([
    (0, common_1.Get)('me/info'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 추가 정보 불러오기 [좋아요/리뷰 개수/별점]',
        description: '나의 추가 정보를 불러옵니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.UserInfoDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyInfo", null);
__decorate([
    (0, common_1.Get)(':userId/info'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 유저 추가 정보 불러오기 [좋아요/리뷰 개수/별점]',
        description: '유저 추가 정보를 불러옵니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'userId',
            type: 'string',
            required: true,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.UserInfoDTO,
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Get)(':id/detail'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS / 서비스] 유저 자세히 불러오기',
        description: '유저의 자세한 정보를 불러옵니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(jwt_nullable_guard_1.JwtNullableAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.UserDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 유저 목록 불러오기',
        description: '유저의 목록 정보를 불러옵니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.UserDTO,
        isPaging: true,
    }),
    __param(0, (0, kyoongdev_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kyoongdev_nestjs_1.PagingDTO, query_1.FindUsersQuery]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUsers", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 유저 생성하기',
        description: '유저를 생성합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor, (0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        body: {
            type: dto_1.CreateUserDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 유저 수정하기',
        description: '유저를 수정합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
        },
        body: {
            type: dto_1.UpdateUserDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Patch)(''),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 나의 정보 수정하기',
        description: '나의 정보를 수정합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        body: {
            type: dto_1.UpdateUserDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 유저/관리자 삭제하기',
        description: '유저/관리자를 삭제합니다.',
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
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 유저 다수 삭제하기',
        description: '유저를 다수 삭제합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.DeleteUsersQuery]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUsers", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('유저'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map