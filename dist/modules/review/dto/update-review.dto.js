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
exports.UpdateReviewDTO = void 0;
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
class UpdateReviewDTO {
    constructor(props) {
        if (props) {
            this.title = props.title;
            this.content = props.content;
            this.score = props.score;
            this.enjoyPoints = props.enjoyPoints;
            this.tensions = props.tensions;
        }
    }
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UpdateReviewDTO.prototype, "content", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UpdateReviewDTO.prototype, "title", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true } }),
    __metadata("design:type", Number)
], UpdateReviewDTO.prototype, "score", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', isArray: true, nullable: true } }),
    __metadata("design:type", Array)
], UpdateReviewDTO.prototype, "enjoyPoints", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', isArray: true, nullable: true } }),
    __metadata("design:type", Array)
], UpdateReviewDTO.prototype, "tensions", void 0);
exports.UpdateReviewDTO = UpdateReviewDTO;
//# sourceMappingURL=update-review.dto.js.map