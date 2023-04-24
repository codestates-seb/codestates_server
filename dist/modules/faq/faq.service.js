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
exports.FaqService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const user_service_1 = require("../user/user.service");
const dto_1 = require("./dto");
let FaqService = class FaqService {
    constructor(database, userService) {
        this.database = database;
        this.userService = userService;
    }
    async findFaq(id) {
        const faq = await this.database.fAQ.findUnique({
            where: { id },
            include: {
                user: true,
                faqComment: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return new dto_1.FAQDto(faq);
    }
    async findFaqs(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        console.log(args);
        const count = await this.database.fAQ.count({
            where: {
                ...args.where,
            },
        });
        const faqs = await this.database.fAQ.findMany({
            skip,
            take,
            where: {
                ...args.where,
            },
            include: {
                user: true,
                faqComment: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: {
                ...args.orderBy,
            },
        });
        return new kyoongdev_nestjs_1.PaginationDTO(faqs.map((faq) => new dto_1.FAQsDto(faq)), { count, paging });
    }
    async createFaq(userId, props) {
        await this.userService.findUser(userId);
        const faq = await this.database.fAQ.create({
            data: {
                ...props,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return faq.id;
    }
    async updateFaq(id, userId, props) {
        const faq = await this.findFaq(id);
        await this.userService.findUser(userId);
        if (faq.user.id !== userId) {
            throw new common_1.ForbiddenException('본인의 faq만 수정할 수 있습니다.');
        }
        await this.database.fAQ.update({
            where: { id },
            data: {
                ...props,
            },
        });
    }
    async deleteFaq(id, userId) {
        const faq = await this.findFaq(id);
        if (userId) {
            await this.userService.findUser(userId);
            if (faq.user.id !== userId) {
                throw new common_1.ForbiddenException('본인의 faq만 삭제할 수 있습니다.');
            }
        }
        await this.database.fAQ.delete({
            where: { id },
        });
    }
    async findFaqComment(id) {
        const faqComment = await this.database.fAQComment.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });
        return faqComment;
    }
    async findFaqCommentByFAQ(faqId) {
        const faqComment = await this.database.fAQComment.findUnique({
            where: {
                faqId,
            },
            include: {
                user: true,
            },
        });
        return faqComment;
    }
    async createFaqComment(faqId, userId, props) {
        await this.findFaq(faqId);
        await this.userService.findUser(userId);
        const isExist = await this.findFaqCommentByFAQ(faqId);
        if (isExist)
            throw new common_1.ForbiddenException('이미 댓글이 존재합니다.');
        const comment = await this.database.fAQComment.create({
            data: {
                ...props,
                faq: {
                    connect: {
                        id: faqId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return comment.id;
    }
    async updateFaqComment(id, userId, props) {
        const faqComment = await this.database.fAQComment.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });
        if (!faqComment)
            throw new common_1.NotFoundException('존재하지 않는 댓글입니다.');
        await this.database.fAQComment.update({
            where: { id },
            data: {
                ...props,
            },
        });
    }
    async deleteFaqComment(id) {
        const isExist = await this.findFaqComment(id);
        if (!isExist)
            throw new common_1.NotFoundException('존재하지 않는 댓글입니다.');
        await this.database.fAQComment.delete({
            where: { id },
        });
    }
};
FaqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, user_service_1.UserService])
], FaqService);
exports.FaqService = FaqService;
//# sourceMappingURL=faq.service.js.map