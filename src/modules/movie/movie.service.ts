import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { CategoryDTO, MovieDTO, UpdateMovieDTO, CreateCategoryDTO } from './dto';

@Injectable()
export class MovieService {
  constructor(private readonly database: PrismaService) {}

  async findMovie(id: string, userId?: string) {
    const movie = await this.database.movie.findUnique({
      where: {
        id,
      },
      include: {
        movieActors: {
          include: {
            actor: true,
          },
        },
        movieGenres: {
          include: {
            genre: true,
          },
        },
        movieStaffs: {
          include: {
            staff: true,
          },
        },
        movieScores: true,
        movieLikes: true,
      },
    });

    if (!movie) {
      throw new NotFoundException('영화를 찾을 수 없습니다.');
    }

    return new MovieDTO(movie, userId);
  }

  async findMovies(paging: PagingDTO, args = {} as Prisma.MovieFindManyArgs, userId?: string) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.database.movie.count({
      where: {
        ...args.where,
      },
    });
    const rows = await this.database.movie.findMany({
      skip,
      take,
      where: {
        ...args.where,
      },

      include: {
        movieActors: {
          include: {
            actor: true,
          },
        },
        movieGenres: {
          include: {
            genre: true,
          },
        },
        movieStaffs: {
          include: {
            staff: true,
          },
        },
        movieScores: true,
        movieLikes: true,
      },
      orderBy: {
        ...args.orderBy,
      },
    });

    return new PaginationDTO<MovieDTO>(
      rows.map((row) => new MovieDTO(row, userId)),
      { count, paging }
    );
  }

  async createMovieLike(userId: string, movieId: string) {
    const movieLike = await this.database.movieLike.findUnique({
      where: {
        movieId_userId: {
          movieId,
          userId,
        },
      },
    });

    if (!movieLike) {
      throw new NotFoundException('이미 좋아요를 누른 영화입니다.');
    }

    await this.database.movieLike.create({
      data: {
        movieId,
        userId,
      },
    });
  }

  async deleteMovieLike(userId: string, movieId: string) {
    const movieLike = await this.database.movieLike.findUnique({
      where: {
        movieId_userId: {
          movieId,
          userId,
        },
      },
    });

    if (!movieLike) {
      throw new NotFoundException('좋아요를 누르지 않은 영화입니다.');
    }

    await this.database.movieLike.delete({
      where: {
        movieId_userId: {
          movieId,
          userId,
        },
      },
    });
  }

  async updateMovie(id: string, props: UpdateMovieDTO) {
    const { actors, genres, staffs, ...rest } = props;
    const movie = await this.findMovie(id);

    let updateArgs: Prisma.MovieUpdateArgs = {
      where: {
        id: movie.id,
      },
      data: {
        ...rest,
      },
    };

    if (actors) {
      const actorsIds = await Promise.all(
        actors.map(async (actorName) => {
          const actor = await this.database.actor.findFirst({
            where: {
              name: actorName,
            },
          });

          if (!actor) {
            const newActor = await this.database.actor.create({
              data: {
                name: actorName,
              },
            });
            return newActor.id;
          } else {
            return actor.id;
          }
        })
      );
      updateArgs = {
        where: updateArgs.where,
        data: {
          ...updateArgs.data,
          movieActors: {
            createMany: {
              data: actorsIds.map((actorId) => ({
                actorId,
              })),
            },
          },
        },
      };
    }

    if (genres) {
      const genresIds = await Promise.all(
        genres.map(async (genreName) => {
          const genre = await this.database.genre.findFirst({
            where: {
              name: genreName,
            },
          });

          if (!genre) {
            const newGenre = await this.database.genre.create({
              data: {
                name: genreName,
              },
            });
            return newGenre.id;
          } else {
            return genre.id;
          }
        })
      );
      updateArgs = {
        where: updateArgs.where,
        data: {
          ...updateArgs.data,
          movieGenres: {
            createMany: {
              data: genresIds.map((genreId) => ({
                genreId,
              })),
            },
          },
        },
      };
    }

    if (staffs) {
      const staffsIds = await Promise.all(
        staffs.map(async (staff) => {
          const isExist = await this.database.staff.findFirst({
            where: {
              name: staff.name,
              role: staff.role,
            },
          });

          if (!isExist) {
            const newStaff = await this.database.staff.create({
              data: {
                name: staff.name,
                role: staff.role,
              },
            });
            return newStaff.id;
          } else {
            return isExist.id;
          }
        })
      );
      updateArgs = {
        where: updateArgs.where,
        data: {
          ...updateArgs.data,
          movieStaffs: {
            createMany: {
              data: staffsIds.map((staffId) => ({
                staffId,
              })),
            },
          },
        },
      };
    }

    await this.database.movie.update(updateArgs);
  }

  async deleteMovie(id: string) {
    await this.findMovie(id);

    await this.database.movie.delete({
      where: {
        id,
      },
    });
  }
  async findCategory(id: string) {
    const category = await this.database.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException('카테고리를 찾을 수 없습니다.');
    }

    return new CategoryDTO(category);
  }

  async findCategories() {
    const categories = await this.database.category.findMany();

    return categories.map((category) => new CategoryDTO(category));
  }

  async findCategoryByName(name: string) {
    const category = await this.database.category.findFirst({
      where: {
        name,
      },
    });

    if (!category) {
      throw new NotFoundException('카테고리를 찾을 수 없습니다.');
    }

    return new CategoryDTO(category);
  }

  async createCategory(props: CreateCategoryDTO) {
    const isExist = await this.findCategoryByName(props.name);

    if (isExist) {
      throw new ConflictException('이미 존재하는 카테고리입니다.');
    }

    const category = await this.database.category.create({
      data: {
        name: props.name,
      },
    });

    return category.id;
  }

  async deleteCategory(id: string) {
    await this.findCategory(id);

    await this.database.category.delete({
      where: {
        id,
      },
    });
  }
}
