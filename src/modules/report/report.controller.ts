import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { JwtAuthGuard, ReqUser, Role, RoleInterceptorAPI } from 'utils';
import { FindReportsQuery } from './dto/query/find-reports.query';
import { ReportsDTO, UpdateReviewReportDTO, ReportDTO, AdminUpdateReviewReportDTO, ReportStatusDTO } from './dto';
import { ReportService } from './report.service';
import { EmptyResponseDTO } from 'common';
import { DeleteReportQuery } from './dto/query';

@ApiTags('신고')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @ApiOperation({
    summary: '[CMS] 신고 목록 조회',
    description: '신고 목록을 조회합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({})
  @ResponseApi({
    type: ReportsDTO,
    isPaging: true,
  })
  async getReports(@Query() query: FindReportsQuery, @Paging() paging: PagingDTO) {
    return this.reportService.findReports(paging, {
      where: {
        user: {
          name: {
            contains: query.username,
          },
        },
      },
    });
  }
  @Get('status')
  @ApiOperation({
    summary: '[CMS] 신고 상태 조회',
    description: '신고 상태를 조회합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({})
  @ResponseApi({
    type: ReportStatusDTO,
  })
  async getReportStatus() {
    return this.reportService.getReportStatus();
  }

  @Get('/me')
  @ApiOperation({
    summary: '[서비스] 나의 신고 목록 조회',
    description: '나의 신고 목록을 조회합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ReportsDTO,
    isPaging: true,
  })
  async getMyReports(@Paging() paging: PagingDTO, @ReqUser() user: User) {
    return this.reportService.findReports(paging, {
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }
  @Get(':id/detail')
  @ApiOperation({
    summary: '[서비스] 나의 신고 목록 조회',
    description: '나의 신고 목록을 조회합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
      description: 'report id',
    },
  })
  @ResponseApi({
    type: ReportDTO,
  })
  async getReport(@Param('id') id: string) {
    return this.reportService.findReport(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '[서비스] 나의 신고 수정',
    description: '나의 신고를 수정합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
      description: 'report id',
    },
    body: {
      type: UpdateReviewReportDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateReport(@Param('id') id: string, @Body() body: UpdateReviewReportDTO, @ReqUser() user: User) {
    await this.reportService.updateReport(id, body, user.id);
  }

  @Patch(':id/admin')
  @ApiOperation({
    summary: '[CMS] 신고 수정',
    description:
      '신고를 수정합니다. 관리자만 사용 가능합니다.<br/> 무시 - type : "IGNORE"<br/>탈퇴 - type : "USER_DELETE" (실제 탈퇴는 이루어지지 않습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
      description: 'report id',
    },
    body: {
      type: AdminUpdateReviewReportDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async adminUpdateReport(@Param('id') id: string, @Body() body: AdminUpdateReviewReportDTO) {
    await this.reportService.adminUpdateReport(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '[서비스] 나의 신고 삭제',
    description: '나의 신고를 삭제합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
      description: 'report id',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteReport(@Param('id') id: string, @ReqUser() user: User) {
    await this.reportService.deleteReport(id, user.id);
  }

  @Delete(':id/admin')
  @ApiOperation({
    summary: '[CMS] 신고 삭제',
    description: '신고를 삭제합니다. 관리자만 사용할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
      description: 'report id',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async adminDeleteReport(@Param('id') id: string) {
    await this.reportService.deleteReport(id);
  }

  @Delete('admin/many')
  @ApiOperation({
    summary: '[CMS] 신고 다수 삭제',
    description: '신고를 다수 삭제합니다. 관리자만 사용할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({})
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async adminDeleteReports(@Query() query: DeleteReportQuery) {
    await Promise.all(query.reportIds.split(',').map((id) => this.reportService.deleteReport(id)));
  }
}
