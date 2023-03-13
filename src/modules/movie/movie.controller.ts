import { Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { EmptyResponseDTO } from 'common';
import { PrismaService } from 'database/prisma.service';
import { Auth, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { JwtAuthGuard, Role, RoleInterceptorAPI } from 'utils';
import { MovieService } from './movie.service';

@ApiTags('영화')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService, private readonly databse: PrismaService) {}

  @Get()
  @RequestApi({})
  @ResponseApi({})
  async getMovies() {
    try {
      const movie = await axios.get('http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp', {
        params: {
          ServiceKey: '8Z3T9WBWD7IMW1MW3HG9',
          listCount: 500,
          startCount: 0,
          collection: 'kmdb_new',
          detail: 'Y',
          sort: 'prodYear',
        },
      });

      return movie.data;
      //   return movies;
    } catch (err) {
      console.log(err);
    }
  }

  @Get(':id/detail')
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
  })
  @ResponseApi({})
  async getMovie(@Param('id') id: string) {}

  @Patch(':id')
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
  async updateMovie(@Param('id') id: string) {}

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
}
