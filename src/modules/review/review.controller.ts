import { Body, Controller, Delete, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ResponseWithIdDTO } from 'common';
import { Auth, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { JwtAuthGuard, ReqUser, ResponseWithIdInterceptor, Role, RoleInterceptorAPI } from 'utils';
import { CreateOrUpdateReviewDTO } from './dto';
import { ReviewService } from './review.service';

@ApiTags('리뷰')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':movieId')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    params: {
      name: 'movieId',
      type: 'string',
      required: true,
    },
    body: {
      type: CreateOrUpdateReviewDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createReview(@Param('movieId') movieId: string, @ReqUser() user: User, @Body() body: CreateOrUpdateReviewDTO) {
    return await this.reviewService.createReview(movieId, user.id, body);
  }

  @Patch(':id')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
    body: {
      type: CreateOrUpdateReviewDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    204
  )
  async updateReview(@Param('id') id: string, @ReqUser() user: User, @Body() body: CreateOrUpdateReviewDTO) {
    await this.reviewService.updateReview(id, user.id, body);
  }

  @Delete(':id')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
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
