import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { nanoid } from 'nanoid';
import { Jsonwebtoken, Role } from 'utils';
import bcrypt from 'bcrypt';
import { LoginDTO, RegisterDTO, SocialDTO, TokenDTO } from './dto';
import { KakaoService } from 'modules/kakao/kakao.service';
import { ConfigService } from '@nestjs/config';
import qs from 'querystring';

@Injectable()
export class AuthService {
  constructor(
    private readonly database: PrismaService,
    private readonly jwt: Jsonwebtoken,
    private readonly kakaoService: KakaoService,
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

  public kakaoLoginCallback = async (code: string | undefined) => {
    if (!code) {
      throw { status: 401, message: 'Invalid kakao code' };
    }
    const response = await this.kakaoService.getRestKakaoCallback(code);

    const { socialId, token } = response;

    const isExistUser = await this.database.user.findUnique({
      where: {
        socialId: `${socialId}`,
      },
    });

    if (isExistUser) {
      const tokens = this.createToken(isExistUser.id, Role.USER);

      return `${this.configService.get('CLIENT_URL')}/social?${qs.stringify({
        status: 200,
        ...tokens,
      })}`;
    } else {
      return `${this.configService.get('CLIENT_URL')}/social?${qs.stringify({
        status: 404,
        kakaoAccessToken: token,
        message: 'NotFoundUser',
      })}`;
    }
  };

  public kakaoUser = async (props: SocialDTO) => {
    const kakaoUser = await this.kakaoService.getKakaoUser(props.token);

    if (!kakaoUser) {
      throw { status: 401, message: '카카오 사용자 정보발급 오류!' };
    }

    const isExistUser = await this.database.user.findUnique({
      where: {
        socialId: `${kakaoUser.id}`,
      },
    });

    if (isExistUser) {
      return this.createToken(isExistUser.id, Role.USER);
    } else {
      const isExist = await this.database.user.findFirst({
        where: {
          email: props.email,
        },
      });
      if (isExist) throw new ConflictException('이미 존재하는 이메일입니다.');

      const newUser = await this.database.user.create({
        data: {
          email: props.email,
          name: props.name,
          socialId: `${kakaoUser.id}`,
        },
      });
      return this.createToken(newUser.id, Role.USER);
    }
  };

  kakaoLogin() {
    return this.kakaoService.getAuthUrl();
  }

  createToken(id: string, userType: keyof typeof Role): TokenDTO {
    const key = nanoid();
    const accessToken = this.jwt.signJwt({ id, userType, key }, { expiresIn: '2h' });
    const refreshToken = this.jwt.signJwt({ id, userType, key }, { expiresIn: '14d' });

    return new TokenDTO(accessToken, refreshToken);
  }
}
