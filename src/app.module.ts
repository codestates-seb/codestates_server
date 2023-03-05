import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import MODULES from 'modules';

@Module({
  imports: [...MODULES],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
