import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { EmptyResponseDTO, ResponseWithIdDTO } from 'common';
import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { JwtAuthGuard, ReqUser, ResponseWithIdInterceptor, Role, RoleInterceptorAPI } from 'utils';

import { CreateUserDTO, UpdateUserDTO, UserCountDTO, UserDTO, UserInfoDTO } from './dto';
import { DeleteUsersQuery, FindUsersQuery } from './dto/query';
import { UserService } from './user.service';
import { JwtNullableAuthGuard } from 'utils/guards/jwt-nullable.guard';
//TODO: 유저 정보 / 수정 테스트
@ApiTags('유저')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('count')
  @ApiOperation({
    summary: '[CMS] 전체 이용자 수 구하기 ',
    description: '전체 이용자 수를 구합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
  @RequestApi({})
  @ResponseApi({
    type: UserCountDTO,
  })
  async getUserCount() {
    return await this.userService.getUserTotalCount();
  }

  @Get('me')
  @ApiOperation({
    summary: '[서비스] 나의 정보 불러오기',
    description: '나의 정보를 불러옵니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({})
  @ResponseApi({
    type: UserDTO,
  })
  async findMe(@ReqUser() user: User) {
    const me = await this.userService.findUser(user.id);
    return new UserDTO({
      ...me,
      preferredGenres: me.preferredGenres.map((genre) => ({
        genre: genre,
        genreId: genre.id,
      })),
    });
  }

  @Get('me/info')
  @ApiOperation({
    summary: '[서비스] 나의 추가 정보 불러오기 [좋아요/리뷰 개수/별점]',
    description: '나의 추가 정보를 불러옵니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({})
  @ResponseApi({
    type: UserInfoDTO,
  })
  async getMyInfo(@ReqUser() user: User) {
    return await this.userService.getUserInfo(user.id);
  }

  @Get(':userId/info')
  @ApiOperation({
    summary: '[서비스] 유저 추가 정보 불러오기 [좋아요/리뷰 개수/별점]',
    description: '유저 추가 정보를 불러옵니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    params: {
      name: 'userId',
      type: 'string',
      required: true,
    },
  })
  @ResponseApi({
    type: UserInfoDTO,
  })
  async getUserInfo(@Param('userId') userId: string) {
    return await this.userService.getUserInfo(userId);
  }

  @Get(':id/detail')
  @ApiOperation({
    summary: '[CMS / 서비스] 유저 자세히 불러오기',
    description: '유저의 자세한 정보를 불러옵니다.',
  })
  @Auth(JwtNullableAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
  })
  @ResponseApi({
    type: UserDTO,
  })
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findUser(id);
    return new UserDTO({
      ...user,
      preferredGenres: user.preferredGenres.map((genre) => {
        return { genre: genre, genreId: genre.id };
      }),
    });
  }

  @Get()
  @ApiOperation({
    summary: '[CMS] 유저 목록 불러오기',
    description: '유저의 목록 정보를 불러옵니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({})
  @ResponseApi({
    type: UserDTO,
    isPaging: true,
  })
  async findUsers(@Paging() paging: PagingDTO, @Query() query: FindUsersQuery) {
    return await this.userService.findUsers(paging, {
      where: {
        nickname: {
          contains: query.nickname,
        },
        name: {
          contains: query.name,
        },
      },
      orderBy: {
        ...(query.orderBy === 'COMMENT_COUNT' && {
          reviewComment: {
            _count: query.sortBy ? query.sortBy : 'desc',
          },
        }),
        ...(query.orderBy === 'CREATED_AT' && {
          createdAt: query.sortBy ? query.sortBy : 'desc',
        }),
        ...(query.orderBy === 'EMAIL' && {
          email: query.sortBy ? query.sortBy : 'desc',
        }),
        ...(query.orderBy === 'NAME' && {
          name: query.sortBy ? query.sortBy : 'desc',
        }),
        ...(query.orderBy === 'REVIEW_COUNT' && {
          Reviews: {
            _count: query.sortBy ? query.sortBy : 'desc',
          },
        }),
        ...(query.orderBy === 'LIKE_COUNT' && {
          likes: {
            _count: query.sortBy ? query.sortBy : 'desc',
          },
        }),
      },
    });
  }

  @Post()
  @ApiOperation({
    summary: '[CMS] 유저 생성하기',
    description: '유저를 생성합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(ResponseWithIdInterceptor, RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({
    body: {
      type: CreateUserDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createUser(@Body() body: CreateUserDTO) {
    return await this.userService.createUser(body);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '[CMS] 유저 수정하기',
    description: '유저를 수정합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
    body: {
      type: UpdateUserDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    await this.userService.updateUser(id, body);
  }

  @Patch('')
  @ApiOperation({
    summary: '[서비스] 나의 정보 수정하기',
    description: '나의 정보를 수정합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    body: {
      type: UpdateUserDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMe(@ReqUser() user: User, @Body() body: UpdateUserDTO) {
    await this.userService.updateUser(user.id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '[CMS] 유저 /관리자 삭제하기',
    description: '유저/관리자를 삭제합니다.',
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
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
  }

  @Delete('')
  @ApiOperation({
    summary: '[CMS] 유저 다수 삭제하기',
    description: '유저를 다수 삭제합니다.',
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
  async deleteUsers(@Query() query: DeleteUsersQuery) {
    await Promise.all(
      query.userIds.split(',').map(async (id: string) => {
        await this.userService.deleteUser(id);
      })
    );
  }
}
