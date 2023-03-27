import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { EmptyResponseDTO, ResponseWithIdDTO } from 'common';
import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { JwtAuthGuard, ReqUser, ResponseWithIdInterceptor, Role, RoleInterceptorAPI } from 'utils';
import { JwtNullableAuthGuard } from 'utils/guards/jwt-nullable.guard';
import { CategoryDTO, CreateCategoryDTO, MovieDTO, UpdateMovieDTO } from './dto';
import { MovieCountDTO } from './dto/movie-count.dto';
import { FindMovieByCategoryQuery, FindMovieByGenreQuery, FindMovieQuery } from './dto/query';
import { MovieService } from './movie.service';

@ApiTags('영화')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOperation({
    summary: '[서비스 / CMS] 영화 목록 불러오기 ',
    description: '영화 목록을 불러옵니다. 로그인 없이 사용 가능합니다.',
  })
  @Auth(JwtNullableAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
  @RequestApi({})
  @ResponseApi({
    type: MovieDTO,
    isPaging: true,
  })
  async getMovies(@Paging() paging: PagingDTO, @Query() query: FindMovieQuery, @ReqUser() user?: User) {
    return await this.movieService.findMovies(
      paging,
      {
        where: {
          ...(query.title && {
            title: {
              contains: query.title,
            },
          }),
        },
      },
      user?.id
    );
  }

  @Get('count')
  @ApiOperation({
    summary: '[서비스 / CMS] 영화 전체 수 불러오기 ',
    description: '영화 전체 수를. 로그인 없이 사용 가능합니다.',
  })
  @Auth(JwtNullableAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
  @RequestApi({})
  @ResponseApi({
    type: MovieCountDTO,
  })
  async getMovieCount() {
    return await this.movieService.getMovieTotalCount();
  }

  @Get('genre')
  @ApiOperation({
    summary: '[서비스 / CMS] 영화 장르별로  불러오기 ',
    description: '영화를 장르별로 불러옵니다. 로그인 없이 사용 가능합니다.',
  })
  @Auth(JwtNullableAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
  @RequestApi({})
  @ResponseApi({
    type: MovieDTO,
    isPaging: true,
  })
  async getMoviesByGenre(@Paging() paging: PagingDTO, @Query() query?: FindMovieByGenreQuery, @ReqUser() user?: User) {
    return await this.movieService.findMovies(
      paging,
      {
        where: {
          ...(query.genreIds && {
            movieGenres: {
              some: {
                OR: query.genreIds.split(',').map((genreId) => ({ genreId })),
              },
            },
          }),
        },
      },
      user?.id
    );
  }

  @Get('top')
  @ApiOperation({
    summary: '[서비스] top10 영화 불러오기 ',
    description: 'top10 영화를 불러옵니다. 로그인 없이 사용 가능합니다.',
  })
  @Auth(JwtNullableAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
  @RequestApi({})
  @ResponseApi({
    type: MovieDTO,
    isPaging: true,
  })
  async getMoviesByTop(@ReqUser() user?: User) {
    return await this.movieService.findMovies(
      new PagingDTO(1, 10),
      {
        orderBy: {
          movieLikes: {
            _count: 'desc',
          },
        },
      },
      user?.id
    );
  }

  @Get(':id/related')
  @ApiOperation({
    summary: '[서비스] 연관된 영화 불러오기 ',
    description: '연관된 영화를 불러옵니다. 로그인 없이 사용 가능합니다.',
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
    type: MovieDTO,
    isArray: true,
  })
  async getRelatedMovies(@Param('id') id: string) {
    const movie = await this.movieService.findMovie(id);
    return await this.movieService.findMoviesByGenre(movie.genres.map((genre) => genre.id));
  }

  @Get('category')
  @ApiOperation({
    summary: '[서비스] 영화 장르별로  불러오기 ',
    description: '영화를 장르별로 불러옵니다. 로그인 없이 사용 가능합니다.',
  })
  @Auth(JwtNullableAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
  @RequestApi({})
  @ResponseApi({})
  async getMoviesByCategory(
    @Paging() paging: PagingDTO,
    @Query() query?: FindMovieByCategoryQuery,
    @ReqUser() user?: User
  ) {
    return await this.movieService.findMovies(
      paging,
      {
        where: {
          ...(query.categoryIds && {
            movieCategories: {
              some: {
                OR: query.categoryIds.split(',').map((categoryId) => ({ categoryId })),
              },
            },
          }),
        },
      },
      user?.id
    );
  }

  @Get(':id/detail')
  @ApiOperation({
    summary: '[서비스 / CMS] 영화 자세히 불러오기 ',
    description: '영화를 자세히 불러옵니다. 로그인 없이 사용 가능합니다.',
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
    type: MovieDTO,
  })
  async getMovie(@Param('id') id: string, @ReqUser() user?: User) {
    return await this.movieService.findMovie(id, user?.id);
  }

  @Get('/categories')
  @ApiOperation({
    summary: '[서비스 / CMS] 영화 카테고리 불러오기 ',
    description: '영화의 카테고리를 불러옵니다. 로그인 없이 사용 가능합니다.',
  })
  @Auth(JwtNullableAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
  @RequestApi({})
  @ResponseApi({
    type: CategoryDTO,
    isArray: true,
  })
  async getCategories() {
    return await this.movieService.findCategories();
  }

  @Patch(':id')
  @ApiOperation({
    summary: '[CMS] 영화 수정하기',
    description: '영화를 수정합니다. 관리자만 사용 가능합니다.',
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
      type: UpdateMovieDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMovie(@Param('id') id: string, @Body() body: UpdateMovieDTO) {
    await this.movieService.updateMovie(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '[CMS] 영화 삭제하기',
    description: '영화를 삭제합니다. 관리자만 사용 가능합니다.',
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
  @ResponseApi({ type: EmptyResponseDTO }, 204)
  async deleteMovie(@Param('id') id: string) {
    await this.deleteMovie(id);
  }

  @Post(':id/like')
  @ApiOperation({
    summary: '[서비스] 영화 좋아요 생성',
    description: '영화 좋아요를 생성합니다. 유저만 사용 가능합니다.',
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
  @ResponseApi({ type: EmptyResponseDTO }, 201)
  async createMovieLike(@Param('id') id: string, @ReqUser() user: User) {
    await this.movieService.createMovieLike(id, user.id);
  }

  @Delete(':id/like')
  @ApiOperation({
    summary: '[서비스] 영화 좋아요 삭제',
    description: '영화 좋아요를 삭제합니다. 유저만 사용 가능합니다.',
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
  @ResponseApi({ type: EmptyResponseDTO }, 204)
  async deleteMovieLike(@Param('id') id: string, @ReqUser() user: User) {
    await this.movieService.deleteMovieLike(id, user.id);
  }

  @Post('category')
  @ApiOperation({
    summary: '[CMS] 영화 카테고리 생성',
    description: '영화 카테고리를 생성합니다. 관리자만 사용 가능합니다.',
  })
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN), ResponseWithIdInterceptor)
  @RequestApi({
    body: {
      type: CreateCategoryDTO,
    },
  })
  @ResponseApi({ type: ResponseWithIdDTO }, 201)
  async createCategory(@Body() body: CreateCategoryDTO) {
    return await this.movieService.createCategory(body);
  }

  @Delete('category/:id')
  @ApiOperation({
    summary: '[CMS] 영화 카테고리 삭제',
    description: '영화 카테고리를 삭제합니다. 관리자만 사용 가능합니다.',
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
  @ResponseApi({ type: ResponseWithIdDTO }, 201)
  async deleteCategory(@Param('id') id: string) {
    return await this.movieService.deleteCategory(id);
  }
}
