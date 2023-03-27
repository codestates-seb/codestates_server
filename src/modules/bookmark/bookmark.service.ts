import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { MovieService } from 'modules/movie/movie.service';
import { movieIncludeOption } from 'modules/movie/query';
import { UserService } from 'modules/user/user.service';
import { BookmarkDTO, BookmarkDTOProps } from './dto';

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

    const bookmark = (await this.database.movieBookmark.findUnique({
      where: {
        movieId_userId: {
          movieId,
          userId,
        },
      },
      include: {
        movie: {
          include: movieIncludeOption,
        },
        user: true,
      },
    })) as BookmarkDTOProps | undefined | null;

    if (!bookmark) {
      throw new NotFoundException('북마크가 존재하지 않습니다.');
    }

    return new BookmarkDTO(bookmark);
  }

  async findBookmarkByUserIdWithPaging(
    paging: PagingDTO,
    userId: string,
    args = {} as Prisma.MovieBookmarkFindManyArgs
  ) {
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
          include: movieIncludeOption,
        },
        user: true,
      },
    })) as BookmarkDTOProps[];

    return new PaginationDTO<BookmarkDTO>(
      bookmarks.map((bookmark) => new BookmarkDTO(bookmark)),
      { count, paging }
    );
  }

  async findBookmarksByUserId(userId: string) {
    await this.userService.findUser(userId);

    const bookmarks = (await this.database.movieBookmark.findMany({
      where: {
        userId,
      },
      include: {
        movie: {
          include: movieIncludeOption,
        },
        user: true,
      },
    })) as BookmarkDTOProps[];

    return bookmarks.map((bookmark) => new BookmarkDTO(bookmark));
  }

  async createBookmark(userId: string, movieId: string) {
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
