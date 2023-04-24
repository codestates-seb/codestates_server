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
exports.BookmarkDTO = void 0;
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const dto_1 = require("../../movie/dto");
const dto_2 = require("../../user/dto");
class BookmarkDTO {
    constructor(props, userId) {
        this.user = new dto_2.UserDTO(props.user);
        this.movie = new dto_1.MovieDTO(props.movie, userId);
    }
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: dto_2.UserDTO } }),
    __metadata("design:type", dto_2.UserDTO)
], BookmarkDTO.prototype, "user", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: dto_1.MovieDTO } }),
    __metadata("design:type", dto_1.MovieDTO)
], BookmarkDTO.prototype, "movie", void 0);
exports.BookmarkDTO = BookmarkDTO;
//# sourceMappingURL=bookmark.dto.js.map