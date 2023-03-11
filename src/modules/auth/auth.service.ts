import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { nanoid } from 'nanoid';
import { Jsonwebtoken, Role } from 'utils';
import bcrypt from 'bcrypt';
import { LoginDTO, RegisterDTO, TokenDTO } from './dto';
import { KakaoService } from 'modules/kakao/kakao.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly database: PrismaService,
    private readonly jwt: Jsonwebtoken,

    private readonly configService: ConfigService
  ) {}

  async login(props: LoginDTO) {
    const user = await this.database.user.findFirst({
      where: {
        email: props.email,
      },
    });

    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    const isMatch = await bcrypt.compare(props.password, user.password);
    if (!isMatch) throw new BadRequestException('비밀번호가 일치하지 않습니다.');

    return this.createToken(user.id, Role.USER);
  }

  async register(props: RegisterDTO) {
    const isExist = await this.database.user.findFirst({
      where: {
        email: props.email,
      },
    });
    if (isExist) throw new ConflictException('이미 존재하는 이메일입니다.');

    const user = await this.database.user.create({
      data: {
        email: props.email,
        password: await bcrypt.hash(props.password, Number(this.configService.get('PASSWORD_SALT'))),
        name: props.name,
      },
    });

    return this.createToken(user.id, Role.USER);
  }

  async refresh(props: TokenDTO): Promise<TokenDTO> {
    const { accessToken, refreshToken } = props;
    const accessTokenPayload = this.jwt.verifyJwt<{ id: string; userType: keyof typeof Role; key: string }>(
      accessToken,
      {
        ignoreExpiration: true,
      }
    );
    const refreshTokenPayload = this.jwt.verifyJwt<{ id: string; userType: keyof typeof Role; key: string }>(
      refreshToken
    );

    if (!accessTokenPayload) throw new BadRequestException('잘못된 액세스 토큰입니다.');
    if (!refreshTokenPayload)
      throw new BadRequestException('잘못된 리프레쉬 토큰이거나 유효기간이 지난 리프레쉬 토큰입니다.');

    if (accessTokenPayload.key !== refreshTokenPayload.key)
      throw new BadRequestException('토큰 key 값이 일치하지 않습니다.');
    if (accessTokenPayload.id !== refreshTokenPayload.id)
      throw new BadRequestException('토큰 id 값이 일치하지 않습니다.');

    return this.createToken(refreshTokenPayload.id, refreshTokenPayload.userType);
  }

  createToken(id: string, userType: keyof typeof Role): TokenDTO {
    const key = nanoid();
    const accessToken = this.jwt.signJwt({ id, userType, key }, { expiresIn: '2h' });
    const refreshToken = this.jwt.signJwt({ id, userType, key }, { expiresIn: '14d' });

    return new TokenDTO(accessToken, refreshToken);
  }
}
