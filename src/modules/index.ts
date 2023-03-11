import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { MovieModule } from './movie/movie.module';
import { GlobalModule } from './global';

const MODULES = [AuthModule, MovieModule, CommentModule, LikeModule, BookmarkModule, GlobalModule];

export default MODULES;
