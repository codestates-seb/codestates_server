import { Prisma } from '@prisma/client';

export const movieIncludeOption: Prisma.MovieInclude = {
  movieActors: {
    include: {
      actor: true,
    },
    orderBy: {
      actor: {
        name: 'desc',
      },
    },
  },
  movieGenres: {
    include: {
      genre: true,
    },
    orderBy: {
      genre: {
        name: 'desc',
      },
    },
  },
  movieStaffs: {
    include: {
      staff: true,
    },
    orderBy: {
      staff: {
        name: 'desc',
      },
    },
  },
  movieCategories: {
    include: {
      category: true,
    },
    orderBy: {
      category: {
        name: 'desc',
      },
    },
  },
  reviews: true,
  movieLikes: true,
};
