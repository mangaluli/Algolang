export default interface User {
  _id?: string;
  is_verified?: boolean;
  privilige?: string;

  username?: string;
  email?: string;
  password?: string;
  image?: string;

  follower_user_ids?: string[];
  post_ids?: string[];
  comment_ids?: string[];

  following_user_ids?: string[];
  liked_post_ids?: string[];
  liked_comment_ids?: string[];
}