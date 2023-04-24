"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_module_1 = require("./auth/auth.module");
const bookmark_module_1 = require("./bookmark/bookmark.module");
const movie_module_1 = require("./movie/movie.module");
const review_module_1 = require("./review/review.module");
const global_1 = require("./global");
const user_module_1 = require("./user/user.module");
const report_module_1 = require("./report/report.module");
const faq_module_1 = require("./faq/faq.module");
const MODULES = [
    auth_module_1.AuthModule,
    movie_module_1.MovieModule,
    review_module_1.ReviewModule,
    bookmark_module_1.BookmarkModule,
    user_module_1.UserModule,
    report_module_1.ReportModule,
    faq_module_1.FaqModule,
    global_1.GlobalModule,
];
exports.default = MODULES;
//# sourceMappingURL=index.js.map