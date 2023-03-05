import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { nanoid } from 'nanoid';
import { Jsonwebtoken, Role } from 'utils';
import bcrypt from 'bcrypt';
import { LoginDTO, RegisterDTO, TokenDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly database: PrismaService, private readonly jwt: Jsonwebtoken) {}

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
        password: await bcrypt.hash(props.password, 10),
        name: props.name,
      },
    });

    return this.createToken(user.id, Role.USER);
  }

  createToken(id: string, userType: keyof typeof Role): TokenDTO {
    const key = nanoid();
    const accessToken = this.jwt.signJwt({ id, userType, key }, { expiresIn: '2h' });
    const refreshToken = this.jwt.signJwt({ id, userType, key }, { expiresIn: '14d' });

    return new TokenDTO(accessToken, refreshToken);
  }
}
