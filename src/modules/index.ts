import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';
import { GlobalModule } from './global';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';

const MODULES = [AuthModule, MovieModule, ReviewModule, BookmarkModule, UserModule, ReportModule, GlobalModule];

export default MODULES;
