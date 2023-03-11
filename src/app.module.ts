import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import MODULES from 'modules';
import { Filters, Interceptors } from 'utils';

const providers = [...Interceptors, ...Filters];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...MODULES,
  ],
  controllers: [AppController],
  providers: [AppService, ...providers],
})
export class AppModule {}
