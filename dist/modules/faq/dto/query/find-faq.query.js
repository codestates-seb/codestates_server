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
exports.FindFaqQuery = void 0;
const class_validator_1 = require("class-validator");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
class FindFaqQuery extends kyoongdev_nestjs_1.PagingDTO {
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], FindFaqQuery.prototype, "userName", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({
        apiProperty: {
            type: 'string',
            nullable: true,
            description: '정렬 - 이름, 시간, 제목, 내용',
            example: 'USERNAME(이름) | CREATED_AT(시간) | TITLE(제목) | CONTENT(내용)',
        },
        validation: {
            each: true,
        },
    }),
    (0, class_validator_1.IsEnum)(['USERNAME', 'CREATED_AT', 'TITLE', 'CONTENT'], {
        message: '정렬 방식은 USERNAME, CREATED_AT, TITLE, CONTENT 중 하나여야 합니다.',
    }),
    __metadata("design:type", String)
], FindFaqQuery.prototype, "orderBy", void 0);
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
], FindFaqQuery.prototype, "sortBy", void 0);
exports.FindFaqQuery = FindFaqQuery;
//# sourceMappingURL=find-faq.query.js.map