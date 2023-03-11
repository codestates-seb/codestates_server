import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import { RequestApi, ResponseApi } from 'kyoongdev-nestjs';
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
@Controller('movie')
export class MovieController {
  @Get()
  @RequestApi({})
  @ResponseApi({})
  async getMovies() {
    try {
      const movie = await axios.get(
        'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=91522fb10ea3b97e2973ac804fb108f0&curPage=1&itemPerPage=100&openStartDt=2020'
      );

      const movies = await Promise.all(
        movie.data.movieListResult.movieList.map(async (movie: any) => {
          await sleep(5000);
          const result = await axios.get('https://openapi.naver.com/v1/search/movie.json', {
            headers: {
              'X-Naver-Client-Id': 'zOl6tkBs9aeGBtsHWerO',
              'X-Naver-Client-Secret': 'sQtyDjkScH',
            },
            params: {
              query: movie.movieNm,
            },
          });

          await sleep(5000);

          return result.data;
        })
      );

      return movies;
    } catch (err) {
      console.log(err);
    }
  }
}
