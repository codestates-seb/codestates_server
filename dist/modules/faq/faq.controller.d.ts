import { User } from '@prisma/client';
import { PagingDTO } from 'kyoongdev-nestjs';
import { CreateFaqCommentDTO, CreateFaqDTO, FAQDto, FAQsDto, UpdateFaqCommentDTO, UpdateFaqDTO } from './dto';
import { FindFaqQuery } from './dto/query';
import { FaqService } from './faq.service';
import { DeleteFaqQuery } from './dto/query';
export declare class FaqController {
    private readonly faqService;
    constructor(faqService: FaqService);
    findFaq(id: string): Promise<FAQDto>;
    findFaqs(paging: PagingDTO, query: FindFaqQuery): Promise<import("kyoongdev-nestjs").PaginationDTO<FAQsDto>>;
    findMyFaqs(paging: PagingDTO, user: User): Promise<import("kyoongdev-nestjs").PaginationDTO<FAQsDto>>;
    createFaq(props: CreateFaqDTO, user: User): Promise<string>;
    updateFaq(props: UpdateFaqDTO, user: User, id: string): Promise<void>;
    deleteFaq(user: User, id: string): Promise<void>;
    adminDeleteFaq(id: string): Promise<void>;
    adminDeleteFaqs(query: DeleteFaqQuery): Promise<void>;
    createFaqComment(id: string, props: CreateFaqCommentDTO, user: User): Promise<string>;
    updateFaqComment(id: string, props: UpdateFaqCommentDTO, user: User): Promise<void>;
    deleteFaqComment(id: string): Promise<void>;
}
