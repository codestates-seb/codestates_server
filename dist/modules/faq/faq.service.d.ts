import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { UserService } from 'modules/user/user.service';
import { FAQDto, CreateFaqDTO, FAQsDto, UpdateFaqDTO, CreateFaqCommentDTO, UpdateFaqCommentDTO } from './dto';
export declare class FaqService {
    private readonly database;
    private readonly userService;
    constructor(database: PrismaService, userService: UserService);
    findFaq(id: string): Promise<FAQDto>;
    findFaqs(paging: PagingDTO, args?: Prisma.FAQFindManyArgs): Promise<PaginationDTO<FAQsDto>>;
    createFaq(userId: string, props: CreateFaqDTO): Promise<string>;
    updateFaq(id: string, userId: string, props: UpdateFaqDTO): Promise<void>;
    deleteFaq(id: string, userId?: string): Promise<void>;
    findFaqComment(id: string): Promise<import(".prisma/client").FAQComment & {
        user: import(".prisma/client").User;
    }>;
    findFaqCommentByFAQ(faqId: string): Promise<import(".prisma/client").FAQComment & {
        user: import(".prisma/client").User;
    }>;
    createFaqComment(faqId: string, userId: string, props: CreateFaqCommentDTO): Promise<string>;
    updateFaqComment(id: string, userId: string, props: UpdateFaqCommentDTO): Promise<void>;
    deleteFaqComment(id: string): Promise<void>;
}
