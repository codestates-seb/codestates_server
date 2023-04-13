import { Movie, MovieReview, User } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
import { UserDTO } from 'modules/user/dto';
import { ReviewCommentDTO, ReviewCommentDTOProps } from './review-comment.dto';
import { MoviesDTO, MoviesDTOProps } from 'modules/movie/dto';

export interface ReviewDTOProps extends Partial<MovieReview> {
  user: Partial<User>;
  comments: ReviewCommentDTOProps[];
  likeCount: number;
  hateCount: number;
  isLiked?: boolean;
  isHated?: boolean;
  tensions: string[];
  enjoyPoints: string[];
  movie: MoviesDTOProps;
}
export class ReviewDto {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  title?: string;

  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({ apiProperty: { type: 'number' } })
  score: number;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  updatedAt: Date;

  @Property({ apiProperty: { type: UserDTO } })
  user: UserDTO;

  @Property({ apiProperty: { type: ReviewCommentDTO, isArray: true } })
  comments: ReviewCommentDTO[];

  @Property({ apiProperty: { type: 'number' } })
  likeCount: number;

  @Property({ apiProperty: { type: 'number' } })
  hateCount: number;

  @Property({ apiProperty: { type: 'boolean' } })
  isLiked?: boolean;

  @Property({ apiProperty: { type: 'boolean' } })
  isHated?: boolean;

  @Property({ apiProperty: { type: 'string', isArray: true } })
  enjoyPoints?: string[];

  @Property({ apiProperty: { type: 'string', isArray: true } })
  tensions?: string[];

  @Property({ apiProperty: { type: MoviesDTO } })
  movie: MoviesDTO;

  constructor(props: ReviewDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.score = props.score;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.user = new UserDTO(props.user);
    this.comments = props.comments.map((comment) => new ReviewCommentDTO(comment));
    this.likeCount = props.likeCount;
    this.hateCount = props.hateCount;
    this.isLiked = props.isLiked;
    this.isHated = props.isHated;
    this.enjoyPoints = props.enjoyPoints;
    this.tensions = props.tensions;
    this.movie = new MoviesDTO(props.movie);
  }
}
