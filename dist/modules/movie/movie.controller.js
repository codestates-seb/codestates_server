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
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../common");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const utils_1 = require("../../utils");
const jwt_nullable_guard_1 = require("../../utils/guards/jwt-nullable.guard");
const dto_1 = require("./dto");
const movie_count_dto_1 = require("./dto/movie-count.dto");
const query_1 = require("./dto/query");
const movie_service_1 = require("./movie.service");
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async getMovies(paging, query, user) {
        return await this.movieService.findMovies(paging, {
            where: {
                ...(query.title && {
                    OR: [
                        {
                            title: {
                                contains: query.title,
                            },
                        },
                        {
                            movieStaffs: {
                                some: {
                                    staff: {
                                        name: {
                                            contains: query.title,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            movieActors: {
                                some: {
                                    actor: {
                                        name: {
                                            contains: query.title,
                                        },
                                    },
                                },
                            },
                        },
                    ],
                }),
            },
            orderBy: {
                ...(query.orderBy === 'RELEASED_AT' && {
                    releasedAt: query.sortBy ? query.sortBy : 'desc',
                }),
                ...(query.orderBy === 'NAME' && {
                    title: query.sortBy ? query.sortBy : 'asc',
                }),
                ...(query.orderBy === 'LIKE' && {
                    movieLikes: {
                        _count: query.sortBy ? query.sortBy : 'desc',
                    },
                }),
            },
        }, user?.id);
    }
    async getMovieCount() {
        return await this.movieService.getMovieTotalCount();
    }
    async getMyMovieLikes(user) {
        return await this.movieService.findMoviesWithNoPaging({
            where: {
                movieLikes: {
                    some: {
                        userId: user.id,
                    },
                },
            },
        }, user.id);
    }
    async getMoviesByGenre(paging, query, user) {
        return await this.movieService.findMovies(paging, {
            where: {
                ...(query.genreIds && {
                    movieGenres: {
                        some: {
                            OR: query.genreIds.split(',').map((genreId) => ({ genreId })),
                        },
                    },
                }),
            },
            orderBy: {
                ...(query.orderBy === 'CREATED_AT' && {
                    createdAt: query.sortBy ? query.sortBy : 'desc',
                }),
                ...(query.orderBy === 'NAME' && {
                    title: query.sortBy ? query.sortBy : 'asc',
                }),
                ...(query.orderBy === 'LIKE' && {
                    movieLikes: {
                        _count: query.sortBy ? query.sortBy : 'desc',
                    },
                }),
            },
        }, user?.id);
    }
    async getMoviesByTop(user) {
        return await this.movieService.findMovies(new kyoongdev_nestjs_1.PagingDTO(1, 10), {
            orderBy: {
                movieLikes: {
                    _count: 'desc',
                },
            },
        }, user?.id);
    }
    async getRelatedMovies(id) {
        const movie = await this.movieService.findMovie(id);
        return await this.movieService.findMoviesByGenre(movie.genres.map((genre) => genre.id));
    }
    async getMoviesByCategory(paging, query, user) {
        return await this.movieService.findMovies(paging, {
            where: {
                ...(query.categoryIds && {
                    movieCategories: {
                        some: {
                            OR: query.categoryIds.split(',').map((categoryId) => ({ categoryId })),
                        },
                    },
                }),
            },
        }, user?.id);
    }
    async getMovie(id, user) {
        return await this.movieService.findMovie(id, user?.id);
    }
    async getCategories() {
        return await this.movieService.findCategories();
    }
    async getGenres() {
        return await this.movieService.findMovieGenres();
    }
    async getUserMovieLike(userId) {
        return await this.movieService.findMoviesWithNoPaging({
            where: {
                movieLikes: {
                    some: {
                        userId,
                    },
                },
            },
        });
    }
    async updateMovie(id, body) {
        await this.movieService.updateMovie(id, body);
    }
    async deleteMovie(id) {
        await this.deleteMovie(id);
    }
    async deleteMovies(query) {
        await Promise.all(query.movieIds.split(',').map((id) => this.movieService.deleteMovie(id)));
    }
    async createMovieLike(id, user) {
        await this.movieService.createMovieLike(id, user.id);
    }
    async deleteMovieLike(id, user) {
        await this.movieService.deleteMovieLike(id, user.id);
    }
    async createCategory(body) {
        return await this.movieService.createCategory(body);
    }
    async deleteCategory(id) {
        return await this.movieService.deleteCategory(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스 / CMS] 영화 목록 불러오기 ',
        description: '영화 목록을 불러옵니다. 로그인 없이 사용 가능합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(jwt_nullable_guard_1.JwtNullableAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.MovieDTO,
        isPaging: true,
    }),
    __param(0, (0, kyoongdev_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kyoongdev_nestjs_1.PagingDTO, query_1.FindMovieQuery, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMovies", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스 / CMS] 영화 전체 수 불러오기 ',
        description: '영화 전체 수를 불러옵니다. 로그인 없이 사용 가능합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(jwt_nullable_guard_1.JwtNullableAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: movie_count_dto_1.MovieCountDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMovieCount", null);
__decorate([
    (0, common_1.Get)('me/like'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 내가 좋아요 한 영화 불러오기 ',
        description: '내가 좋아요한 영화를 불러옵니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.MovieDTO,
        isPaging: true,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMyMovieLikes", null);
__decorate([
    (0, common_1.Get)('genre'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스 / CMS] 영화 장르별로  불러오기 ',
        description: '영화를 장르별로 불러옵니다. 로그인 없이 사용 가능합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(jwt_nullable_guard_1.JwtNullableAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.MovieDTO,
        isPaging: true,
    }),
    __param(0, (0, kyoongdev_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kyoongdev_nestjs_1.PagingDTO, query_1.FindMovieByGenreQuery, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMoviesByGenre", null);
__decorate([
    (0, common_1.Get)('top'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] top10 영화 불러오기 ',
        description: 'top10 영화를 불러옵니다. 로그인 없이 사용 가능합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(jwt_nullable_guard_1.JwtNullableAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.MovieDTO,
        isPaging: true,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMoviesByTop", null);
__decorate([
    (0, common_1.Get)(':id/related'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 연관된 영화 불러오기 ',
        description: '연관된 영화를 불러옵니다. 로그인 없이 사용 가능합니다.',
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
        type: dto_1.MovieDTO,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getRelatedMovies", null);
__decorate([
    (0, common_1.Get)('category'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 영화 장르별로  불러오기 ',
        description: '영화를 장르별로 불러옵니다. 로그인 없이 사용 가능합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(jwt_nullable_guard_1.JwtNullableAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({}),
    __param(0, (0, kyoongdev_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kyoongdev_nestjs_1.PagingDTO,
        query_1.FindMovieByCategoryQuery, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMoviesByCategory", null);
__decorate([
    (0, common_1.Get)(':id/detail'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스 / CMS] 영화 자세히 불러오기 ',
        description: '영화를 자세히 불러옵니다. 로그인 없이 사용 가능합니다.',
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
        type: dto_1.MovieDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMovie", null);
__decorate([
    (0, common_1.Get)('/categories'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스 / CMS] 영화 카테고리 불러오기 ',
        description: '영화의 카테고리를 불러옵니다. 로그인 없이 사용 가능합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(jwt_nullable_guard_1.JwtNullableAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.CategoryDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('/genres'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스 / CMS] 영화 장르 불러오기 ',
        description: '영화의 장르를 불러옵니다. 로그인 없이 사용 가능합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(jwt_nullable_guard_1.JwtNullableAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.GenreDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getGenres", null);
__decorate([
    (0, common_1.Get)('/users/:userId/likes'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스 / CMS] 다른 사람이 좋아요한 영화 불러오기 ',
        description: '다른 사람이 좋아요한 영화를 불러옵니다. 로그인 없이 사용 가능합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(jwt_nullable_guard_1.JwtNullableAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.USER, true)),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'userId',
            type: 'string',
            required: true,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.GenreDTO,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getUserMovieLike", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 영화 수정하기',
        description: '영화를 수정합니다. 관리자만 사용 가능합니다.',
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
            type: dto_1.UpdateMovieDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateMovieDTO]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "updateMovie", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 영화 삭제하기',
        description: '영화를 삭제합니다. 관리자만 사용 가능합니다.',
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
    (0, kyoongdev_nestjs_1.ResponseApi)({ type: common_2.EmptyResponseDTO }, 204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "deleteMovie", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 영화 다수 삭제하기',
        description: '영화를 다수 삭제합니다. 관리자만 사용 가능합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN)),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({ type: common_2.EmptyResponseDTO }, 204),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.DeleteMovieQuery]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "deleteMovies", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 영화 좋아요 생성',
        description: '영화 좋아요를 생성합니다. 유저만 사용 가능합니다.',
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
    (0, kyoongdev_nestjs_1.ResponseApi)({ type: common_2.EmptyResponseDTO }, 201),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "createMovieLike", null);
__decorate([
    (0, common_1.Delete)(':id/like'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 영화 좋아요 삭제',
        description: '영화 좋아요를 삭제합니다. 유저만 사용 가능합니다.',
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
    (0, kyoongdev_nestjs_1.ResponseApi)({ type: common_2.EmptyResponseDTO }, 204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "deleteMovieLike", null);
__decorate([
    (0, common_1.Post)('category'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 영화 카테고리 생성',
        description: '영화 카테고리를 생성합니다. 관리자만 사용 가능합니다.',
    }),
    (0, kyoongdev_nestjs_1.Auth)(utils_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, utils_1.RoleInterceptorAPI)(utils_1.Role.ADMIN), utils_1.ResponseWithIdInterceptor),
    (0, kyoongdev_nestjs_1.RequestApi)({
        body: {
            type: dto_1.CreateCategoryDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({ type: common_2.ResponseWithIdDTO }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCategoryDTO]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Delete)('category/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '[CMS] 영화 카테고리 삭제',
        description: '영화 카테고리를 삭제합니다. 관리자만 사용 가능합니다.',
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
    (0, kyoongdev_nestjs_1.ResponseApi)({ type: common_2.ResponseWithIdDTO }, 201),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "deleteCategory", null);
MovieController = __decorate([
    (0, swagger_1.ApiTags)('영화'),
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
exports.MovieController = MovieController;
//# sourceMappingURL=movie.controller.js.map