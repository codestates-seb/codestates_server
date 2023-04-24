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
exports.FindReviewsQuery = void 0;
const class_validator_1 = require("class-validator");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
class FindReviewsQuery extends kyoongdev_nestjs_1.PagingDTO {
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], FindReviewsQuery.prototype, "name", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], FindReviewsQuery.prototype, "nickname", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({
        apiProperty: {
            type: 'string',
            nullable: true,
            description: '정렬 - 영화명 , 최신순, 공감(좋아요), 작성자',
            example: 'NAME(영화명) | CREATED_AT(개봉일) | LIKE(공감) | USERNAME(작성자)',
        },
        validation: {
            each: true,
        },
    }),
    (0, class_validator_1.IsEnum)(['NAME', 'CREATED_AT', 'LIKE', 'USERNAME'], {
        message: '정렬 방식은 NAME, CREATED_AT, LIKE, USERNAME 중 하나여야 합니다.',
    }),
    __metadata("design:type", String)
], FindReviewsQuery.prototype, "orderBy", void 0);
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
], FindReviewsQuery.prototype, "sortBy", void 0);
exports.FindReviewsQuery = FindReviewsQuery;
//# sourceMappingURL=find-reviews.query.js.map