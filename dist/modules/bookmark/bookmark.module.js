"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkModule = void 0;
const common_1 = require("@nestjs/common");
const movie_module_1 = require("../movie/movie.module");
const user_module_1 = require("../user/user.module");
const bookmark_controller_1 = require("./bookmark.controller");
const bookmark_service_1 = require("./bookmark.service");
let BookmarkModule = class BookmarkModule {
};
BookmarkModule = __decorate([
    (0, common_1.Module)({
        imports: [movie_module_1.MovieModule, user_module_1.UserModule],
        controllers: [bookmark_controller_1.BookmarkController],
        providers: [bookmark_service_1.BookmarkService],
    })
], BookmarkModule);
exports.BookmarkModule = BookmarkModule;
//# sourceMappingURL=bookmark.module.js.map