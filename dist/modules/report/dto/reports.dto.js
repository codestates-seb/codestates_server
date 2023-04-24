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
exports.ReportsDTO = void 0;
const client_1 = require("@prisma/client");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const dto_1 = require("../../user/dto");
class ReportsDTO {
    constructor(props) {
        this.id = props.id;
        this.contents = props.contents;
        this.reason = props.reason;
        this.type = props.type;
        this.processedAt = props.processedAt;
        this.user = new dto_1.UserDTO(props.user);
    }
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], ReportsDTO.prototype, "id", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], ReportsDTO.prototype, "contents", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], ReportsDTO.prototype, "reason", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', enum: Object.keys(client_1.ReportType) } }),
    __metadata("design:type", String)
], ReportsDTO.prototype, "type", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', description: '처리일자' } }),
    __metadata("design:type", Date)
], ReportsDTO.prototype, "processedAt", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: dto_1.UserDTO } }),
    __metadata("design:type", dto_1.UserDTO)
], ReportsDTO.prototype, "user", void 0);
exports.ReportsDTO = ReportsDTO;
//# sourceMappingURL=reports.dto.js.map