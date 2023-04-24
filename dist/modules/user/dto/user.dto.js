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
exports.UserDTO = void 0;
const client_1 = require("@prisma/client");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const dto_1 = require("../../movie/dto");
class UserDTO {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.gender = props.gender;
        this.nickname = props.nickname;
        this.description = props.description;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.isPublic = props.isPublic;
        this.isLikeView = props.isLikeView;
        this.isReviewView = props.isReviewView;
        this.isPreferenceView = props.isPreferenceView;
        this.birth = props.birth;
        this.reviewCount = props.reviewCount;
        this.likeCount = props.likeCount;
        this.profileImage = props.profileImage;
        this.preferredGenres = props.preferredGenres?.map((genre) => new dto_1.GenreDTO(genre));
    }
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], UserDTO.prototype, "id", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDTO.prototype, "name", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDTO.prototype, "birth", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDTO.prototype, "nickname", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], UserDTO.prototype, "email", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDTO.prototype, "description", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDTO.prototype, "profileImage", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, enum: client_1.UserGender, example: Object.keys(client_1.UserGender) } }),
    __metadata("design:type", String)
], UserDTO.prototype, "gender", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isPublic", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isLikeView", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isReviewView", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isPreferenceView", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: dto_1.GenreDTO, isArray: true, nullable: true } }),
    __metadata("design:type", Array)
], UserDTO.prototype, "preferredGenres", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], UserDTO.prototype, "reviewCount", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], UserDTO.prototype, "likeCount", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time' } }),
    __metadata("design:type", Date)
], UserDTO.prototype, "createdAt", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time' } }),
    __metadata("design:type", Date)
], UserDTO.prototype, "updatedAt", void 0);
exports.UserDTO = UserDTO;
//# sourceMappingURL=user.dto.js.map