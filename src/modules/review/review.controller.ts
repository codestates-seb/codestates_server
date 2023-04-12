import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { EmptyResponseDTO, ResponseWithIdDTO } from 'common';
import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { JwtAuthGuard, ReqUser, ResponseWithIdInterceptor, Role, RoleInterceptorAPI, DataInterceptor } from 'utils';
import {
  CreateReviewCommentDTO,
  CreateReviewDTO,
  ReviewCommentDTO,
  ReviewCountDTO,
  ReviewDto,
  ReviewsDto,
  UpdateReviewDTO,
} from './dto';
import { DeleteReviewsQuery, FindReviewsQuery, FindReviewsWithMovieQuery } from './dto/query';
import { ReviewService } from './review.service';
import { JwtNullableAuthGuard } from 'utils/guards/jwt-nullable.guard';

@ApiTags('리뷰')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('count')
  @ApiOperation({
    summary: '[CMS] 영화 리뷰 수 구하기',
    description: '영화의 리뷰 수를 구합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
  @RequestApi({})
  @ResponseApi(
    {
      type: ReviewCountDTO,
    },
    200
  )
  async getReviewCount() {
    return await this.reviewService.getReviewCount();
  }

  @Get('')
  @ApiOperation({
    summary: '[CMS] 리뷰 목록 조회',
    description: '리뷰 목록을 조회합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({})
  @ResponseApi(
    {
      type: ReviewDto,
      isPaging: true,
    },
    200
  )
  async getReviews(@Paging() paging: PagingDTO, @Query() query: FindReviewsQuery) {
    return await this.reviewService.findReviews(paging, {
      where: {
        user: {
          name: {
            contains: query.name,
          },
          nickname: {
            contains: query.nickname,
          },
        },
      },
      orderBy: {
        ...(query.orderBy === 'NAME' && { movie: { title: query.sortBy ? query.sortBy : 'desc' } }),
        ...(query.orderBy === 'CREATED_AT' && { createdAt: query.sortBy ? query.sortBy : 'desc' }),
        ...(query.orderBy === 'LIKE' && { reviewLikes: { _count: query.sortBy ? query.sortBy : 'desc' } }),
        ...(query.orderBy === 'USERNAME' && { user: { name: query.sortBy ? query.sortBy : 'desc' } }),
      },
    });
  }
  @Get('me')
  @ApiOperation({
    summary: '[서비스] 내 리뷰 목록 조회',
    description: '내 리뷰 목록을 조회합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({})
  @ResponseApi(
    {
      type: ReviewDto,
      isArray: true,
    },
    200
  )
  async getMyReviews(@ReqUser() user: User) {
    return await this.reviewService.findReviewsByUserId(user.id);
  }
  @Get('me/paging')
  @ApiOperation({
    summary: '[서비스] 내 리뷰 목록 조회 - 페이징',
    description: '내 리뷰 목록을 조회합니다. - 페이징',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi(
    {
      type: ReviewDto,
      isPaging: true,
    },
    200
  )
  async getMyReviewsWithPaging(@Paging() paging: PagingDTO, @ReqUser() user: User) {
    return await this.reviewService.findReviews(paging, {
      where: {
        userId: user.id,
      },
    });
  }

  @Get('movie/:movieId')
  @ApiOperation({
    summary: '[서비스] 영화 리뷰 목록 조회',
    description: '영화의 리뷰 목록을 조회합니다. 유저가 사용할 경우, 유저의 리뷰 정보를 함께 반환합니다.',
  })
  @Auth(JwtNullableAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
  @RequestApi({
    params: {
      name: 'movieId',
      type: 'string',
      required: true,
      description: '영화의 id',
    },
  })
  @ResponseApi(
    {
      type: ReviewDto,
      isArray: true,
    },
    200
  )
  async getReviewsByMovieId(
    @Param('movieId') movieId: string,
    @Query() query: FindReviewsWithMovieQuery,
    @ReqUser() user?: User
  ) {
    return await this.reviewService.findReviewsByMovieId(movieId, user?.id, {
      orderBy: {
        ...(query.orderBy === 'CREATED_AT' && { createdAt: 'desc' }),
        ...(query.orderBy === 'LIKE_HIGH' && { reviewLikes: { _count: 'desc' } }),
        ...(query.orderBy === 'LIKE_LOW' && { reviewLikes: { _count: 'asc' } }),
      },
    });
  }
  @Get('movie/:movieId/me')
  @ApiOperation({
    summary: '[서비스] 나의 영화 리뷰 조회',
    description: '나의 영화 리뷰를 조회합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    params: {
      name: 'movieId',
      type: 'string',
      required: true,
      description: '영화의 id',
    },
  })
  @ResponseApi(
    {
      type: ReviewDto,
    },
    200
  )
  async getMyReviewByMovieId(@Param('movieId') movieId: string, @ReqUser() user: User) {
    return await this.reviewService.findReviewByMovieAndUser(movieId, user.id);
  }

  @Get('movie/:movieId/paging')
  @ApiOperation({
    summary: '[서비스] 영화 리뷰 목록 조회 - 페이징',
    description: '영화의 리뷰 목록을 조회합니다. 유저가 사용할 경우, 유저의 리뷰 정보를 함께 반환합니다.',
  })
  @Auth(JwtNullableAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
  @RequestApi({
    params: {
      name: 'movieId',
      type: 'string',
      required: true,
      description: '영화의 id',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi(
    {
      type: ReviewDto,
      isPaging: true,
    },
    200
  )
  async getReviewsByMovieIdWithPaging(
    @Paging() paging: PagingDTO,
    @Param('movieId') movieId: string,
    @ReqUser() user?: User
  ) {
    return await this.reviewService.findReviews(
      paging,
      {
        where: {
          movieId,
        },
      },
      user.id
    );
  }

  @Get(':id/detail')
  @ApiOperation({
    summary: '[서비스] 영화 리뷰 상세 조회',
    description: '영화의 리뷰를 상세 조회합니다. 유저가 사용할 경우, 유저의 리뷰 정보를 함께 반환합니다.',
  })
  @Auth(JwtNullableAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
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
      type: ReviewDto,
    },
    200
  )
  async getReview(@Param('id') id: string, @ReqUser() user?: User) {
    return await this.reviewService.findReview(id, user?.id);
  }

  @Post(':movieId')
  @ApiOperation({
    summary: '[서비스] 영화 리뷰 생성',
    description: '영화의 리뷰를 생성합니다. 유저만 사용이 가능합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(ResponseWithIdInterceptor, RoleInterceptorAPI(Role.USER))
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
    await this.reviewService.updateReview(id, body, user.id);
  }

  @Patch(':id/admin')
  @ApiOperation({
    summary: '[CMS] 리뷰 수정',
    description: '리뷰를 수정합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
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
      type: EmptyResponseDTO,
    },
    204
  )
  async updateReviewAdmin(@Param('id') id: string, @Body() body: UpdateReviewDTO) {
    await this.reviewService.updateReview(id, body);
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
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteReview(@Param('id') id: string, @ReqUser() user: User) {
    return await this.reviewService.deleteReview(id, user.id);
  }

  @Delete(':id/admin')
  @ApiOperation({
    summary: '[CMS] 리뷰 삭제',
    description: '리뷰를 삭제합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
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
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteReviewAdmin(@Param('id') id: string) {
    await this.reviewService.deleteReview(id);
  }

  @Delete('many/admin')
  @ApiOperation({
    summary: '[CMS] 리뷰 다수 삭제',
    description: '리뷰를 다수 삭제합니다.',
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
  async deleteReviewsAdmin(@Query() query: DeleteReviewsQuery) {
    await Promise.all(query.reviewIds.split(',').map(async (id) => this.reviewService.deleteReview(id)));
  }

  @Get(':id/comments/me')
  @ApiOperation({
    summary: '[서비스] 내가 특정 리뷰에 작성한 리뷰 댓글 조회',
    description: '내가 특정 리뷰에  작성한 리뷰 댓글을 조회합니다. 유저만 사용할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
      description: '리뷰의 id',
    },
  })
  @ResponseApi({
    type: ReviewCommentDTO,
    isArray: true,
  })
  async getMyReviewCommentsByReview(@Param('id') id: string, @ReqUser() user: User) {
    return await this.reviewService.findReviewCommentsByUserId(id, user.id);
  }

  @Get('comments/me')
  @ApiOperation({
    summary: '[서비스] 내가 작성한 리뷰 댓글 조회',
    description: '내가 작성한 리뷰 댓글을 조회합니다. 유저만 사용할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({})
  @ResponseApi({
    type: ReviewCommentDTO,
    isArray: true,
  })
  async getMyReviewComments(@ReqUser() user: User) {
    return await this.reviewService.findUserReviewComments(user.id);
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

  @Get('users/:userId')
  @ApiOperation({
    summary: '[서비스] 유저가 남긴 리뷰 조회',
    description: '유저가 남긴 리뷰를 조회합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    params: {
      name: 'userId',
      type: 'string',
      required: true,
      description: '유저의 id',
    },
  })
  @ResponseApi({
    type: ReviewDto,
    isArray: true,
  })
  async getReviewsByUserId(@Param('userId') userId: string) {
    return await this.reviewService.findReviewsWithNoPaging({
      where: {
        userId,
      },
    });
  }

  @Get('users/:userId/likes')
  @ApiOperation({
    summary: '[서비스] 유저가 좋아요한 리뷰 조회',
    description: '유저가 좋아요한 리뷰를 조회합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    params: {
      name: 'userId',
      type: 'string',
      required: true,
      description: '유저의 id',
    },
  })
  @ResponseApi({
    type: ReviewDto,
    isArray: true,
  })
  async getReviewLikesByUserId(@Param('userId') userId: string) {
    return await this.reviewService.findReviewsWithNoPaging({
      where: {
        reviewLikes: {
          some: {
            userId,
          },
        },
      },
    });
  }

  @Post(':id/like')
  @ApiOperation({
    summary: '[서비스] 리뷰 좋아요',
    description: '리뷰에 좋아요를 누릅니다. 유저만 사용할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
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
      type: EmptyResponseDTO,
    },
    204
  )
  async createReviewLike(@Param('id') id: string, @ReqUser() user: User) {
    await this.reviewService.createReviewLike(id, user.id);
  }
  @Delete(':id/like')
  @ApiOperation({
    summary: '[서비스] 리뷰 좋아요 삭제',
    description: '리뷰에 좋아요 삭제를 누릅니다. 유저만 사용할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
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
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteReviewLike(@Param('id') id: string, @ReqUser() user: User) {
    await this.reviewService.deleteReviewLike(id, user.id);
  }

  @Post(':id/hate')
  @ApiOperation({
    summary: '[서비스] 리뷰 싫어요',
    description: '리뷰에 싫어요를 누릅니다. 유저만 사용할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
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
      type: EmptyResponseDTO,
    },
    204
  )
  async createReviewHate(@Param('id') id: string, @ReqUser() user: User) {
    await this.reviewService.createReviewHate(id, user.id);
  }

  @Delete(':id/hate')
  @ApiOperation({
    summary: '[서비스] 리뷰 싫어요 삭제',
    description: '리뷰에 싫어요 삭제를 누릅니다. 유저만 사용할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
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
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteReviewHate(@Param('id') id: string, @ReqUser() user: User) {
    await this.reviewService.deleteReviewHate(id, user.id);
  }
}
