import { ClassProvider, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import MODULES from 'modules';
import { ConfigModule } from '@nestjs/config';
import { Interceptors } from 'utils';
import { APP_INTERCEPTOR } from '@nestjs/core';

const InterceptorProvider: ClassProvider<any>[] = Interceptors.map((interceptor) => ({
  provide: APP_INTERCEPTOR,
  useClass: interceptor,
}));

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...MODULES,
  ],
  controllers: [AppController],
  providers: [AppService, ...InterceptorProvider],
})
export class AppModule {}
