import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { EmptyResponseDTO } from 'common';
import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { JwtAuthGuard, ReqUser, Role, RoleInterceptorAPI } from 'utils';
import { JwtNullableAuthGuard } from 'utils/guards/jwt-nullable.guard';
import { MovieDTO, UpdateMovieDTO } from './dto';
import { FindMovieByCategoryQuery, FindMovieByGenreQuery, FindMovieQuery } from './dto/query';
import { MovieService } from './movie.service';

@ApiTags('영화')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
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

  @Get('genre')
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

  @Get('category')
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

  @Patch(':id')
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
}
