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
exports.FAQsDto = void 0;
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const dto_1 = require("../../user/dto");
const faq_comment_dto_1 = require("./faq-comment.dto");
class FAQsDto {
    constructor(props) {
        this.id = props.id;
        this.title = props.title;
        this.content = props.content;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.user = new dto_1.UserDTO(props.user);
        this.faqComment = props.faqComment && new faq_comment_dto_1.FaqCommentDto(props.faqComment);
    }
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], FAQsDto.prototype, "id", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], FAQsDto.prototype, "title", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], FAQsDto.prototype, "content", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time' } }),
    __metadata("design:type", Date)
], FAQsDto.prototype, "createdAt", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time' } }),
    __metadata("design:type", Date)
], FAQsDto.prototype, "updatedAt", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: faq_comment_dto_1.FaqCommentDto, nullable: true } }),
    __metadata("design:type", faq_comment_dto_1.FaqCommentDto)
], FAQsDto.prototype, "faqComment", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: dto_1.UserDTO } }),
    __metadata("design:type", dto_1.UserDTO)
], FAQsDto.prototype, "user", void 0);
exports.FAQsDto = FAQsDto;
//# sourceMappingURL=faqs.dto.js.map