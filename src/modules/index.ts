import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';
import { GlobalModule } from './global';

const MODULES = [AuthModule, MovieModule, ReviewModule, BookmarkModule, GlobalModule];

export default MODULES;
