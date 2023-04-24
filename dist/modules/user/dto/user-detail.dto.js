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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetailDTO = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const dto_1 = require("../../movie/dto");
class UserDetailDTO {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.birth = props.birth;
        this.userType = props.userType;
        this.gender = props.gender;
        this.nickname = props.nickname;
        this.password = props.password;
        this.description = props.description;
        this.profileImage = props.profileImage;
        this.isPublic = props.isPublic;
        this.isLikeView = props.isLikeView;
        this.isReviewView = props.isReviewView;
        this.isPreferenceView = props.isPreferenceView;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.preferredGenres = props.preferredGenres?.map((genre) => new dto_1.GenreDTO(genre));
    }
    async comparePassword(password) {
        return await bcrypt_1.default.compare(password, this.password);
    }
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "id", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "email", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "name", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "birth", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "nickname", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "password", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "description", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "profileImage", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, enum: client_1.UserGender, example: Object.keys(client_1.UserGender) } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "gender", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], UserDetailDTO.prototype, "isPublic", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], UserDetailDTO.prototype, "isLikeView", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], UserDetailDTO.prototype, "isReviewView", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], UserDetailDTO.prototype, "isPreferenceView", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, enum: client_1.UserType, example: Object.keys(client_1.UserType) } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "userType", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: dto_1.GenreDTO, isArray: true, nullable: true } }),
    __metadata("design:type", Array)
], UserDetailDTO.prototype, "preferredGenres", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', nullable: true } }),
    __metadata("design:type", Date)
], UserDetailDTO.prototype, "createdAt", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', nullable: true } }),
    __metadata("design:type", Date)
], UserDetailDTO.prototype, "updatedAt", void 0);
exports.UserDetailDTO = UserDetailDTO;
//# sourceMappingURL=user-detail.dto.js.map