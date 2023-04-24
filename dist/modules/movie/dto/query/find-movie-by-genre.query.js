"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindMovieByGenreQuery = void 0;
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
class FindMovieByGenreQuery extends kyoongdev_nestjs_1.PagingDTO {
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', description: '장르 id들 ,로 구분', example: 'genre-id1,genre-id2' } }),
    __metadata("design:type", String)
], FindMovieByGenreQuery.prototype, "genreIds", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({
        apiProperty: {
            type: 'string',
            nullable: true,
            description: '정렬 - 이름 , 최신, 좋아요',
            example: 'NAME | CREATED_AT | LIKE',
        },
    }),
    __metadata("design:type", String)
], FindMovieByGenreQuery.prototype, "orderBy", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({
        apiProperty: {
            type: 'string',
            nullable: true,
            description: '정렬 방식 - 오름차순, 내림차순',
            example: 'asc(오름차순) | desc(내림차순)',
        },
    }),
    __metadata("design:type", String)
], FindMovieByGenreQuery.prototype, "sortBy", void 0);
exports.FindMovieByGenreQuery = FindMovieByGenreQuery;
//# sourceMappingURL=find-movie-by-genre.query.js.map