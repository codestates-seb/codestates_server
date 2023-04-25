import { PrismaClient } from '@prisma/client';
import mysql from 'mysql2';
const connection = mysql.createConnection({
  host: 'blog-db.cbb6a8d1ki52.ap-northeast-2.rds.amazonaws.com',
  user: 'kyoong',
  password: 'cecj8bNpvHAyuObTjOWq',
  database: 'codestates',
  port: 3306,
});

const database = new PrismaClient();

(async () => {
  connection.connect();
  // connection.query('Delete from Movie');
  // connection.query('Delete from User');
  const genres = [];
  connection.query('SELECT * from MovieGenre', async (error, rows, fields) => {
    if (error) throw error;

    (rows as any).forEach(async (row: any) => {
      genres.push(row);
    });
  });
  console.log(genres);

  for (const row of genres)
    connection.query(`SELECT * from Genre where id=${row.genreId}`, async (error, genres, fields) => {
      if (error) throw error;
      const genre = genres[0];

      let isExist = await database.genre.findFirst({
        where: {
          name: genre.name,
        },
      });
      if (!isExist) {
        isExist = await database.genre.create({
          data: {
            name: genre.name,
          },
        });
      }

      const genreExist = await database.movieGenre.findFirst({
        where: {
          movieId: row.movieId,
          genreId: isExist.id,
        },
      });

      if (!genreExist)
        await database.movieGenre.create({
          data: {
            movie: {
              connect: {
                id: row.movieId,
              },
            },
            genre: {
              connect: {
                id: isExist.id,
              },
            },
          },
        });
    });

  const actors = [];
  connection.query('SELECT * from MovieActor', async (error, rows, fields) => {
    if (error) throw error;

    (rows as any).forEach(async (row: any) => {
      actors.push(row);
    });
  });

  for (const row of actors)
    connection.query(`SELECT * from Actor where id=${row.actorId}`, async (error, genres, fields) => {
      if (error) throw error;
      const genre = genres[0];

      let isExist = await database.actor.findFirst({
        where: {
          name: genre.name,
        },
      });
      if (!isExist) {
        isExist = await database.actor.create({
          data: {
            name: genre.name,
          },
        });
      }

      await database.movieActor.create({
        data: {
          movie: {
            connect: {
              id: row.movieId,
            },
          },
          actor: {
            connect: {
              id: isExist.id,
            },
          },
        },
      });
    });

  const staffs = [];
  connection.query('SELECT * from MovieStaff', async (error, rows, fields) => {
    if (error) throw error;

    (rows as any).forEach(async (row: any) => {
      staffs.push(row);
    });
  });

  for (const row of staffs)
    connection.query(`SELECT * from Staff where id=${row.staffId}`, async (error, genres, fields) => {
      if (error) throw error;
      const genre = genres[0];

      let isExist = await database.staff.findFirst({
        where: {
          name: genre.name,
        },
      });
      if (!isExist) {
        isExist = await database.staff.create({
          data: {
            name: genre.name,
            role: genre.role,
          },
        });
      }

      await database.movieStaff.create({
        data: {
          movie: {
            connect: {
              id: row.movieId,
            },
          },
          staff: {
            connect: {
              id: isExist.id,
            },
          },
        },
      });
    });

  connection.end();
})();

// connection.query('SELECT * from User', async (error, rows, fields) => {
//   if (error) throw error;
//   (rows as any).forEach(async (row: any) => {
//     await database.user.create({
//       data: {
//         id: row.id,
//         name: row.name,
//         birth: row.birth,
//         email: row.email,
//         nickname: row.nickname,
//         password: row.password,
//         description: row.description,
//         gender: row.gender,
//         userType: row.userType,
//         isPublic: row.isPublic === 1 ? true : false,
//         isLikeView: row.isLikeView === 1 ? true : false,
//         isReviewView: row.isReviewView === 1 ? true : false,
//         isPreferenceView: row.isPreferenceView === 1 ? true : false,
//         profileImage: row.profileImage,
//         createdAt: row.createdAt,
//         updatedAt: row.updatedAt,
//       },
//     });
//   });
// });

// const users = await database.user.findMany();

// const movies = await database.movie.findMany();
