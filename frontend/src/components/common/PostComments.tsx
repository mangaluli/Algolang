import { Transition } from "@headlessui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getComments } from "../../apis/commentApi";
import CommentInterface from "../../interfaces/Comment";
import Comment from "./Comment";

interface PostCommentsProps {
  parent_type: string;
  parent_id: string;

  update: boolean;
  updateParent: () => void;
}

const PostComments: FunctionComponent<PostCommentsProps> = ({
  parent_type,
  parent_id,

  update,
  updateParent,
}) => {
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchComments = (page_number: number = page, force_fetch = false) => {
    if ((canLoadMore && !loading) || force_fetch) {
      setLoading(true);
      getComments(parent_type, parent_id, page)
        .then((res) => {
          setComments(() => res.data.comments);
          if (res.data.canLoadMore) {
            setPage(page + 1);
          } else {
            setCanLoadMore(false);
          }
          setLoading(false);
        })
        .catch(() => {
          toast.error("Error Getting Comments!");
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchComments(1, true);
  }, [update]);

  return (
    <div className="container m-auto mt-10 flex max-w-screen-md flex-col gap-4">
      {comments.map((comment) => (
        <Comment
          comment={comment}
          updateParent={updateParent}
          key={comment._id}
        />
      ))}
      <button
        disabled={!canLoadMore}
        className="self-end text-sky-600 underline underline-offset-2 disabled:invisible"
        onClick={() => fetchComments(page)}
      >
        Load More
      </button>
    </div>
  );
};

export default PostComments;
