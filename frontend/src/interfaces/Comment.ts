import Delta from "./Delta";
import User from "./User";

export default interface Comment {
  _id?: string;
  parent: string;
  refModel: string;
  author?: User;
  date?: string;
  delta: Delta;

  likes?: string[] | User[];
  comments?: string[] | Comment[];
}