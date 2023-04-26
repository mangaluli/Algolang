export default interface Comment {
  _id?: string;
  parent_type?: string;
  
  author_id: string;
  author_name: string;
  date: string;

  delta: string;

  reply_ids?: string[];
  like_user_ids?: string[];
}