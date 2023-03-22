import { Module } from '@nestjs/common';
import { ReviewModule } from 'modules/review/review.module';
import { UserModule } from 'modules/user/user.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [UserModule, ReviewModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
