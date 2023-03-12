import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO, TokenDTO } from './dto';

@ApiTags('로그인/회원가입')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/admin')
  @ApiOperation({
    summary: '[CMC] 로그인',
    description: '관리자 로그인을 합니다.',
  })
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
  async loginAdmin(@Body() props: LoginDTO) {
    return this.authService.login(props, 'ADMIN');
  }

  @Post('register/admin')
  @ApiOperation({
    summary: '[CMS] 회원가입',
    description: '관리자 회원가입을 합니다.',
  })
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
  async registerAdmin(@Body() props: RegisterDTO) {
    return this.authService.register(props, 'ADMIN');
  }

  @Post('login')
  @ApiOperation({
    summary: '[서비스] 로그인',
    description: '로그인을 합니다.',
  })
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
    return this.authService.login(props, 'USER');
  }

  @Post('register')
  @ApiOperation({
    summary: '[서비스] 회원가입',
    description: '회원가입을 합니다.',
  })
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
    return this.authService.register(props, 'USER');
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
