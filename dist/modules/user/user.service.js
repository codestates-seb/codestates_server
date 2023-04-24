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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../database/prisma.service");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const movie_service_1 = require("../movie/movie.service");
const review_service_1 = require("../review/review.service");
const dto_1 = require("./dto");
const user_exception_1 = require("./user.exception");
let UserService = class UserService {
    constructor(database, exception, config, reviewService, movieService) {
        this.database = database;
        this.exception = exception;
        this.config = config;
        this.reviewService = reviewService;
        this.movieService = movieService;
    }
    async getUserTotalCount() {
        const count = await this.database.user.count();
        return new dto_1.UserCountDTO(count);
    }
    async getUserInfo(userId) {
        await this.findUser(userId);
        const reviewInfo = await this.reviewService.getUserReviewInfo(userId);
        const likeCount = await this.movieService.getUserLikeCount(userId);
        return new dto_1.UserInfoDTO({
            averageScore: reviewInfo.averageScore,
            reviewCount: reviewInfo.reviewCount,
            likeCount,
        });
    }
    async findUsers(paging, args = {}) {
        const { take, skip } = paging.getSkipTake();
        const count = await this.database.user.count({
            where: args.where,
        });
        const users = await this.database.user.findMany({
            ...args,
            skip,
            take,
            include: {
                userGenres: {
                    select: {
                        genreId: true,
                        genre: true,
                    },
                },
                Reviews: true,
                likes: true,
            },
            orderBy: {
                ...args.orderBy,
            },
        });
        return new kyoongdev_nestjs_1.PaginationDTO(users.map((user) => new dto_1.UserDTO({
            ...user,
            preferredGenres: user.userGenres.map((genre) => ({
                genreId: genre.genreId,
                genre: genre.genre,
            })),
            reviewCount: user.Reviews.length,
            likeCount: user.likes.length,
        })), { count, paging });
    }
    async findUser(id) {
        const user = await this.database.user.findUnique({
            where: {
                id,
            },
            include: {
                userGenres: {
                    select: {
                        genreId: true,
                        genre: true,
                    },
                },
            },
        });
        this.exception.userNotFound(user);
        return new dto_1.UserDetailDTO({
            ...user,
            preferredGenres: user.userGenres.map((genre) => ({
                genreId: genre.genreId,
                genre: genre.genre,
            })),
        });
    }
    async createUser(props) {
        const user = await this.database.user.create({
            data: {
                ...props,
                email: props.email,
                name: props.name,
                password: await props.hashPassword(Number(this.config.get('PASSWORD_SALT'))),
            },
        });
        return user.id;
    }
    async updateUser(id, props) {
        const user = await this.findUser(id);
        if (props.password) {
            await props.hashPassword(Number(this.config.get('PASSWORD_SALT')));
        }
        const { preferredGenres, ...rest } = props;
        if (preferredGenres) {
            await this.database.userGenre.deleteMany({
                where: {
                    userId: user.id,
                },
            });
            await this.database.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    userGenres: {
                        create: preferredGenres.map((genre) => ({ genreId: genre })),
                    },
                },
            });
        }
        await this.database.user.update({
            where: {
                id: user.id,
            },
            data: {
                ...rest,
            },
        });
    }
    async deleteUser(id) {
        const user = await this.findUser(id);
        await this.database.user.delete({
            where: {
                id: user.id,
            },
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => review_service_1.ReviewService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => movie_service_1.MovieService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_exception_1.UserException,
        config_1.ConfigService,
        review_service_1.ReviewService,
        movie_service_1.MovieService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map