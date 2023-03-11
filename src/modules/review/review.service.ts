import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly database: PrismaService) {}

  async getReviews(movieId: string) {}

  async createReview() {}

  async updateReview() {}

  async deleteReview() {}
}
