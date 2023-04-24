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
exports.UpdateUserDTO = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
class UpdateUserDTO {
    constructor(props) {
        if (props) {
            this.password = props.password;
            this.name = props.name;
            this.birth = props.birth;
            this.nickname = props.nickname;
            this.email = props.email;
            this.description = props.description;
            this.profileImage = props.profileImage;
            this.gender = props.gender;
            this.isPublic = props.isPublic;
            this.isLikeView = props.isLikeView;
            this.isReviewView = props.isReviewView;
            this.isPreferenceView = props.isPreferenceView;
            this.preferredGenres = props.preferredGenres;
        }
    }
    async hashPassword(salt) {
        this.password = await bcrypt_1.default.hash(this.password, salt);
    }
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '비밀번호' } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "email", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '비밀번호' } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "password", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '이름' } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "name", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "birth", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "nickname", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "description", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "profileImage", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], UpdateUserDTO.prototype, "isPublic", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], UpdateUserDTO.prototype, "isLikeView", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], UpdateUserDTO.prototype, "isReviewView", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true } }),
    __metadata("design:type", Boolean)
], UpdateUserDTO.prototype, "isPreferenceView", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', isArray: true, nullable: true } }),
    __metadata("design:type", Array)
], UpdateUserDTO.prototype, "preferredGenres", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, enum: client_1.UserGender, example: Object.keys(client_1.UserGender) } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "gender", void 0);
exports.UpdateUserDTO = UpdateUserDTO;
//# sourceMappingURL=update-user.dto.js.map