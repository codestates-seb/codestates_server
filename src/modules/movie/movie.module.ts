import { Module } from '@nestjs/common';
import { UserModule } from 'modules/user/user.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [UserModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
