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
exports.FindUsersQuery = void 0;
const class_validator_1 = require("class-validator");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
class FindUsersQuery extends kyoongdev_nestjs_1.PagingDTO {
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], FindUsersQuery.prototype, "name", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], FindUsersQuery.prototype, "nickname", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({
        apiProperty: {
            type: 'string',
            nullable: true,
            description: '정렬 - 이름, 가입일, 작성한 댓글, 이메일, 작성한 리뷰, 좋아요',
            example: 'NAME(이름) | CREATED_AT(가입일) | COMMENT_COUNT(작성한 댓글) | EMAIL(이메일) | REVIEW_COUNT(작성한 리뷰) | LIKE_COUNT(좋아요)',
        },
        validation: {
            each: true,
        },
    }),
    (0, class_validator_1.IsEnum)(['NAME', 'CREATED_AT', 'EMAIL', 'COMMENT_COUNT', 'REVIEW_COUNT', 'LIKE_COUNT'], {
        message: '정렬 방식은 NAME, CREATED_AT, EMAIL, COMMENT_COUNT, REVIEW_COUNT, LIKE_COUNT 중 하나여야 합니다.',
    }),
    __metadata("design:type", String)
], FindUsersQuery.prototype, "orderBy", void 0);
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
], FindUsersQuery.prototype, "sortBy", void 0);
exports.FindUsersQuery = FindUsersQuery;
//# sourceMappingURL=find-users.query.js.map