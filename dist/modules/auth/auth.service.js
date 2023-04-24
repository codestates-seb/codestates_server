"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const nanoid_1 = require("nanoid");
const utils_1 = require("../../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dto_1 = require("./dto");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(database, jwt, configService) {
        this.database = database;
        this.jwt = jwt;
        this.configService = configService;
    }
    async login(props, role) {
        const user = await this.database.user.findFirst({
            where: {
                email: props.email,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('존재하지 않는 유저입니다.');
        const isMatch = await bcrypt_1.default.compare(props.password, user.password);
        if (!isMatch)
            throw new common_1.BadRequestException('비밀번호가 일치하지 않습니다.');
        console.log(user, role);
        if (user.userType.toLowerCase() !== role.toLowerCase())
            throw new common_1.BadRequestException('권한이 일치하지 않습니다.');
        return this.createToken(user.id, role);
    }
    async register(props, role) {
        const isExist = await this.database.user.findFirst({
            where: {
                email: props.email,
            },
        });
        if (isExist)
            throw new common_1.ConflictException('이미 존재하는 이메일입니다.');
        const user = await this.database.user.create({
            data: {
                email: props.email,
                password: await bcrypt_1.default.hash(props.password, Number(this.configService.get('PASSWORD_SALT'))),
                name: props.name,
                birth: props.birth,
                nickname: props.nickname,
                userType: role,
            },
        });
        return this.createToken(user.id, role);
    }
    async refresh(props) {
        const { accessToken, refreshToken } = props;
        const accessTokenPayload = this.jwt.verifyJwt(accessToken, {
            ignoreExpiration: true,
        });
        const refreshTokenPayload = this.jwt.verifyJwt(refreshToken);
        if (!accessTokenPayload)
            throw new common_1.BadRequestException('잘못된 액세스 토큰입니다.');
        if (!refreshTokenPayload)
            throw new common_1.BadRequestException('잘못된 리프레쉬 토큰이거나 유효기간이 지난 리프레쉬 토큰입니다.');
        if (accessTokenPayload.key !== refreshTokenPayload.key)
            throw new common_1.BadRequestException('토큰 key 값이 일치하지 않습니다.');
        if (accessTokenPayload.id !== refreshTokenPayload.id)
            throw new common_1.BadRequestException('토큰 id 값이 일치하지 않습니다.');
        return this.createToken(refreshTokenPayload.id, refreshTokenPayload.userType);
    }
    createToken(id, userType) {
        const key = (0, nanoid_1.nanoid)();
        const accessToken = this.jwt.signJwt({ id, userType, key }, { expiresIn: '2h' });
        const refreshToken = this.jwt.signJwt({ id, userType, key }, { expiresIn: '14d' });
        return new dto_1.TokenDTO(accessToken, refreshToken);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        utils_1.Jsonwebtoken,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map