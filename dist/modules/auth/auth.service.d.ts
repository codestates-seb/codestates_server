import { PrismaService } from 'database/prisma.service';
import { Jsonwebtoken, Role } from 'utils';
import { LoginDTO, RegisterDTO, TokenDTO } from './dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly database;
    private readonly jwt;
    private readonly configService;
    constructor(database: PrismaService, jwt: Jsonwebtoken, configService: ConfigService);
    login(props: LoginDTO, role: keyof typeof Role): Promise<TokenDTO>;
    register(props: RegisterDTO, role: keyof typeof Role): Promise<TokenDTO>;
    refresh(props: TokenDTO): Promise<TokenDTO>;
    createToken(id: string, userType: keyof typeof Role): TokenDTO;
}
