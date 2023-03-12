import { Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { User } from '@prisma/client';
import { EmptyResponseDTO } from 'common';
import { Auth, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { JwtAuthGuard, ReqUser, Role, RoleInterceptorAPI } from 'utils';
import { BookmarkService } from './bookmark.service';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get('')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({})
  @ResponseApi({})
  async getBookmarks() {}

  @Post(':movieId')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    params: {
      name: 'movieId',
      type: 'string',
      required: true,
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
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    params: {
      name: 'movieId',
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
  async deleteBookmark(@Param('movieId') movieId: string, @ReqUser() user: User) {
    await this.bookmarkService.deleteBookmark(user.id, movieId);
  }
}
