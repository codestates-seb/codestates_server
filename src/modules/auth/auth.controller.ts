import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO, TokenDTO } from './dto';

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
}
