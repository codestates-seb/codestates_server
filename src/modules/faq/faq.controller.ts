import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { EmptyResponseDTO, ResponseWithIdDTO } from 'common';
import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { JwtAuthGuard, ReqUser, ResponseWithIdInterceptor, Role, RoleInterceptorAPI } from 'utils';
import { CreateFaqCommentDTO, CreateFaqDTO, FAQDto, FAQsDto, UpdateFaqCommentDTO, UpdateFaqDTO } from './dto';
import { FindFaqQuery } from './dto/query';
import { FaqService } from './faq.service';
import { DeleteFaqQuery } from './dto/query';

@Controller('faqs')
@ApiTags('FAQ')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get(':id/detail')
  @ApiOperation({
    summary: '[CMS / 서비스] faq 자세히 불러오기 ',
    description: 'faq를 자세히 불러옵니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
  })
  @ResponseApi({
    type: FAQDto,
  })
  async findFaq(id: string) {
    return this.faqService.findFaq(id);
  }

  @Get()
  @ApiOperation({
    summary: '[CMS] faq 목록 불러오기 ',
    description: 'faq의 목록을 불러옵니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({})
  @ResponseApi({
    type: FAQsDto,
    isPaging: true,
  })
  async findFaqs(@Paging() paging: PagingDTO, @Query() query: FindFaqQuery) {
    return this.faqService.findFaqs(paging, {
      where: {
        user: {
          name: {
            contains: query.userName,
          },
        },
      },
      orderBy: {
        ...(query.orderBy === 'CONTENT' && { content: query.sortBy ? query.sortBy : 'desc' }),
        ...(query.orderBy === 'CREATED_AT' && { createdAt: query.sortBy ? query.sortBy : 'desc' }),
        ...(query.orderBy === 'TITLE' && { title: query.sortBy ? query.sortBy : 'desc' }),
        ...(query.orderBy === 'USERNAME' && {
          user: {
            name: query.sortBy ? query.sortBy : 'desc',
          },
        }),
      },
    });
  }

  @Get('me')
  @ApiOperation({
    summary: '[서비스] 나의 faq 목록 불러오기 ',
    description: '나의 faq 목록을 불러옵니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: FAQsDto,
    isPaging: true,
  })
  async findMyFaqs(@Paging() paging: PagingDTO, @ReqUser() user: User) {
    console.log({ user });
    return this.faqService.findFaqs(paging, {
      where: {
        userId: user.id,
      },
    });
  }

  @Post()
  @ApiOperation({
    summary: '[서비스] faq 생성하기 ',
    description: 'faq를 생성합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER), ResponseWithIdInterceptor)
  @RequestApi({
    body: {
      type: CreateFaqDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createFaq(@Body() props: CreateFaqDTO, @ReqUser() user: User) {
    return this.faqService.createFaq(user.id, props);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '[서비스] 나의 faq 수정하기 ',
    description: '나의 faq를 수정합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
    body: {
      type: UpdateFaqDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateFaq(@Body() props: UpdateFaqDTO, @ReqUser() user: User, @Param('id') id: string) {
    return this.faqService.updateFaq(id, user.id, props);
  }

  @Delete(':id/me')
  @ApiOperation({
    summary: '[서비스] 나의 faq 삭제하기 ',
    description: '나의 faq를 삭제합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteFaq(@ReqUser() user: User, @Param('id') id: string) {
    return this.faqService.deleteFaq(id, user.id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '[CMS] faq 삭제하기 ',
    description: ' faq를 삭제합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async adminDeleteFaq(@Param('id') id: string) {
    return this.faqService.deleteFaq(id);
  }
  @Delete('')
  @ApiOperation({
    summary: '[CMS] faq 다수 삭제하기 ',
    description: ' faq를 다수 삭제합니다.',
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
  async adminDeleteFaqs(@Query() query: DeleteFaqQuery) {
    await Promise.all(query.faqIds.split(',').map(async (id) => this.faqService.deleteFaq(id)));
  }

  @Post(':id/comments')
  @ApiOperation({
    summary: '[CMS] faq 댓글 생성하기 ',
    description: 'faq 댓글을 생성합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN), ResponseWithIdInterceptor)
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
      description: 'faq id',
    },
    body: {
      type: CreateFaqCommentDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createFaqComment(@Param('id') id: string, @Body() props: CreateFaqDTO, @ReqUser() user: User) {
    return this.faqService.createFaqComment(id, user.id, props);
  }

  @Patch('comments/:id')
  @ApiOperation({
    summary: '[CMS] faq 댓글 수정하기 ',
    description: 'faq 댓글을 수정합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
    body: {
      type: UpdateFaqCommentDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateFaqComment(@Param('id') id: string, @Body() props: UpdateFaqCommentDTO, @ReqUser() user: User) {
    return this.faqService.updateFaqComment(id, user.id, props);
  }

  @Delete('comments/:id')
  @ApiOperation({
    summary: '[CMS] faq 댓글 삭제하기 ',
    description: ' faq 댓글을 삭제합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteFaqComment(@Param('id') id: string) {
    return this.faqService.deleteFaqComment(id);
  }
}
