"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const database = new client_1.PrismaClient();
(async () => {
    const movie = await axios_1.default.get('http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=8Z3T9WBWD7IMW1MW3HG9&detail=Y&startCount=0&listCount=200&nation=대한민국&ratedYn=Y&releaseDts=20200101&type=극영화', {});
    await database.movie.deleteMany({});
    await database.movieActor.deleteMany({});
    await database.movieStaff.deleteMany({});
    await database.movieGenre.deleteMany({});
    await database.actor.deleteMany({});
    await database.staff.deleteMany({});
    await database.genre.deleteMany({});
    for (const row of movie.data.Data) {
        for (const item of row.Result) {
            const isExist = await database.movie.findFirst({
                where: {
                    title: item.title,
                },
            });
            const actors = await Promise.all(item.actors.actor.slice(0, 10).map(async (actor) => {
                const isExist = await database.actor.findFirst({
                    where: {
                        name: actor.actorNm,
                    },
                });
                if (!isExist) {
                    const newActor = await database.actor.create({
                        data: {
                            name: actor.actorNm,
                        },
                    });
                    return newActor.id;
                }
                return isExist.id;
            }));
            const staffs = await Promise.all(item.staffs.staff.slice(0, 10).map(async (staff) => {
                const isExist = await database.staff.findFirst({
                    where: {
                        name: staff.staffNm,
                    },
                });
                if (!isExist) {
                    const newStaff = await database.staff.create({
                        data: {
                            name: staff.staffNm,
                            role: staff.staffRoleGroup,
                        },
                    });
                    return newStaff.id;
                }
                return isExist.id;
            }));
            const genres = await Promise.all(item.genre.split(',').map(async (genre) => {
                const isExist = await database.genre.findFirst({
                    where: {
                        name: genre,
                    },
                });
                if (!isExist) {
                    const newGenre = await database.genre.create({
                        data: {
                            name: genre,
                        },
                    });
                    return newGenre.id;
                }
                return isExist.id;
            }));
            const movie = isExist
                ? isExist
                : await database.movie.create({
                    data: {
                        title: item.title,
                        company: item.company,
                        rating: item.rating,
                        plot: item.plots.plot.filter((p) => p.plotLang === '한국어')[0]?.plotText || '',
                        postImage: item.posters.split('|')[0] || '',
                        releasedAt: item.repRlsDate,
                        runtime: item.runtime,
                    },
                });
            for (const actorId of actors) {
                const isExist = await database.movieActor.findFirst({
                    where: {
                        actorId,
                        movieId: movie.id,
                    },
                });
                if (!isExist)
                    await database.movieActor.create({
                        data: {
                            actorId,
                            movieId: movie.id,
                        },
                    });
            }
            for (const staffId of staffs) {
                const isExist = await database.movieStaff.findFirst({
                    where: {
                        staffId,
                        movieId: movie.id,
                    },
                });
                if (!isExist)
                    await database.movieStaff.create({
                        data: {
                            staffId,
                            movieId: movie.id,
                        },
                    });
            }
            for (const genreId of genres) {
                const isExist = await database.movieGenre.findFirst({
                    where: {
                        genreId,
                        movieId: movie.id,
                    },
                });
                if (!isExist)
                    await database.movieGenre.create({
                        data: {
                            genreId,
                            movieId: movie.id,
                        },
                    });
            }
        }
    }
})();
//# sourceMappingURL=seed3.js.map