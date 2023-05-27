import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../interfaces/Post";
import { timeAgo } from "../../utils/timeAgo";
import CodeSandboxEmbed from "./CodeSandboxEmbed";

interface PostPreviewProps {
  post: Post;
}

const PostPreview: FunctionComponent<PostPreviewProps> = ({ post }) => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <>
      {/* Rounded Wrapper */}
      <div className="flex flex-col rounded-2xl shadow-md container max-w-xs overflow-hidden bg-white min-w-[320px]">
        <CodeSandboxEmbed embedId={post.url} view="preview" />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between px-2">
            <span className="text-xs">@{post.author!.username}</span>
            <span className="text-xs">{timeAgo(post.date!)}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span
              className="font-bold text-lg text-center"
              onClick={() => navigate("/post/" + post._id)}
            >
              {post.title}
            </span>
            <div className="flex flex-wrap justify-center gap-1 px-1 ">
              {post.tags.map((tag, index) => (
                <div
                  className="text-xs bg-stone-300 px-1 py-px rounded-md"
                  key={index}
                >
                  {tag.value}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pr-2 pb-1">
            <span className="text-xs">{post.likes?.length || 0} Likes</span>
            <span className="text-xs">
              {post.comments?.length || 0} Comments
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPreview;
