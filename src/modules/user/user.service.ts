import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { MovieService } from 'modules/movie/movie.service';
import { ReviewService } from 'modules/review/review.service';
import { CreateUserDTO, UpdateUserDTO, UserDetailDTO, UserDTO, UserInfoDTO } from './dto';
import { UserException } from './user.exception';

@Injectable()
export class UserService {
  constructor(
    private readonly database: PrismaService,
    private readonly exception: UserException,
    private readonly config: ConfigService,
    @Inject(forwardRef(() => ReviewService))
    private readonly reviewService: ReviewService,
    @Inject(forwardRef(() => MovieService))
    private readonly movieService: MovieService
  ) {}

  async getUserInfo(userId: string) {
    await this.findUser(userId);

    const reviewInfo = await this.reviewService.getUserReviewInfo(userId);
    const likeCount = await this.movieService.getUserLikeCount(userId);

    return new UserInfoDTO({
      averageScore: reviewInfo.averageScore,
      reviewCount: reviewInfo.reviewCount,
      likeCount,
    });
  }

  async findUsers(paging: PagingDTO, args = {} as Prisma.UserFindManyArgs) {
    const { take, skip } = paging.getSkipTake();
    const count = await this.database.user.count({
      where: args.where,
    });

    const users = await this.database.user.findMany({
      ...args,
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return new PaginationDTO(
      users.map((user) => new UserDTO(user)),
      { count, paging }
    );
  }

  async findUser(id: string) {
    const user = await this.database.user.findUnique({
      where: {
        id,
      },
    });
    this.exception.userNotFound(user);

    return new UserDetailDTO(user);
  }

  async createUser(props: CreateUserDTO) {
    const user = await this.database.user.create({
      data: {
        ...props,
        email: props.email,
        name: props.name,
        password: await props.hashPassword(Number(this.config.get('PASSWORD_SALT'))),
      },
    });

    return user.id;
  }

  async updateUser(id: string, props: UpdateUserDTO) {
    const user = await this.findUser(id);

    if (props.password) {
      await props.hashPassword(Number(this.config.get('PASSWORD_SALT')));
    }

    await this.database.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...props,
      },
    });
  }

  async deleteUser(id: string) {
    const user = await this.findUser(id);

    await this.database.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}
