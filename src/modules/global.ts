import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'database/prisma.module';
import { Jsonwebtoken } from 'utils';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [Jsonwebtoken],
  exports: [PrismaModule, Jsonwebtoken],
})
export class GlobalModule {}
