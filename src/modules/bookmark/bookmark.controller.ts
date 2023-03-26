import { Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { EmptyResponseDTO } from 'common';
import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { JwtAuthGuard, ReqUser, Role, RoleInterceptorAPI } from 'utils';
import { BookmarkService } from './bookmark.service';
import { BookmarkDTO } from './dto';
@ApiTags('북마크')
@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get('me')
  @ApiOperation({
    summary: '[서비스] 나의 북마크 조회',
    description: '내가 북마크한 영화를 조회합니다. 유저만 사용할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({})
  @ResponseApi({
    type: BookmarkDTO,
    isArray: true,
  })
  async getMyBookmarks(@ReqUser() user: User) {
    return await this.bookmarkService.findBookmarksByUserId(user.id);
  }

  @Get('me/paging')
  @ApiOperation({
    summary: '[서비스] 나의 북마크 조회',
    description: '내가 북마크한 영화를 조회합니다. 유저만 사용할 수 있습니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: BookmarkDTO,
    isPaging: true,
  })
  async getMyBookmarksWithPaging(@Paging() paging: PagingDTO, @ReqUser() user: User) {
    return await this.bookmarkService.findBookmarkByUserIdWithPaging(paging, user.id);
  }

  @Post(':movieId')
  @ApiOperation({
    summary: '[서비스] 북마크 생성',
    description: '북마크를 생성합니다. 유저만 사용할 수 있습니다. 한번 생성했다면 추가 생성할 수 없습니다.',
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
      type: EmptyResponseDTO,
    },
    201
  )
  async createBookmark(@Param('movieId') movieId: string, @ReqUser() user: User) {
    await this.bookmarkService.createBookmark(user.id, movieId);
  }

  @Delete(':movieId')
  @ApiOperation({
    summary: '[서비스] 북마크 삭제',
    description: '북마크를 삭제합니다. 유저만 사용할 수 있습니다.',
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
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteBookmark(@Param('movieId') movieId: string, @ReqUser() user: User) {
    await this.bookmarkService.deleteBookmark(user.id, movieId);
  }
}
