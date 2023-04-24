import { PrismaClient } from '@prisma/client';
import mysql from 'mysql';
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
  connection.query('Delete from Movie');
  connection.query('Delete from User');

  connection.query('SELECT * from Movie', async (error, rows, fields) => {
    if (error) throw error;
    rows.forEach(async (row: any) => {
      await database.movie.create({
        data: row,
      });
    });
  });

  connection.query('SELECT * from User', async (error, rows, fields) => {
    if (error) throw error;
    rows.forEach(async (row: any) => {
      await database.user.create({
        data: {
          id: row.id,
          name: row.name,
          birth: row.birth,
          email: row.email,
          nickname: row.nickname,
          password: row.password,
          description: row.description,
          gender: row.gender,
          userType: row.userType,
          isPublic: row.isPublic === 1 ? true : false,
          isLikeView: row.isLikeView === 1 ? true : false,
          isReviewView: row.isReviewView === 1 ? true : false,
          isPreferenceView: row.isPreferenceView === 1 ? true : false,
          profileImage: row.profileImage,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        },
      });
    });
  });

  const users = await database.user.findMany();

  const movies = await database.movie.findMany();

  connection.end();
})();
