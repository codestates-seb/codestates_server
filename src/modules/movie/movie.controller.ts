import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { EmptyResponseDTO } from 'common';
import { RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { MovieService } from './movie.service';

@ApiTags('영화')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @RequestApi({})
  @ResponseApi({})
  async getMovies() {
    // try {
    //   const movie = await axios.get(
    //     'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=91522fb10ea3b97e2973ac804fb108f0&curPage=1&itemPerPage=100&openStartDt=2020'
    //   );
    //   const movies = await Promise.all(
    //     movie.data.movieListResult.movieList.map(async (movie: any) => {
    //       await sleep(5000);
    //       const result = await axios.get('https://openapi.naver.com/v1/search/movie.json', {
    //         headers: {
    //           'X-Naver-Client-Id': 'zOl6tkBs9aeGBtsHWerO',
    //           'X-Naver-Client-Secret': 'sQtyDjkScH',
    //         },
    //         params: {
    //           query: movie.movieNm,
    //         },
    //       });
    //       await sleep(5000);
    //       return result.data;
    //     })
    //   );
    //   return movies;
    // } catch (err) {
    //   console.log(err);
    // }
  }

  @Get(':id')
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
