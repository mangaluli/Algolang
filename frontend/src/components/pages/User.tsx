import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getUser } from "../../apis/userApi";
import Spinner from "../common/Spinner";

import CommentInterface from "../../interfaces/Comment";
import PageNotFound from "./PageNotFound";
import PostPreview from "../common/PostPreview";
import Comment from "../common/Comment";
import Delta from "../../interfaces/Delta";
import Tag from "../../interfaces/Tag";
import UserInterfacee from "../../interfaces/User";

interface Post {
  _id: string;
  date: string;
  author: UserInterfacee;
  tags: Tag[];
  score?: number;

  title: string;
  delta: Delta;
  url: string;

  likes: string[];
  comments: string[];
}

interface UserInterface {
  _id: string;
  privilege: string;
  date: string;

  username: string;

  followers: UserInterface[];
  folowing: UserInterface[];

  posts: Post[];
  comments: CommentInterface[];

  liked_posts: Post[];
  liked_comments: CommentInterface[];

  post_count: number;
  comment_count: number;

  liked_post_count: number;
  liked_comment_count: number;
}

const toDate = (date_string: string) => {
  return new Date(Number(date_string)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const User: FunctionComponent = () => {
  const [user, setUser] = useState<UserInterface>();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  const { user_id } = useParams();

  const handleFetchUser = () => {
    if (!fetching) {
      setFetching(true);

      getUser(String(user_id))
        .then((res) => {
          setUser(() => res.data);
          setFetching(false);
        })
        .catch((error) => {
          toast.error("Error Fetching User: " + error);
          setError(true);
          setFetching(false);
        });
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  if (error) {
    return <PageNotFound />;
  }

  return (
    <>
      {fetching || !user ? (
        <Spinner size="w-[22%] h-[22%]" />
      ) : (
        <>
          <div className="my-32 flex flex-col items-center gap-4">
            <h1 className="text-3xl text-stone-800">
              <span className="font-bold underline">{user.username}</span>
              <span className="">&apos;s profile:</span>
            </h1>
            <div className="container flex max-w-xs flex-col gap-2 rounded-lg border-2 bg-stone-50 py-2 shadow-md">
              {/* User data */}
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="w-1/2 text-right text-stone-500">
                    Username:
                  </span>
                  <span className="w-1/2 ">{user.username}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-1/2 text-right text-stone-500">
                    User from:
                  </span>
                  <span className="w-1/2 ">{toDate(user.date)}</span>
                </div>
              </div>

              {/* posts and comments amount */}
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="w-1/2 text-right text-stone-500">
                    Comments:
                  </span>
                  <span className="w-1/2 ">{user.comment_count}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-1/2 text-right text-stone-500">
                    Posts:
                  </span>
                  <span className="w-1/2 ">{user.post_count}</span>
                </div>
              </div>

              {/* liked posts and comments amount */}
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="w-1/2 text-right text-stone-500">
                    Comments liked:
                  </span>
                  <span className="w-1/2 ">{user.liked_comment_count}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-1/2 text-right text-stone-500">
                    Posts liked:
                  </span>
                  <span className="w-1/2 ">{user.liked_post_count}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-32 flex flex-col items-center gap-32">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-3xl font-bold">
                {user.username}&apos;s most recent posts:
              </h1>
              <div className="flex gap-4">
                {user.posts.map((post) => (
                  <PostPreview key={post._id} post={post} />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-3xl font-bold">
                {user.username}&apos;s recently liked posts:
              </h1>
              <div className="flex gap-4">
                {user.liked_posts.map((post) => (
                  <PostPreview key={post._id} post={post} />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-3xl font-bold">
                {user.username}&apos;s most recent comments:
              </h1>
              <div className="container flex max-w-screen-md flex-col gap-4">
                {user.comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    updateParent={() => handleFetchUser()}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-3xl font-bold">
                {user.username}&apos;s recently liked comments:
              </h1>
              <div className="container flex max-w-screen-md flex-col gap-4">
                {user.liked_comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    updateParent={() => handleFetchUser()}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default User;
