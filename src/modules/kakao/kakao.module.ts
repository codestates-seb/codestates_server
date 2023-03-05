import { DynamicModule, Module } from '@nestjs/common';
import { KAKAO_CONFIG } from './constants';
import { KakaoService } from './kakao.service';
import type { KakaoConfig, KakaoForRootProps } from './type';

@Module({})
export class KakaoModule {
  static forRoot(config: KakaoConfig): DynamicModule {
    return {
      module: KakaoModule,
      providers: [
        {
          provide: KAKAO_CONFIG,
          useValue: config,
        },
        KakaoService,
      ],
      exports: [KakaoService],
    };
  }

  static forRootAsync(config: KakaoForRootProps): DynamicModule {
    const { useFactory } = config;
    return {
      module: KakaoModule,
      imports: config.imports,
      providers: [
        {
          provide: KAKAO_CONFIG,
          useFactory,
          inject: config.inject,
        },
        KakaoService,
        ...config.inject,
      ],
      exports: [KakaoService],
    };
  }
}
