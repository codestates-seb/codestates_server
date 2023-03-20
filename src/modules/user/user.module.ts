import { forwardRef, Module } from '@nestjs/common';
import { MovieModule } from 'modules/movie/movie.module';
import { ReviewModule } from 'modules/review/review.module';
import { UserController } from './user.controller';
import { UserException } from './user.exception';
import { UserService } from './user.service';

@Module({
  imports: [forwardRef(() => ReviewModule), forwardRef(() => MovieModule)],
  controllers: [UserController],
  providers: [UserService, UserException],
  exports: [UserService, UserException],
})
export class UserModule {}
