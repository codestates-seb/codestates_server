import { User, UserGender, UserType } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Property } from 'kyoongdev-nestjs';
import { GenreDTO, GenreDTOProps } from 'modules/movie/dto';

interface UserDetailDTOProps extends Partial<User> {
  preferredGenres?: GenreDTOProps[];
}
export class UserDetailDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  email?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  birth?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  nickname?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  password?: string;

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

  @Property({ apiProperty: { type: 'string', nullable: true, enum: UserType, example: Object.keys(UserType) } })
  userType: UserType;

  @Property({ apiProperty: { type: GenreDTO, isArray: true, nullable: true } })
  preferredGenres?: GenreDTO[];

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true } })
  createdAt?: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true } })
  updatedAt?: Date;

  constructor(props: UserDetailDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.birth = props.birth;
    this.userType = props.userType;
    this.gender = props.gender;
    this.nickname = props.nickname;
    this.password = props.password;
    this.description = props.description;
    this.profileImage = props.profileImage;
    this.isPublic = props.isPublic;
    this.isLikeView = props.isLikeView;
    this.isReviewView = props.isReviewView;
    this.isPreferenceView = props.isPreferenceView;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.preferredGenres = props.preferredGenres?.map((genre) => new GenreDTO(genre));
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
