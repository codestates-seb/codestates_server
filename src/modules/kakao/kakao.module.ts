import { DynamicModule, Module } from '@nestjs/common';
import { KAKAO_CONFIG } from './constants';
import { KakaoService } from './kakao.service';
import type { KakaoConfig } from './type';

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
}
