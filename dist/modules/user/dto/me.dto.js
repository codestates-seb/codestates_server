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
exports.MeDTO = void 0;
const client_1 = require("@prisma/client");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const dto_1 = require("../../movie/dto");
class MeDTO {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.gender = props.gender;
        this.nickname = props.nickname;
        this.description = props.description;
        this.userType = props.userType;
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
], MeDTO.prototype, "id", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], MeDTO.prototype, "name", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], MeDTO.prototype, "birth", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], MeDTO.prototype, "nickname", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MeDTO.prototype, "email", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], MeDTO.prototype, "description", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], MeDTO.prototype, "profileImage", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, enum: client_1.UserGender, example: Object.keys(client_1.UserGender) } }),
    __metadata("design:type", String)
], MeDTO.prototype, "gender", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, enum: client_1.UserType, example: Object.keys(client_1.UserType) } }),
    __metadata("design:type", String)
], MeDTO.prototype, "userType", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], MeDTO.prototype, "isPublic", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], MeDTO.prototype, "isLikeView", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], MeDTO.prototype, "isReviewView", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], MeDTO.prototype, "isPreferenceView", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: dto_1.GenreDTO, isArray: true, nullable: true } }),
    __metadata("design:type", Array)
], MeDTO.prototype, "preferredGenres", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], MeDTO.prototype, "reviewCount", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], MeDTO.prototype, "likeCount", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time' } }),
    __metadata("design:type", Date)
], MeDTO.prototype, "createdAt", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time' } }),
    __metadata("design:type", Date)
], MeDTO.prototype, "updatedAt", void 0);
exports.MeDTO = MeDTO;
//# sourceMappingURL=me.dto.js.map