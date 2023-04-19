import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { UserService } from 'modules/user/user.service';
import { FAQDto, CreateFaqDTO, FAQsDto, UpdateFaqDTO, CreateFaqCommentDTO, UpdateFaqCommentDTO } from './dto';

@Injectable()
export class FaqService {
  constructor(private readonly database: PrismaService, private readonly userService: UserService) {}

  async findFaq(id: string) {
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

    return new FAQDto(faq);
  }

  async findFaqs(paging: PagingDTO, args = {} as Prisma.FAQFindManyArgs) {
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

    return new PaginationDTO(
      faqs.map((faq) => new FAQsDto(faq)),
      { count, paging }
    );
  }

  async createFaq(userId: string, props: CreateFaqDTO) {
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

  async updateFaq(id: string, userId: string, props: UpdateFaqDTO) {
    const faq = await this.findFaq(id);
    await this.userService.findUser(userId);

    if (faq.user.id !== userId) {
      throw new ForbiddenException('본인의 faq만 수정할 수 있습니다.');
    }

    await this.database.fAQ.update({
      where: { id },
      data: {
        ...props,
      },
    });
  }

  async deleteFaq(id: string, userId?: string) {
    const faq = await this.findFaq(id);
    if (userId) {
      await this.userService.findUser(userId);

      if (faq.user.id !== userId) {
        throw new ForbiddenException('본인의 faq만 삭제할 수 있습니다.');
      }
    }

    await this.database.fAQ.delete({
      where: { id },
    });
  }

  async findFaqComment(id: string) {
    const faqComment = await this.database.fAQComment.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    return faqComment;
  }

  async findFaqCommentByFAQ(faqId: string) {
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

  async createFaqComment(faqId: string, userId: string, props: CreateFaqCommentDTO) {
    await this.findFaq(faqId);
    await this.userService.findUser(userId);

    const isExist = await this.findFaqCommentByFAQ(faqId);
    if (isExist) throw new ForbiddenException('이미 댓글이 존재합니다.');

    await this.database.fAQComment.create({
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
  }

  async updateFaqComment(id: string, userId: string, props: UpdateFaqCommentDTO) {
    const faqComment = await this.database.fAQComment.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!faqComment) throw new NotFoundException('존재하지 않는 댓글입니다.');

    await this.database.fAQComment.update({
      where: { id },
      data: {
        ...props,
      },
    });
  }

  async deleteFaqComment(id: string) {
    const isExist = await this.findFaqComment(id);

    if (!isExist) throw new NotFoundException('존재하지 않는 댓글입니다.');

    await this.database.fAQComment.delete({
      where: { id },
    });
  }
}
