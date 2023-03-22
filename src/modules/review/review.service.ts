import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { MovieService } from 'modules/movie/movie.service';
import { UserService } from 'modules/user/user.service';
import { CreateReviewDTO, ReviewDTOProps, ReviewDto, UpdateReviewDTO, CreateReviewCommentDTO } from './dto';
import { ReviewCommentDTO } from './dto/review-comment.dto';
import { UserReviewInfoDTO } from './dto/user-review-info.dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly database: PrismaService,
    private readonly userService: UserService,
    private readonly movieService: MovieService
  ) {}

  async findReview(id: string, userId?: string) {
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
      },
    });

    if (!review) throw new NotFoundException('리뷰가 존재하지 않습니다.');

    const likeCount = await this.getReviewLikeCount(id);
    const hateCount = await this.getReviewHateCount(id);

    const { reviewComments, ...rest } = review;

    return new ReviewDto({
      ...rest,
      comments: reviewComments,
      likeCount,
      hateCount,
      isLiked: userId ? await this.findReviewLike(id, userId) : false,
      isHated: userId ? await this.findReviewHate(id, userId) : false,
    });
  }

  async findReviews(movieId: string, userId?: string) {
    await this.movieService.findMovie(movieId);

    const reviews = await this.database.movieReview.findMany({
      where: {
        movieId,
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const reviewDtos = await Promise.all(
      reviews.map(async (review) => {
        const likeCount = await this.getReviewLikeCount(review.id);
        const hateCount = await this.getReviewHateCount(review.id);

        const { reviewComments, ...rest } = review;

        return new ReviewDto({
          ...rest,
          comments: reviewComments,
          likeCount,
          hateCount,
          isLiked: userId ? await this.findReviewLike(review.id, userId) : false,
          isHated: userId ? await this.findReviewHate(review.id, userId) : false,
        });
      })
    );

    return reviewDtos;
  }

  async getUserReviewInfo(userId: string) {
    const reviews = await this.database.movieReview.findMany({
      where: {
        userId,
      },
    });

    const score = reviews.reduce((acc, cur) => acc + cur.score, 0);

    return new UserReviewInfoDTO({
      averageScore: score / reviews.length,
      reviewCount: reviews.length,
    });
  }

  async createReview(movieId: string, userId: string, props: CreateReviewDTO) {
    this.userService.findUser(userId);
    this.movieService.findMovie(movieId);

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
    return review.id;
  }

  async updateReview(id: string, userId: string, props: UpdateReviewDTO) {
    const review = await this.findReview(id);

    if (review.user.id !== userId) throw new ForbiddenException('리뷰를 수정할 권한이 없습니다.');

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

  async deleteReview(id: string, userId: string) {
    const review = await this.findReview(id);

    if (review.user.id !== userId) throw new ForbiddenException('리뷰를 삭제할 권한이 없습니다.');

    await this.database.movieReview.delete({
      where: {
        id,
      },
    });
  }

  async findReviewComment(commentId: string) {
    const comment = await this.database.reviewComment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        user: true,
      },
    });

    if (!comment) throw new NotFoundException('댓글이 존재하지 않습니다.');

    return new ReviewCommentDTO(comment);
  }

  async findReviewComments(reviewId: string) {
    await this.findReview(reviewId);

    const comments = await this.database.reviewComment.findMany({
      where: {
        reviewId,
      },
      include: {
        user: true,
      },
    });

    return comments.map((comment) => new ReviewCommentDTO(comment));
  }

  async createReviewComment(reviewId: string, userId: string, props: CreateReviewCommentDTO) {
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

  async updateReviewComment(commentId: string, userId: string, props: CreateReviewCommentDTO) {
    const comment = await this.findReviewComment(commentId);

    if (comment.user.id !== userId) throw new ForbiddenException('댓글을 수정할 권한이 없습니다.');

    await this.database.reviewComment.update({
      where: {
        id: commentId,
      },
      data: {
        content: props.content,
      },
    });
  }

  async deleteReviewComment(commentId: string, userId: string) {
    const comment = await this.findReviewComment(commentId);

    if (comment.user.id !== userId) throw new ForbiddenException('댓글을 삭제할 권한이 없습니다.');

    await this.database.reviewComment.delete({
      where: {
        id: commentId,
      },
    });
  }

  async findReviewLike(reviewId: string, userId: string) {
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

  async createReviewLike(reviewId: string, userId: string) {
    await this.findReview(reviewId);
    this.userService.findUser(userId);

    const isExist = await this.findReviewLike(reviewId, userId);

    if (isExist) {
      throw new ConflictException('이미 좋아요를 눌렀습니다.');
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

  async deleteReviewLike(reviewId: string, userId: string) {
    await this.findReview(reviewId);
    this.userService.findUser(userId);

    const isExist = await this.findReviewLike(reviewId, userId);

    if (!isExist) {
      throw new ConflictException('좋아요를 누르지 않았습니다.');
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

  async getReviewLikeCount(reviewId: string) {
    const likes = await this.database.reviewLike.count({
      where: {
        reviewId,
      },
    });

    return likes;
  }

  async findReviewHate(reviewId: string, userId: string) {
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

  async createReviewHate(reviewId: string, userId: string) {
    await this.findReview(reviewId);
    this.userService.findUser(userId);

    const isExist = await this.findReviewHate(reviewId, userId);

    if (isExist) {
      throw new ConflictException('이미 싫어요를 눌렀습니다.');
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

  async deleteReviewHate(reviewId: string, userId: string) {
    await this.findReview(reviewId);
    this.userService.findUser(userId);

    const isExist = await this.findReviewHate(reviewId, userId);

    if (!isExist) {
      throw new ConflictException('싫어요를 누르지 않았습니다.');
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

  async getReviewHateCount(reviewId: string) {
    const hates = await this.database.reviewHate.count({
      where: {
        reviewId,
      },
    });

    return hates;
  }
}
