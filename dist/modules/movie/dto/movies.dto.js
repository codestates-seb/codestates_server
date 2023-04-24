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
exports.MoviesDTO = void 0;
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const genre_dto_1 = require("./genre.dto");
class MoviesDTO {
    constructor(props) {
        this.id = props.id;
        this.title = props.title;
        this.postImage = props.postImage;
        this.plot = props.plot;
        this.releasedAt = props.releasedAt;
        this.runtime = props.runtime;
        this.company = props.company;
        this.averageScore = props.reviews.reduce((acc, next) => (acc += next.score || 0), 0) / props.reviews.length;
        this.genres = props.movieGenres.map((genre) => new genre_dto_1.GenreDTO(genre));
    }
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MoviesDTO.prototype, "id", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MoviesDTO.prototype, "title", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MoviesDTO.prototype, "postImage", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MoviesDTO.prototype, "plot", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MoviesDTO.prototype, "releasedAt", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MoviesDTO.prototype, "runtime", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], MoviesDTO.prototype, "company", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], MoviesDTO.prototype, "averageScore", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: genre_dto_1.GenreDTO, isArray: true } }),
    __metadata("design:type", Array)
], MoviesDTO.prototype, "genres", void 0);
exports.MoviesDTO = MoviesDTO;
//# sourceMappingURL=movies.dto.js.map