import { User, UserGender } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
import { GenreDTO, GenreDTOProps } from 'modules/movie/dto';

export interface UserDTOProps extends Partial<User> {
  preferredGenres?: GenreDTOProps[];
}
export class UserDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  birth?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  nickname?: string;

  @Property({ apiProperty: { type: 'string' } })
  email: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  description?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  profileImage?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, enum: UserGender, example: Object.keys(UserGender) } })
  gender: UserGender;

  @Property({ apiProperty: { type: 'boolean', nullable: true } })
  isPublic?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true } })
  isLikeView?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true } })
  isReviewView?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true } })
  isPreferenceView?: boolean;

  @Property({ apiProperty: { type: GenreDTO, isArray: true, nullable: true } })
  preferredGenres?: GenreDTO[];

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  updatedAt: Date;

  constructor(props: UserDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.gender = props.gender;
    this.nickname = props.nickname;
    this.description = props.description;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.isPublic = props.isPublic;
    this.isLikeView = props.isLikeView;
    this.isReviewView = props.isReviewView;
    this.isPreferenceView = props.isPreferenceView;
    this.birth = props.birth;
    this.profileImage = props.profileImage;
    this.preferredGenres = props.preferredGenres?.map((genre) => new GenreDTO(genre));
  }
}
