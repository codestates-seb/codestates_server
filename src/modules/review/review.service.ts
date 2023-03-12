import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { MovieService } from 'modules/movie/movie.service';
import { UserService } from 'modules/user/user.service';
import { CreateOrUpdateReviewDTO } from './dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly database: PrismaService,
    private readonly userService: UserService,
    private readonly movieService: MovieService
  ) {}

  async findReview(id: string) {
    const review = await this.database.movieReview.findUnique({
      where: {
        id,
      },
    });

    if (!review) throw new NotFoundException('리뷰가 존재하지 않습니다.');

    return review;
  }

  async createReview(movieId: string, userId: string, props: CreateOrUpdateReviewDTO) {
    const user = this.userService.findUser(userId);
    const movie = this.movieService.findMovie(movieId);

    const review = await this.database.movieReview.create({
      data: {
        content: props.content,
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

  async updateReview(id: string, userId: string, props: CreateOrUpdateReviewDTO) {
    const review = await this.findReview(id);

    if (review.userId !== userId) throw new ForbiddenException('리뷰를 수정할 권한이 없습니다.');

    await this.database.movieReview.update({
      where: {
        id,
      },
      data: {
        content: props.content,
      },
    });
  }

  async deleteReview(id: string, userId: string) {
    const review = await this.findReview(id);

    if (review.userId !== userId) throw new ForbiddenException('리뷰를 삭제할 권한이 없습니다.');

    await this.database.movieReview.delete({
      where: {
        id,
      },
    });
  }
}
