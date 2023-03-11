import { Body, Controller, Get, Post, Query, Response } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Response as ResponseType } from 'express';
import { RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO, SocialDTO, TokenDTO } from './dto';

@ApiTags('로그인/회원가입')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @RequestApi({
    body: {
      type: LoginDTO,
    },
  })
  @ResponseApi(
    {
      type: TokenDTO,
    },
    200
  )
  async login(@Body() props: LoginDTO) {
    return this.authService.login(props);
  }

  @Post('register')
  @RequestApi({
    body: {
      type: RegisterDTO,
    },
  })
  @ResponseApi(
    {
      type: TokenDTO,
    },
    200
  )
  async register(@Body() props: RegisterDTO) {
    return this.authService.register(props);
  }

  @Post('/refresh')
  @RequestApi({
    body: {
      type: TokenDTO,
    },
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async refresh(@Body() body: TokenDTO) {
    return await this.authService.refresh(body);
  }
}
