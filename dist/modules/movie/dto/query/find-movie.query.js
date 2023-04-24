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
exports.FindMovieQuery = void 0;
const class_validator_1 = require("class-validator");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
class FindMovieQuery extends kyoongdev_nestjs_1.PagingDTO {
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '영화 제목 | 감독 이름 | 배우 이름|' } }),
    __metadata("design:type", String)
], FindMovieQuery.prototype, "title", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({
        apiProperty: {
            type: 'string',
            nullable: true,
            description: '정렬 - 영화명 , 개봉, 좋아요',
            example: 'NAME(영화명) | RELEASED_AT(개봉일) | LIKE',
        },
    }),
    (0, class_validator_1.IsEnum)(['NAME', 'RELEASED_AT', 'LIKE'], {
        message: '정렬 방식은 NAME, RELEASED_AT, LIKE 중 하나여야 합니다.',
    }),
    __metadata("design:type", String)
], FindMovieQuery.prototype, "orderBy", void 0);
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
], FindMovieQuery.prototype, "sortBy", void 0);
exports.FindMovieQuery = FindMovieQuery;
//# sourceMappingURL=find-movie.query.js.map