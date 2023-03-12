import { Module } from '@nestjs/common';
import { MovieModule } from 'modules/movie/movie.module';
import { UserModule } from 'modules/user/user.module';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [MovieModule, UserModule],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
