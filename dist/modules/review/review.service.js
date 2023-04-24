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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const movie_service_1 = require("../movie/movie.service");
const user_service_1 = require("../user/user.service");
const dto_1 = require("./dto");
const review_comment_dto_1 = require("./dto/review-comment.dto");
const user_review_info_dto_1 = require("./dto/user-review-info.dto");
let ReviewService = class ReviewService {
    constructor(database, userService, movieService) {
        this.database = database;
        this.userService = userService;
        this.movieService = movieService;
    }
    async getReviewCount() {
        const count = await this.database.movieReview.count();
        return new dto_1.ReviewCountDTO(count);
    }
    async getReviewAdditionInfo(reviewId, userId) {
        const likeCount = await this.getReviewLikeCount(reviewId);
        const hateCount = await this.getReviewHateCount(reviewId);
        const enjoyPoints = await this.getReviewEnjoyPoints(reviewId);
        const tensions = await this.getReviewTenstions(reviewId);
        return {
            likeCount,
            hateCount,
            isLiked: userId ? await this.findReviewLike(reviewId, userId) : false,
            isHated: userId ? await this.findReviewHate(reviewId, userId) : false,
            enjoyPoints,
            tensions,
        };
    }
    async findReview(id, userId) {
        const review = await this.database.movieReview.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
                reviewComments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                movie: {
                    include: {
                        reviews: true,
                        movieGenres: {
                            include: {
                                genre: true,
                            },
                        },
                    },
                },
            },
        });
        if (!review)
            throw new common_1.NotFoundException('리뷰가 존재하지 않습니다.');
        const addition = await this.getReviewAdditionInfo(review.id, userId);
        const { reviewComments, ...rest } = review;
        return new dto_1.ReviewDto({
            ...rest,
            comments: reviewComments,
            ...addition,
        });
    }
    async findReviewByMovieAndUser(movieId, userId) {
        const review = await this.database.movieReview.findFirst({
            where: {
                movieId,
                userId,
            },
            include: {
                user: true,
                reviewComments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                movie: {
                    include: {
                        reviews: true,
                        movieGenres: {
                            include: {
                                genre: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (!review)
            return null;
        const addition = await this.getReviewAdditionInfo(review.id, userId);
        const { reviewComments, ...rest } = review;
        return new dto_1.ReviewDto({
            ...rest,
            comments: reviewComments,
            ...addition,
        });
    }
    async findReviews(paging, args = {}, userId) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.database.movieReview.count({
            where: args.where,
        });
        const reviews = await this.database.movieReview.findMany({
            where: {
                ...args.where,
                content: {
                    not: null,
                },
            },
            include: {
                user: true,
                reviewComments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                movie: {
                    include: {
                        reviews: true,
                        movieGenres: {
                            include: {
                                genre: true,
                            },
                        },
                    },
                },
            },
            orderBy: args.orderBy ? args.orderBy : { createdAt: 'desc' },
            skip,
            take,
        });
        const reviewDTOs = await Promise.all(reviews.map(async (review) => {
            const addition = await this.getReviewAdditionInfo(review.id, userId);
            const { reviewComments, ...rest } = review;
            return new dto_1.ReviewDto({
                ...rest,
                comments: reviewComments,
                ...addition,
            });
        }));
        return new kyoongdev_nestjs_1.PaginationDTO(reviewDTOs, { count, paging });
    }
    async findReviewsWithNoPaging(args = {}, userId) {
        const reviews = await this.database.movieReview.findMany({
            where: {
                ...args.where,
                content: {
                    not: null,
                },
            },
            include: {
                user: true,
                reviewComments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                movie: {
                    include: {
                        reviews: true,
                        movieGenres: {
                            include: {
                                genre: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        const reviewDTOs = await Promise.all(reviews.map(async (review) => {
            const addition = await this.getReviewAdditionInfo(review.id, userId);
            const { reviewComments, ...rest } = review;
            return new dto_1.ReviewDto({
                ...rest,
                comments: reviewComments,
                ...addition,
            });
        }));
        return reviewDTOs;
    }
    async findReviewsByMovieId(movieId, userId, args = {}) {
        await this.movieService.findMovie(movieId);
        const reviews = await this.database.movieReview.findMany({
            where: {
                movieId,
                content: {
                    not: null,
                },
            },
            include: {
                user: true,
                reviewComments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                movie: {
                    include: {
                        reviews: true,
                        movieGenres: {
                            include: {
                                genre: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                ...args.orderBy,
            },
        });
        const reviewDtos = await Promise.all(reviews.map(async (review) => {
            const addition = await this.getReviewAdditionInfo(review.id, userId);
            const { reviewComments, ...rest } = review;
            return new dto_1.ReviewDto({
                ...rest,
                comments: reviewComments,
                ...addition,
            });
        }));
        return reviewDtos;
    }
    async findReviewsByUserId(userId) {
        const reviews = await this.database.movieReview.findMany({
            where: {
                content: {
                    not: null,
                },
                userId,
            },
            include: {
                user: true,
                reviewComments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                movie: {
                    include: {
                        reviews: true,
                        movieGenres: {
                            include: {
                                genre: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        const reviewDtos = await Promise.all(reviews.map(async (review) => {
            const addition = await this.getReviewAdditionInfo(review.id, userId);
            const { reviewComments, ...rest } = review;
            return new dto_1.ReviewDto({
                ...rest,
                comments: reviewComments,
                ...addition,
            });
        }));
        return reviewDtos;
    }
    async getUserReviewInfo(userId) {
        const reviews = await this.database.movieReview.findMany({
            where: {
                userId,
                content: {
                    not: null,
                },
            },
        });
        const score = reviews.reduce((acc, cur) => acc + cur.score, 0);
        return new user_review_info_dto_1.UserReviewInfoDTO({
            averageScore: score / reviews.length,
            reviewCount: reviews.length,
        });
    }
    async getReviewTenstions(reviewId) {
        const tensions = await this.database.reviewTension.findMany({
            where: {
                reviewId,
            },
        });
        return tensions.map((tension) => tension.name);
    }
    async getReviewEnjoyPoints(reviewId) {
        const enjoyPoints = await this.database.reviewEnjoyPoint.findMany({
            where: {
                reviewId,
            },
        });
        return enjoyPoints.map((enjoyPoint) => enjoyPoint.name);
    }
    async createReview(movieId, userId, props) {
        await this.userService.findUser(userId);
        await this.movieService.findMovie(movieId);
        const review = await this.database.movieReview.create({
            data: {
                content: props.content,
                score: props.score,
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
        if (props.enjoyPoints) {
            await Promise.all(props.enjoyPoints.map(async (point) => {
                await this.database.reviewEnjoyPoint.create({
                    data: {
                        review: {
                            connect: {
                                id: review.id,
                            },
                        },
                        name: point,
                    },
                });
            }));
        }
        if (props.tensions) {
            await Promise.all(props.tensions.map(async (tension) => {
                await this.database.reviewTension.create({
                    data: {
                        review: {
                            connect: {
                                id: review.id,
                            },
                        },
                        name: tension,
                    },
                });
            }));
        }
        return review.id;
    }
    async updateReview(id, props, userId) {
        const review = await this.findReview(id);
        if (userId && review.user.id !== userId)
            throw new common_1.ForbiddenException('리뷰를 수정할 권한이 없습니다.');
        if (props.enjoyPoints) {
            await this.database.reviewEnjoyPoint.deleteMany({
                where: {
                    reviewId: id,
                },
            });
            await Promise.all(props.enjoyPoints.map(async (point) => {
                await this.database.reviewEnjoyPoint.create({
                    data: {
                        review: {
                            connect: {
                                id: review.id,
                            },
                        },
                        name: point,
                    },
                });
            }));
        }
        if (props.tensions) {
            await this.database.reviewTension.deleteMany({
                where: {
                    reviewId: id,
                },
            });
            await Promise.all(props.tensions.map(async (tension) => {
                await this.database.reviewTension.create({
                    data: {
                        review: {
                            connect: {
                                id: review.id,
                            },
                        },
                        name: tension,
                    },
                });
            }));
        }
        await this.database.movieReview.update({
            where: {
                id,
            },
            data: {
                content: props.content,
                score: props.score,
            },
        });
    }
    async deleteReview(id, userId) {
        const review = await this.findReview(id);
        if (userId && review.user.id !== userId)
            throw new common_1.ForbiddenException('리뷰를 삭제할 권한이 없습니다.');
        await this.database.movieReview.delete({
            where: {
                id,
            },
        });
    }
    async findReviewComment(commentId) {
        const comment = await this.database.reviewComment.findUnique({
            where: {
                id: commentId,
            },
            include: {
                user: true,
            },
        });
        if (!comment)
            throw new common_1.NotFoundException('댓글이 존재하지 않습니다.');
        return new review_comment_dto_1.ReviewCommentDTO(comment);
    }
    async findReviewComments(reviewId) {
        await this.findReview(reviewId);
        const comments = await this.database.reviewComment.findMany({
            where: {
                reviewId,
            },
            include: {
                user: true,
            },
        });
        return comments.map((comment) => new review_comment_dto_1.ReviewCommentDTO(comment));
    }
    async findReviewCommentsByUserId(reviewId, userId) {
        await this.findReview(reviewId);
        const comments = await this.database.reviewComment.findMany({
            where: {
                reviewId,
                userId,
            },
            include: {
                user: true,
            },
        });
        return comments.map((comment) => new review_comment_dto_1.ReviewCommentDTO(comment));
    }
    async findUserReviewComments(userId) {
        const comments = await this.database.reviewComment.findMany({
            where: {
                userId,
            },
            include: {
                user: true,
            },
        });
        return comments.map((comment) => new review_comment_dto_1.ReviewCommentDTO(comment));
    }
    async createReviewComment(reviewId, userId, props) {
        await this.findReview(reviewId);
        this.userService.findUser(userId);
        const comment = await this.database.reviewComment.create({
            data: {
                content: props.content,
                review: {
                    connect: {
                        id: reviewId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return comment.id;
    }
    async updateReviewComment(commentId, userId, props) {
        const comment = await this.findReviewComment(commentId);
        if (comment.user.id !== userId)
            throw new common_1.ForbiddenException('댓글을 수정할 권한이 없습니다.');
        await this.database.reviewComment.update({
            where: {
                id: commentId,
            },
            data: {
                content: props.content,
            },
        });
    }
    async deleteReviewComment(commentId, userId) {
        const comment = await this.findReviewComment(commentId);
        if (comment.user.id !== userId)
            throw new common_1.ForbiddenException('댓글을 삭제할 권한이 없습니다.');
        await this.database.reviewComment.delete({
            where: {
                id: commentId,
            },
        });
    }
    async findReviewLike(reviewId, userId) {
        const like = await this.database.reviewLike.findUnique({
            where: {
                reviewId_userId: {
                    reviewId,
                    userId,
                },
            },
        });
        return like ? true : false;
    }
    async createReviewLike(reviewId, userId) {
        await this.findReview(reviewId);
        this.userService.findUser(userId);
        const isExist = await this.findReviewLike(reviewId, userId);
        if (isExist) {
            throw new common_1.ConflictException('이미 좋아요를 눌렀습니다.');
        }
        await this.database.reviewLike.create({
            data: {
                review: {
                    connect: {
                        id: reviewId,
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
    async deleteReviewLike(reviewId, userId) {
        await this.findReview(reviewId);
        this.userService.findUser(userId);
        const isExist = await this.findReviewLike(reviewId, userId);
        if (!isExist) {
            throw new common_1.ConflictException('좋아요를 누르지 않았습니다.');
        }
        await this.database.reviewLike.delete({
            where: {
                reviewId_userId: {
                    reviewId,
                    userId,
                },
            },
        });
    }
    async getReviewLikeCount(reviewId) {
        const likes = await this.database.reviewLike.count({
            where: {
                reviewId,
            },
        });
        return likes;
    }
    async findReviewHate(reviewId, userId) {
        const hate = await this.database.reviewHate.findUnique({
            where: {
                reviewId_userId: {
                    reviewId,
                    userId,
                },
            },
        });
        return hate ? true : false;
    }
    async createReviewHate(reviewId, userId) {
        await this.findReview(reviewId);
        this.userService.findUser(userId);
        const isExist = await this.findReviewHate(reviewId, userId);
        if (isExist) {
            throw new common_1.ConflictException('이미 싫어요를 눌렀습니다.');
        }
        await this.database.reviewHate.create({
            data: {
                review: {
                    connect: {
                        id: reviewId,
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
    async deleteReviewHate(reviewId, userId) {
        await this.findReview(reviewId);
        this.userService.findUser(userId);
        const isExist = await this.findReviewHate(reviewId, userId);
        if (!isExist) {
            throw new common_1.ConflictException('싫어요를 누르지 않았습니다.');
        }
        await this.database.reviewHate.delete({
            where: {
                reviewId_userId: {
                    reviewId,
                    userId,
                },
            },
        });
    }
    async getReviewHateCount(reviewId) {
        const hates = await this.database.reviewHate.count({
            where: {
                reviewId,
            },
        });
        return hates;
    }
};
ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        movie_service_1.MovieService])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map