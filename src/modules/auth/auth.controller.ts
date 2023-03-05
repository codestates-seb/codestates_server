import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('로그인/회원가입')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
