import { forwardRef, Module } from '@nestjs/common';
import { MovieModule } from 'modules/movie/movie.module';
import { UserModule } from 'modules/user/user.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [forwardRef(() => MovieModule), forwardRef(() => UserModule)],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
