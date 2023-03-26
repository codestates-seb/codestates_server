import { User } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
import { MovieDTOProps, MovieDTO } from 'modules/movie/dto';
import { UserDTO } from 'modules/user/dto';

interface BookmarkDTOProps {
  user: Partial<User>;
  movie: MovieDTOProps;
}
export class BookmarkDTO {
  @Property({ apiProperty: { type: UserDTO } })
  user: UserDTO;

  @Property({ apiProperty: { type: MovieDTO } })
  movie: MovieDTO;

  constructor(props: BookmarkDTOProps) {
    this.user = new UserDTO(props.user);
    this.movie = new MovieDTO(props.movie);
  }
}
