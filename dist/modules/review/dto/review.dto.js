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
exports.ReviewDto = void 0;
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const dto_1 = require("../../user/dto");
const review_comment_dto_1 = require("./review-comment.dto");
const dto_2 = require("../../movie/dto");
class ReviewDto {
    constructor(props) {
        this.id = props.id;
        this.title = props.title;
        this.content = props.content;
        this.score = props.score;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.user = new dto_1.UserDTO(props.user);
        this.comments = props.comments.map((comment) => new review_comment_dto_1.ReviewCommentDTO(comment));
        this.likeCount = props.likeCount;
        this.hateCount = props.hateCount;
        this.isLiked = props.isLiked;
        this.isHated = props.isHated;
        this.enjoyPoints = props.enjoyPoints;
        this.tensions = props.tensions;
        this.movie = new dto_2.MoviesDTO(props.movie);
    }
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], ReviewDto.prototype, "id", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], ReviewDto.prototype, "title", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], ReviewDto.prototype, "content", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], ReviewDto.prototype, "score", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time' } }),
    __metadata("design:type", Date)
], ReviewDto.prototype, "createdAt", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time' } }),
    __metadata("design:type", Date)
], ReviewDto.prototype, "updatedAt", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: dto_1.UserDTO } }),
    __metadata("design:type", dto_1.UserDTO)
], ReviewDto.prototype, "user", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: review_comment_dto_1.ReviewCommentDTO, isArray: true } }),
    __metadata("design:type", Array)
], ReviewDto.prototype, "comments", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], ReviewDto.prototype, "likeCount", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], ReviewDto.prototype, "hateCount", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean' } }),
    __metadata("design:type", Boolean)
], ReviewDto.prototype, "isLiked", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean' } }),
    __metadata("design:type", Boolean)
], ReviewDto.prototype, "isHated", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', isArray: true } }),
    __metadata("design:type", Array)
], ReviewDto.prototype, "enjoyPoints", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', isArray: true } }),
    __metadata("design:type", Array)
], ReviewDto.prototype, "tensions", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: dto_2.MoviesDTO } }),
    __metadata("design:type", dto_2.MoviesDTO)
], ReviewDto.prototype, "movie", void 0);
exports.ReviewDto = ReviewDto;
//# sourceMappingURL=review.dto.js.map