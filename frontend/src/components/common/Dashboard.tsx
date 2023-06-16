import { FunctionComponent, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getPaginated } from "../../apis/postApi";
import { getUsersNewPosts } from "../../apis/userApi";
import Delta from "../../interfaces/Delta";
import Tag from "../../interfaces/Tag";
import User from "../../interfaces/User";
import { UserContext } from "../../providers/UserProvider";
import PostPreview from "./PostPreview";

interface Post {
  _id: string;
  date: string;
  author: User;
  tags: Tag[];
  score?: number;

  title: string;
  delta: Delta;
  url: string;

  likes: string[];
  comments: string[];
}

// interface DashboardProps {}

const Dashboard: FunctionComponent = () => {
  const { user } = useContext(UserContext);
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  const [mostLikedPosts, setMostLikedPosts] = useState<Post[]>([]);
  const [usersNewPosts, setUsersNewPosts] = useState<Post[]>([]);

  const handleFetchNewPosts = () => {
    getPaginated(1)
      .then((res) => {
        setNewPosts(res.data.posts);
      })
      .catch((error) => {
        toast.error("Error Fetching Newest Posts: " + error);
      });
  };

  const handleFetchMostLikedPosts = () => {
    getPaginated(1, "", [], "likes_desc")
      .then((res) => {
        setMostLikedPosts(res.data.posts);
      })
      .catch((error) => {
        toast.error("Error Fetching Most Liked Posts: " + error);
      });
  };

  const handleFetchUsersNewPosts = () => {
    user &&
      user._id &&
      getUsersNewPosts(user._id)
        .then((res) => {
          setUsersNewPosts(res.data);
        })
        .catch((error) => {
          toast.error("Error Fetching Your Recent Posts: " + error);
        });
  };

  useEffect(() => {
    handleFetchNewPosts();
    handleFetchMostLikedPosts();
    handleFetchUsersNewPosts();
  }, []);

  return (
    <div className="container m-auto flex max-w-screen-lg flex-col items-center gap-32 py-16">
      <div className="flex w-full flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Newest posts:</h1>
        {newPosts.map((post) => (
          <PostPreview key={post._id} post={post} />
        ))}
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Most liked posts:</h1>
        {mostLikedPosts.map((post) => (
          <PostPreview key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
