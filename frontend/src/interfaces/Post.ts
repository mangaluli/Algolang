export default interface Post {
  _id?: string;
  
  author_id: string;
  author_name: string;
  title: string;
  category: string;
  date: string;

  playground_url: string;
  preview_text: string;

  viewed_by_user_ids?: string[];
  comment_ids?: string[];
  like_user_ids?: string[];
}