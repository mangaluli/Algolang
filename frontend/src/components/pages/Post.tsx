import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPost } from "../../apis/postApi";
import { toast } from "react-hot-toast";
import NewComment from "../common/NewComment";
import "quill/dist/quill.snow.css";
import { timeAgo } from "../../utils/timeAgo";
import CodeSandboxEmbed from "../common/CodeSandboxEmbed";
import PostComments from "../common/PostComments";
import Delta from "../common/Delta";
import { UserContext } from "../../providers/UserProvider";
import Spinner from "../common/Spinner";
import LikeButton from "../common/LikeButton";
import {
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import User from "../../interfaces/User";
import Tag from "../../interfaces/Tag";
import DeltaInterface from "../../interfaces/Delta";

interface PostInterface {
  _id: string;
  date: string;
  author: User;
  tags: Tag[];
  score?: number;

  title: string;
  delta: DeltaInterface;
  url: string;

  likes: string[];
  comments: string[];
}

// interface PostProps {}

const Post: FunctionComponent = () => {
  const { post_id } = useParams();
  const { user } = useContext(UserContext);

  const [post, setPost] = useState<PostInterface>();
  const [liked, setLiked] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(true);

  const navigate = useNavigate();

  const refreshPost = () => {
    setRefresh((prev) => !prev);
  };

  const user_is_author = user && post && user._id === post.author._id;

  const handleEditClick = () => {
    post && navigate(`/edit-post/${post._id}`);
  };

  const handleDeleteClick = () => {
    const id = toast.loading("Deleteing post..");
    post &&
      deletePost(post._id)
        .then(() => {
          toast.success("Post deleted successfully!", { id });
          navigate("/posts");
        })
        .catch((error) => {
          toast.error("Failed to delete post: " + error, { id });
        });
  };

  const fetchPost = async () => {
    getPost(String(post_id))
      .then((res) => {
        setPost(res.data);
        user && setLiked(res.data.likes.includes(user._id));
      })
      .catch((error) => {
        toast.error(String(error));
      });
  };

  useEffect(() => {
    fetchPost();
  }, [refresh]);

  return (
    <>
      {post ? (
        <>
          {/* POST */}
          <div className="container m-auto my-8 flex max-w-screen-lg flex-col overflow-hidden rounded-2xl bg-white shadow-md">
            <div className="flex flex-col items-center gap-2 border-b-2 p-2">
              {user_is_author && (
                <div className="absolute flex gap-2 self-end">
                  <button onClick={() => handleEditClick()}>
                    <PencilSquareIcon className="h-5 w-5 text-stone-900" />
                  </button>
                  <button onClick={() => handleDeleteClick()}>
                    <TrashIcon className="h-5 w-5 text-stone-900" />
                  </button>
                </div>
              )}
              <span className="text-3xl font-bold text-stone-900">
                {post.title}
              </span>
              <div className="flex flex-wrap justify-center gap-2 p-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="rounded-lg border-[1px] border-stone-300 bg-stone-50 px-2 text-sm text-stone-700"
                  >
                    {tag.value}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex h-max w-full">
              <CodeSandboxEmbed
                embedId={post.url}
                view="split"
                height="500px"
              />
            </div>

            <div className="h-full w-full bg-stone-50 shadow-inner">
              <Delta delta={post.delta} />
            </div>

            <div className="flex items-center justify-between bg-white px-4 py-2">
              <div>
                <p className="text-sm text-gray-500">
                  Posted {timeAgo(post.date)} by{" "}
                  <span
                    className="cursor-pointer text-blue-500 hover:underline"
                    onClick={() => navigate(`/user/${post.author._id}`)}
                  >
                    @{post.author.username}
                  </span>
                </p>
              </div>

              <div className="flex gap-4">
                <span className="text-sm text-gray-500">
                  {post.likes.length} likes
                </span>
                <span className="text-sm text-gray-500">
                  {post.comments.length} comments
                </span>
              </div>
            </div>
          </div>
          {user && (
            <NewComment
              parent_id={post._id}
              refModel="posts"
              refreshParent={refreshPost}
            />
          )}
          <PostComments
            parent_type="post"
            parent_id={post._id}
            update={refresh}
            updateParent={refreshPost}
          />
        </>
      ) : (
        <Spinner size="max-w-[10%] max-h-[10%]" />
      )}
    </>
  );
};

export default Post;
