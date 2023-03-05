import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';
import { Type } from '@nestjs/common';
import { ErrorsInterceptor } from './error.interceptor';

export * from './data.interceptor';
export * from './response-with-id.interceptor';
export * from './role.interceptor';

export const Interceptors: Type<any>[] = [LoggingInterceptor, ErrorsInterceptor];
