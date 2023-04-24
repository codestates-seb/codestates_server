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
exports.BookmarkService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const movie_service_1 = require("../movie/movie.service");
const query_1 = require("../movie/query");
const user_service_1 = require("../user/user.service");
const dto_1 = require("./dto");
let BookmarkService = class BookmarkService {
    constructor(database, movieService, userService) {
        this.database = database;
        this.movieService = movieService;
        this.userService = userService;
    }
    async findBookmark(userId, movieId) {
        await this.userService.findUser(userId);
        await this.movieService.findMovie(movieId);
        const bookmark = (await this.database.movieBookmark.findUnique({
            where: {
                movieId_userId: {
                    movieId,
                    userId,
                },
            },
            include: {
                movie: {
                    include: query_1.movieIncludeOption,
                },
                user: true,
            },
        }));
        if (!bookmark) {
            throw new common_1.NotFoundException('북마크가 존재하지 않습니다.');
        }
        return new dto_1.BookmarkDTO(bookmark, userId);
    }
    async findBookmarkByUserIdWithPaging(paging, userId, args = {}) {
        await this.userService.findUser(userId);
        const { skip, take } = paging.getSkipTake();
        const count = await this.database.movieBookmark.count({
            where: {
                userId,
                ...args.where,
            },
        });
        const bookmarks = (await this.database.movieBookmark.findMany({
            skip,
            take,
            where: {
                userId,
                ...args.where,
            },
            include: {
                movie: {
                    include: query_1.movieIncludeOption,
                },
                user: true,
            },
        }));
        return new kyoongdev_nestjs_1.PaginationDTO(bookmarks.map((bookmark) => new dto_1.BookmarkDTO(bookmark, userId)), { count, paging });
    }
    async findBookmarksByUserId(userId) {
        await this.userService.findUser(userId);
        const bookmarks = (await this.database.movieBookmark.findMany({
            where: {
                userId,
            },
            include: {
                movie: {
                    include: query_1.movieIncludeOption,
                },
                user: true,
            },
        }));
        return bookmarks.map((bookmark) => new dto_1.BookmarkDTO(bookmark, userId));
    }
    async createBookmark(userId, movieId) {
        await this.userService.findUser(userId);
        await this.movieService.findMovie(movieId);
        const isExist = await this.database.movieBookmark.findUnique({
            where: {
                movieId_userId: {
                    movieId,
                    userId,
                },
            },
        });
        if (isExist) {
            return;
        }
        await this.database.movieBookmark.create({
            data: {
                movie: {
                    connect: {
                        id: movieId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }
    async deleteBookmark(userId, movieId) {
        await this.userService.findUser(userId);
        await this.movieService.findMovie(movieId);
        await this.findBookmark(userId, movieId);
        await this.database.movieBookmark.delete({
            where: {
                movieId_userId: {
                    movieId,
                    userId,
                },
            },
        });
    }
};
BookmarkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        movie_service_1.MovieService,
        user_service_1.UserService])
], BookmarkService);
exports.BookmarkService = BookmarkService;
//# sourceMappingURL=bookmark.service.js.map