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
exports.MovieDTO = void 0;
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const actor_dto_1 = require("./actor.dto");
const category_dto_1 = require("./category.dto");
const genre_dto_1 = require("./genre.dto");
const staff_dto_1 = require("./staff.dto");
class MovieDTO {
    constructor(props, userId) {
        this.id = props.id;
        this.title = props.title;
        this.postImage = props.postImage;
        this.plot = props.plot;
        this.releasedAt = props.releasedAt;
        this.runtime = props.runtime;
        this.company = props.company;
        this.isLiked = userId ? props.movieLikes.findIndex((like) => like.userId === userId) !== -1 : false;
        this.likeCount = props.movieLikes.length;
        this.averageScore = props.reviews.reduce((acc, next) => (acc += next.score || 0), 0) / props.reviews.length;
        this.genres = props.movieGenres.map((genre) => new genre_dto_1.GenreDTO(genre));
        this.actors = props.movieActors.map((actor) => new actor_dto_1.ActorDTO(actor));
        this.staffs = props.movieStaffs.map((staff) => new staff_dto_1.StaffDTO(staff));
        this.categories = props.movieCategories.map((category) => new category_dto_1.CategoryDTO(category));
    }
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MovieDTO.prototype, "id", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MovieDTO.prototype, "title", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MovieDTO.prototype, "postImage", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MovieDTO.prototype, "plot", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MovieDTO.prototype, "releasedAt", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MovieDTO.prototype, "runtime", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MovieDTO.prototype, "company", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'boolean' } }),
    __metadata("design:type", Boolean)
], MovieDTO.prototype, "isLiked", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], MovieDTO.prototype, "likeCount", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], MovieDTO.prototype, "averageScore", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: genre_dto_1.GenreDTO, isArray: true } }),
    __metadata("design:type", Array)
], MovieDTO.prototype, "genres", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: actor_dto_1.ActorDTO, isArray: true } }),
    __metadata("design:type", Array)
], MovieDTO.prototype, "actors", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: staff_dto_1.StaffDTO, isArray: true } }),
    __metadata("design:type", Array)
], MovieDTO.prototype, "staffs", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: category_dto_1.CategoryDTO, isArray: true } }),
    __metadata("design:type", Array)
], MovieDTO.prototype, "categories", void 0);
exports.MovieDTO = MovieDTO;
//# sourceMappingURL=movie.dto.js.map