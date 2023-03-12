import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PagingDTO } from 'kyoongdev-nestjs';

@Injectable()
export class MovieService {
  constructor(private readonly database: PrismaService) {}

  async findMovie(id: string) {}

  async findMovies(paging: PagingDTO, args = {} as Prisma.MovieFindManyArgs) {}

  async createMovieLike(userId: string, movieId: string) {}

  async deleteMovieLike(userId: string, movieId: string) {}

  async updateMovie(id: string) {}

  async deleteMovie(id: string) {
    await this.findMovie(id);

    await this.database.movie.delete({
      where: {
        id,
      },
    });
  }
}
