import { Module } from '@nestjs/common';
import { MovieModule } from 'modules/movie/movie.module';
import { UserModule } from 'modules/user/user.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [MovieModule, UserModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
