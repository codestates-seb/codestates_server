import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';
import { GlobalModule } from './global';
import { UserModule } from './user/user.module';

const MODULES = [AuthModule, MovieModule, ReviewModule, BookmarkModule, UserModule, GlobalModule];

export default MODULES;
