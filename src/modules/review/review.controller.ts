import { Body, Controller, Delete, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { EmptyResponseDTO, ResponseWithIdDTO } from 'common';
import { Auth, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { JwtAuthGuard, ReqUser, ResponseWithIdInterceptor, Role, RoleInterceptorAPI } from 'utils';
import { CreateReviewCommentDTO, CreateReviewDTO, UpdateReviewDTO } from './dto';
import { ReviewService } from './review.service';

@ApiTags('리뷰')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':movieId')
  @ApiOperation({
    summary: '[서비스] 영화 리뷰 생성',
    description: '영화의 리뷰를 생성합니다. 유저만 사용이 가능합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    params: {
      name: 'movieId',
      type: 'string',
      required: true,
      description: '영화의 id',
    },
    body: {
      type: CreateReviewDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createReview(@Param('movieId') movieId: string, @ReqUser() user: User, @Body() body: CreateReviewDTO) {
    return await this.reviewService.createReview(movieId, user.id, body);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '[서비스] 리뷰 수정',
    description: '리뷰를 수정합니다. 유저만 사용할 수 있으며, 본인의 리뷰만 수정할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
      description: '리뷰의 id',
    },
    body: {
      type: UpdateReviewDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    204
  )
  async updateReview(@Param('id') id: string, @ReqUser() user: User, @Body() body: UpdateReviewDTO) {
    await this.reviewService.updateReview(id, user.id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '[서비스] 리뷰 삭제',
    description: '리뷰를 삭제합니다. 유저만 사용할 수 있으며, 본인의 리뷰만 삭제할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
      description: '리뷰의 id',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    204
  )
  async deleteReview(@Param('id') id: string, @ReqUser() user: User) {
    return await this.reviewService.deleteReview(id, user.id);
  }

  @Post(':id/comments')
  @ApiOperation({
    summary: '[서비스] 리뷰 댓글 생성',
    description: '리뷰에 댓글을 생성합니다. 유저만 사용할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
      description: '리뷰의 id',
    },
    body: {
      type: CreateReviewCommentDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createReviewComment(@Param('id') id: string, @ReqUser() user: User, @Body() body: CreateReviewCommentDTO) {
    return await this.reviewService.createReviewComment(id, user.id, body);
  }

  @Patch('comments/:id')
  @ApiOperation({
    summary: '[서비스] 리뷰 댓글 수정',
    description: '리뷰에 댓글을 수정합니다. 본인만 사용할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
      description: '댓글의  id',
    },
    body: {
      type: CreateReviewCommentDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateReviewComment(@Param('id') id: string, @ReqUser() user: User, @Body() body: CreateReviewCommentDTO) {
    await this.reviewService.updateReviewComment(id, user.id, body);
  }

  @Delete('comments/:id')
  @ApiOperation({
    summary: '[서비스] 리뷰 댓글 삭제',
    description: '리뷰에 댓글을 삭제합니다. 본인만 사용할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
      description: '댓글의  id',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteReviewComment(@Param('id') id: string, @ReqUser() user: User) {
    await this.reviewService.deleteReviewComment(id, user.id);
  }
}
