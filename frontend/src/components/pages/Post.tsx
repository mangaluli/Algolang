import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../apis/postApi";
import PostInterface from "../../interfaces/Post";
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
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

interface PostProps {}

const Post: FunctionComponent<PostProps> = () => {
  const { post_id } = useParams();
  const { user } = useContext(UserContext);

  const [post, setPost] = useState<PostInterface | undefined>();
  const [liked, setLiked] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(true);

  const refreshPost = () => {
    setRefresh((prev) => !prev);
  };

  const fetchPost = async () => {
    getPost(String(post_id))
      .then((res) => {
        setPost(res.data);
        user && setLiked(res.data.likes.includes(user!._id!));
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
          <div className="flex flex-col m-auto rounded-2xl shadow-md container max-w-screen-lg overflow-hidden my-8 bg-white">
            <div className="flex justify-between items-center p-4  border-b-2">
              <span className="font-bold text-3xl text-stone-900">
                {post.title}
              </span>
              <span className="text-stone-500">{timeAgo(post.date!)}</span>
            </div>

            <div className="flex flex-grow h-max">
              <CodeSandboxEmbed embedId={post.url} view="split" />
            </div>

            <div className="w-full h-full shadow-inner bg-stone-50">
              <Delta delta={post.delta} />
            </div>

            <div className="flex justify-between px-4 py-2 bg-white">
              <span>@{post.author!.username}</span>
              <div className="flex items-center gap-4">
                <span className="flex gap-1 text-sm text-stone-500">
                  {post.comments!.length}
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                </span>
                <LikeButton
                  parent_type="post"
                  parent_id={post._id!}
                  likes={post.likes!.length}
                  liked={liked}
                />
              </div>
            </div>
          </div>
          {user && (
            <NewComment
              parent_id={post._id!}
              refModel="posts"
              refreshParent={refreshPost}
            />
          )}
          <PostComments
            parent_type="post"
            parent_id={post._id!}
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
