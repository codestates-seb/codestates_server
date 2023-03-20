import { Body, Controller, Delete, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ResponseWithIdDTO } from 'common';
import { Auth, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { JwtAuthGuard, ReqUser, ResponseWithIdInterceptor, Role, RoleInterceptorAPI } from 'utils';
import { CreateReviewDTO, UpdateReviewDTO } from './dto';
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
}
