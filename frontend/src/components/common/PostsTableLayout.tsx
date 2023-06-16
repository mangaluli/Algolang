import { FunctionComponent } from "react";
import Post from "../../interfaces/Post";

interface PostsTableLayoutProps {
  posts: Post[];
}

const PostsTableLayout: FunctionComponent<PostsTableLayoutProps> = ({
  posts,
}) => {
  return <>posts table layout</>;
};

export default PostsTableLayout;
