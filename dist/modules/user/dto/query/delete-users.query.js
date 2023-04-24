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
exports.DeleteUsersQuery = void 0;
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
class DeleteUsersQuery {
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', description: '유저 아이디 (,로 이어주세요)', example: 'id1,id2' } }),
    __metadata("design:type", String)
], DeleteUsersQuery.prototype, "userIds", void 0);
exports.DeleteUsersQuery = DeleteUsersQuery;
//# sourceMappingURL=delete-users.query.js.map