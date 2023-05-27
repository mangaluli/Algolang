import Tag from "./Tag";
import User from "./User";
import Comment from "./Comment"
import Delta from "./Delta";


export default interface Post {
  _id?: string;
  date?: string;
  author?: User;
  tags:  Tag[];
  score?: number;

  title: string;
  delta: Delta;
  url: string;

  likes?: string[];
  comments?: string[];
}