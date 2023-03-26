import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { UserModule } from 'modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [FaqService],
  controllers: [FaqController],
})
export class FaqModule {}
