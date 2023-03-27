import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  // imports: [
  //   KakaoModule.forRootAsync({
  //     imports: [ConfigModule],
  //     useFactory: (configService: ConfigService) => {
  //       return {
  //         ADMIN_KEY: configService.get('KAKAO_ADMIN_KEY'),
  //         CLIENT_ID: configService.get('KAKAO_CLIENT_ID'),
  //         REDIRECT_URL: configService.get('KAKAO_REDIRECT_URL'),
  //         SECRET_KEY: configService.get('KAKAO_SECRET_KEY'),
  //       };
  //     },
  //     inject: [ConfigService],
  //   }),
  // ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
