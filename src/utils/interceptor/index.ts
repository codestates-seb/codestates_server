import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';
import { ClassProvider, Type } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

export * from './data.interceptor';
export * from './response-with-id.interceptor';
export * from './role.interceptor';

export const Interceptors: ClassProvider<any>[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
];
