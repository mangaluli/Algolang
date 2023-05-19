export default interface Post {
  _id?: string;
  
  author_id?: string;
  author_name?: string;
  title: string;
  categories: string[];
  date?: Date; //auto generated on server

  url: string;

  viewed_by_user_ids?: string[];
  comment_ids?: string[];
  like_user_ids?: string[];
}