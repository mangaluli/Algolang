import { HeartIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { likeComment } from "../../apis/commentApi";
import { likePost } from "../../apis/postApi";
import { UserContext } from "../../providers/UserProvider";
import Spinner from "./Spinner";

interface LikeButtonProps {
  parent_type: string;
  parent_id: string;

  likes: number;
  liked: boolean;
}

const LikeButton: FunctionComponent<LikeButtonProps> = ({
  parent_type,
  parent_id,

  likes,
  liked,
}) => {
  const { user } = useContext(UserContext);
  const [localLiked, setLocalLiked] = useState(likes);
  const [localLikes, setLocalLikes] = useState(likes);

  const [loading, setLoading] = useState(false);

  const handleLike = () => {
    if (!loading) {
      setLoading(true);
      switch (parent_type) {
        case "post": {
          likePost(parent_id)
            .then((res) => {
              setLocalLiked(res.data.liked);
              setLocalLikes(res.data.likes);
              setLoading(false);
            })
            .catch(() => toast.error("Like Action Failed!"));
          break;
        }
        case "comment": {
          likeComment(parent_id)
            .then((res) => {
              setLocalLiked(res.data.liked);
              setLocalLikes(res.data.likes);
              setLoading(false);
            })
            .catch(() => toast.error("Like Action Failed!"));
          break;
        }
        default: {
          toast.error("how");
          setLoading(false);
        }
      }
    }
  };

  return (
    <>
      {user ? (
        <button
          className="flex items-center gap-0.5 h-3 text-stone-500"
          onClick={() => handleLike()}
        >
          {loading ? <Spinner size="w-4 h-4" /> : localLikes}
          <HeartIcon className={"w-5 h-5 " + (localLiked && "fill-red-500")} />
        </button>
      ) : (
        <span className="flex items-center gap-0.5 h-3 text-sm text-stone-500">
          {localLikes} <HeartIcon className="w-5 h-5" />
        </span>
      )}
    </>
  );
};

export default LikeButton;
