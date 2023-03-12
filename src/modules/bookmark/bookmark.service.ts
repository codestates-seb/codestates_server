import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { MovieService } from 'modules/movie/movie.service';
import { UserService } from 'modules/user/user.service';

@Injectable()
export class BookmarkService {
  constructor(
    private readonly database: PrismaService,
    private readonly movieService: MovieService,
    private readonly userService: UserService
  ) {}

  async findBookmark(userId: string, movieId: string) {
    await this.userService.findUser(userId);
    await this.movieService.findMovie(movieId);

    const bookmark = await this.database.movieBookmark.findUnique({
      where: {
        movieId_userId: {
          movieId,
          userId,
        },
      },
      include: {
        movie: true,
        user: true,
      },
    });
    if (!bookmark) {
      throw new NotFoundException('북마크가 존재하지 않습니다.');
    }

    return bookmark;
  }

  async findBookmarks(userId: string) {
    await this.userService.findUser(userId);

    const bookmarks = await this.database.movieBookmark.findMany({
      where: {
        userId,
      },
      include: {
        movie: true,
        user: true,
      },
    });

    //TODO: 영화 DTO
    return bookmarks;
  }

  async createBookmark(userId: string, movieId: string) {
    await this.userService.findUser(userId);
    await this.movieService.findMovie(movieId);

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
  async deleteBookmark(userId: string, movieId: string) {
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
}
