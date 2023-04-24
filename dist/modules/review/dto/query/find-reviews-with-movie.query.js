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
exports.FindReviewsWithMovieQuery = void 0;
const class_validator_1 = require("class-validator");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
class FindReviewsWithMovieQuery {
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({
        apiProperty: {
            type: 'string',
            nullable: true,
            description: '정렬 - SCORE_HIGH(점수 높은 순)| SCORE_LOW(점수 낮은 순) | CREATED_AT(최신)',
            example: 'SCORE_HIGH(점수 높은 순)| SCORE_LOW(점수 낮은 순) | CREATED_AT(최신) ',
        },
        validation: {
            each: true,
        },
    }),
    (0, class_validator_1.IsEnum)(['SCORE_HIGH', 'CREATED_AT', 'SCORE_LOW'], {
        message: '정렬 방식은 SCORE_HIGH(점수 높은 순)| SCORE_LOW(점수 낮은 순) | CREATED_AT(최신) 중 하나여야 합니다.',
    }),
    __metadata("design:type", String)
], FindReviewsWithMovieQuery.prototype, "orderBy", void 0);
exports.FindReviewsWithMovieQuery = FindReviewsWithMovieQuery;
//# sourceMappingURL=find-reviews-with-movie.query.js.map