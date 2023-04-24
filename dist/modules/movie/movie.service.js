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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const user_service_1 = require("../user/user.service");
const dto_1 = require("./dto");
const movie_count_dto_1 = require("./dto/movie-count.dto");
const query_1 = require("./query");
let MovieService = class MovieService {
    constructor(database, userService) {
        this.database = database;
        this.userService = userService;
    }
    async getMovieTotalCount() {
        const count = await this.database.movie.count();
        return new movie_count_dto_1.MovieCountDTO(count);
    }
    async findMovie(id, userId) {
        const movie = (await this.database.movie.findUnique({
            where: {
                id,
            },
            include: query_1.movieIncludeOption,
        }));
        if (!movie) {
            throw new common_1.NotFoundException('영화를 찾을 수 없습니다.');
        }
        return new dto_1.MovieDTO(movie, userId);
    }
    async findMoviesByGenre(genreIds) {
        const movies = (await this.database.movie.findMany({
            where: {
                movieGenres: {
                    some: {
                        OR: genreIds.map((id) => ({ genreId: id })),
                    },
                },
            },
            include: query_1.movieIncludeOption,
        }));
        return movies.map((movie) => new dto_1.MovieDTO(movie));
    }
    async findMovieGenres() {
        const genres = await this.database.genre.findMany({});
        return genres.map((genre) => new dto_1.GenreDTO({
            genre: genre,
            genreId: genre.id,
        }));
    }
    async findMovies(paging, args = {}, userId) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.database.movie.count({
            where: {
                ...args.where,
            },
        });
        const rows = (await this.database.movie.findMany({
            skip,
            take,
            where: {
                ...args.where,
            },
            include: query_1.movieIncludeOption,
            orderBy: {
                ...args.orderBy,
            },
        }));
        return new kyoongdev_nestjs_1.PaginationDTO(rows.map((row) => new dto_1.MovieDTO(row, userId)), { count, paging });
    }
    async findMoviesWithNoPaging(args = {}, userId) {
        const rows = (await this.database.movie.findMany({
            where: {
                ...args.where,
            },
            include: query_1.movieIncludeOption,
            orderBy: {
                ...args.orderBy,
            },
        }));
        return rows.map((row) => new dto_1.MovieDTO(row, userId));
    }
    async getUserLikeCount(userId) {
        const count = await this.database.movieLike.count({
            where: {
                userId,
            },
        });
        return count;
    }
    async createMovieLike(movieId, userId) {
        await this.findMovie(movieId);
        await this.userService.findUser(userId);
        const movieLike = await this.database.movieLike.findUnique({
            where: {
                movieId_userId: {
                    movieId,
                    userId,
                },
            },
        });
        if (movieLike) {
            throw new common_1.ConflictException('이미 좋아요를 누른 영화입니다.');
        }
        await this.database.movieLike.create({
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
    async deleteMovieLike(movieId, userId) {
        const movieLike = await this.database.movieLike.findUnique({
            where: {
                movieId_userId: {
                    movieId,
                    userId,
                },
            },
        });
        if (!movieLike) {
            throw new common_1.ConflictException('좋아요를 누르지 않은 영화입니다.');
        }
        await this.database.movieLike.delete({
            where: {
                movieId_userId: {
                    movieId,
                    userId,
                },
            },
        });
    }
    async updateMovie(id, props) {
        const { actors, genres, staffs, ...rest } = props;
        const movie = await this.findMovie(id);
        let updateArgs = {
            where: {
                id: movie.id,
            },
            data: {
                ...rest,
            },
        };
        if (actors) {
            const actorsIds = await Promise.all(actors.map(async (actorName) => {
                const actor = await this.database.actor.findFirst({
                    where: {
                        name: actorName,
                    },
                });
                if (!actor) {
                    const newActor = await this.database.actor.create({
                        data: {
                            name: actorName,
                        },
                    });
                    return newActor.id;
                }
                else {
                    return actor.id;
                }
            }));
            updateArgs = {
                where: updateArgs.where,
                data: {
                    ...updateArgs.data,
                    movieActors: {
                        createMany: {
                            data: actorsIds.map((actorId) => ({
                                actorId,
                            })),
                        },
                    },
                },
            };
        }
        if (genres) {
            const genresIds = await Promise.all(genres.map(async (genreName) => {
                const genre = await this.database.genre.findFirst({
                    where: {
                        name: genreName,
                    },
                });
                if (!genre) {
                    const newGenre = await this.database.genre.create({
                        data: {
                            name: genreName,
                        },
                    });
                    return newGenre.id;
                }
                else {
                    return genre.id;
                }
            }));
            updateArgs = {
                where: updateArgs.where,
                data: {
                    ...updateArgs.data,
                    movieGenres: {
                        createMany: {
                            data: genresIds.map((genreId) => ({
                                genreId,
                            })),
                        },
                    },
                },
            };
        }
        if (staffs) {
            const staffsIds = await Promise.all(staffs.map(async (staff) => {
                const isExist = await this.database.staff.findFirst({
                    where: {
                        name: staff.name,
                        role: staff.role,
                    },
                });
                if (!isExist) {
                    const newStaff = await this.database.staff.create({
                        data: {
                            name: staff.name,
                            role: staff.role,
                        },
                    });
                    return newStaff.id;
                }
                else {
                    return isExist.id;
                }
            }));
            updateArgs = {
                where: updateArgs.where,
                data: {
                    ...updateArgs.data,
                    movieStaffs: {
                        createMany: {
                            data: staffsIds.map((staffId) => ({
                                staffId,
                            })),
                        },
                    },
                },
            };
        }
        await this.database.movie.update(updateArgs);
    }
    async deleteMovie(id) {
        await this.findMovie(id);
        await this.database.movie.delete({
            where: {
                id,
            },
        });
    }
    async findCategory(id) {
        const category = await this.database.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            throw new common_1.NotFoundException('카테고리를 찾을 수 없습니다.');
        }
        return new dto_1.CategoryDTO({
            category: category,
            categoryId: category.id,
        });
    }
    async findCategories() {
        const categories = await this.database.category.findMany();
        return categories.map((category) => new dto_1.CategoryDTO({ category: category, categoryId: category.id }));
    }
    async findCategoryByName(name) {
        const category = await this.database.category.findFirst({
            where: {
                name,
            },
        });
        if (!category) {
            throw new common_1.NotFoundException('카테고리를 찾을 수 없습니다.');
        }
        return new dto_1.CategoryDTO({ category: category, categoryId: category.id });
    }
    async createCategory(props) {
        const isExist = await this.findCategoryByName(props.name);
        if (isExist) {
            throw new common_1.ConflictException('이미 존재하는 카테고리입니다.');
        }
        const category = await this.database.category.create({
            data: {
                name: props.name,
            },
        });
        return category.id;
    }
    async deleteCategory(id) {
        await this.findCategory(id);
        await this.database.category.delete({
            where: {
                id,
            },
        });
    }
};
MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map