"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("./database/prisma.service");
const log_1 = require("./log");
const app_module_1 = require("./app.module");
const express_session_1 = __importDefault(require("express-session"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: log_1.winstonLogger,
        cors: {
            origin: '*',
        },
    });
    const prismaService = app.get(prisma_service_1.PrismaService);
    await prismaService.enableShutdownHooks(app);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.use((0, express_session_1.default)({
        secret: configService.get('SESSION_SECRET'),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('[ABC-Lab] Server API')
        .setDescription('ABC-Lab API 문서입니다.')
        .setVersion('0.1')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(8000, () => {
        console.info('🔹Server is running on port 8000🔹!!');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map