import Post from "./Post";
import Comment from "./Comment"

export default interface User {
  _id?: string;
  privilege?: string;
  username?: string;
  email?: string;
  password?: string;

  followers?: string[] | User[];
  folowing?: string[] | User[];

  posts?: string[] | Post[];
  comments?: string[] | Comment[];
}