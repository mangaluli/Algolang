import { FunctionComponent } from "react";
import Post from "../../interfaces/Post";

interface PostsCardLayoutProps {
  posts: Post[];
}

const PostsCardLayout: FunctionComponent<PostsCardLayoutProps> = ({
  posts,
}) => {
  return <>posts card layout</>;
};

export default PostsCardLayout;
