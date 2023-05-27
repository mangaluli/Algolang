import { FunctionComponent, useEffect, useState } from "react";
import { getAllPosts } from "../../apis/postApi";
import { getAllTags } from "../../apis/tagsApi";
import Post from "../../interfaces/Post";
import Tag from "../../interfaces/Tag";
import PostPreview from "../common/PostPreview";

interface PostsProps {}

const Posts: FunctionComponent<PostsProps> = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const [shownPosts, setShownPosts] = useState<Post[]>([]);

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [sortBy, setSortBy] = useState<string>("date");

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  const handlePostsFetch = () =>
    getAllPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));

  useEffect(() => {
    handlePostsFetch();
  }, []);

  //return posts in a grid/table/etc
  return (
    <>
      <div className="flex gap-4">
        {posts.map((post, index) => (
          <PostPreview key={index} post={post} />
        ))}
      </div>
      {/* <div className="flex flex-wrap gap-4">
        {tags.map((tag, index) => (
          <span key={index}>{tag.value}</span>
        ))}
      </div> */}
    </>
  );
};

export default Posts;
