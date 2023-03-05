import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { KAKAO_CONFIG } from './constants';
import type { KakaoConfig } from './type';
import qs from 'querystring';
import axios from 'axios';
import { KakaoCallbackDTO } from './dto';

@Injectable()
export class KakaoService {
  constructor(@Inject(KAKAO_CONFIG) private options: KakaoConfig) {}

  async getKakaoToken(code: string, redirectUri?: string): Promise<string | undefined> {
    const data = qs.stringify({
      grant_type: 'authorization_code',
      client_id: this.options.CLIENT_ID,
      client_secret: this.options.SECRET_KEY,
      redirectUri: redirectUri || this.options.REDIRECT_URL,
      code,
    });

    try {
      const response = await axios.post(this.getTokenUrl(), data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const token = response.data?.access_token;
      return token;
    } catch (error) {
      throw new BadRequestException('카카오 토큰 발급 오류!');
    }
  }

  async getKakaoUser(token: string): Promise<{ id: string } | undefined> {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    try {
      const response = await axios.get(this.getUserUrl(), {
        headers,
      });
      const { id } = response.data;

      return { id };
    } catch (error) {
      throw new InternalServerErrorException('카카오 유저정보 발급 오류!');
    }
  }

  async getRestKakaoCallback(code: string): Promise<KakaoCallbackDTO> {
    try {
      const token = await this.getKakaoToken(code);
      if (!token) {
        throw { status: 400, message: '카카오 토큰 발급 오류!' };
      }

      const user = await this.getKakaoUser(token);
      if (!user) {
        throw new InternalServerErrorException('카카오 유저정보 발급 오류!');
      }

      return new KakaoCallbackDTO({ socialId: user.id, token });
    } catch (error) {
      const e = error as any;
      return e;
    }
  }

  async logoutKakaoUser(id: string) {
    try {
      const headers = {
        Authorization: `KakaoAK ${this.options.ADMIN_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      };

      const data = qs.stringify({
        target_id_type: 'user_id',
        target_id: id,
      });

      const response = await axios.post('https://kapi.kakao.com/v1/user/logout', data, { headers });

      return response.data;
    } catch (err: any) {
      throw new InternalServerErrorException('카카오 로그아웃 실패');
    }
  }

  getAuthUrl() {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.options.CLIENT_ID}&redirect_uri=${this.options.REDIRECT_URL}&response_type=code`;
  }

  private getTokenUrl() {
    return 'https://kauth.kakao.com/oauth/token';
  }

  private getUserUrl() {
    return 'https://kapi.kakao.com/v2/user/me';
  }
}
