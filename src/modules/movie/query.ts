import { Prisma } from '@prisma/client';

export const movieIncludeOption: Prisma.MovieInclude = {
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
  movieCategories: {
    include: {
      category: true,
    },
  },
  reviews: true,
  movieLikes: true,
};
