"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const mysql2_1 = __importDefault(require("mysql2"));
const connection = mysql2_1.default.createConnection({
    host: 'blog-db.cbb6a8d1ki52.ap-northeast-2.rds.amazonaws.com',
    user: 'kyoong',
    password: 'cecj8bNpvHAyuObTjOWq',
    database: 'codestates',
    port: 3306,
});
const database = new client_1.PrismaClient();
(async () => {
    connection.connect();
    const genres = [];
    const [rows] = await connection.promise().query('SELECT * from MovieGenre');
    rows.map(async (row, index) => {
        genres.push(row);
    });
    for (const row of genres) {
        const [genreData] = await connection.promise().query(`SELECT * from Genre where id='${row.genreId}'`);
        const genre = genreData[0];
        console.log({ genre });
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
        const genreExist = await database.movieGenre.findUnique({
            where: {
                movieId_genreId: {
                    movieId: row.movieId,
                    genreId: isExist.id,
                },
            },
        });
        console.log({ genreExist });
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
    }
    connection.end();
})();
//# sourceMappingURL=seed.js.map