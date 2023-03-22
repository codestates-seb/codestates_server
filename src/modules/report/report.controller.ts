import { Controller, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { UpdateReviewReportDTO } from './dto/update-review-report.dto';

@ApiTags('신고')
@Controller('reports')
export class ReportController {
  @Patch()
  @RequestApi({
    body: {
      type: UpdateReviewReportDTO,
    },
  })
  @ResponseApi({})
  async updateReport() {}
}
