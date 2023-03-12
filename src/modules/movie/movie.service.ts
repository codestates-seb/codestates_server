import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';

@Injectable()
export class MovieService {
  constructor(private readonly database: PrismaService) {}

  async findMovie(id: string) {}

  async findMovies() {}

  async createMovieLike() {}

  async deleteMovieLike() {}

  async updateMovie() {}

  async deleteMovie() {}
}
