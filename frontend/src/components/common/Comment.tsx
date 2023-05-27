import { FunctionComponent, useContext, useEffect, useState } from "react";
import CommentInterface from "../../interfaces/Comment";
import { timeAgo } from "../../utils/timeAgo";
import Delta from "./Delta";
import DeltaInterface from "../../interfaces/Delta";
import {
  TrashIcon,
  PencilSquareIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "../../providers/UserProvider";
import { deleteComment, updateComment } from "../../apis/commentApi";
import { toast } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import LikeButton from "./LikeButton";
import { useQuill } from "react-quilljs";

const quill_setting = {
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  },
};

interface CommentProps {
  comment: CommentInterface;
  updateParent: Function;
}

const Comment: FunctionComponent<CommentProps> = ({
  comment,
  updateParent,
}) => {
  const { user } = useContext(UserContext);
  const { quill, quillRef } = useQuill(quill_setting);
  const [show, setShow] = useState(false);
  const [liked, setLiked] = useState(false);

  const [edit, setEdit] = useState(false);
  const [editedDelta, setEditedDelta] = useState<DeltaInterface | null>(null);
  const [loading, setLoading] = useState(false);

  const user_is_author = user?._id === comment.author?._id;

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleSaveClick = () => {
    if (!loading) {
      setLoading(true);
      const delta = quill!.getContents() as any;
      setEditedDelta(delta);
      updateComment(comment._id!, delta)
        .then(() => {
          setEdit(false);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Error Saving Comment!");
          setEdit(false);
          setLoading(false);
        });
    }
  };

  const handleDeleteClick = () => {
    deleteComment(comment._id!)
      .then(() => {
        setShow(false);
        updateParent();
      })
      .catch((error) => {
        toast.error("Comment Deletion Failed: " + error.response.message);
      });
  };

  useEffect(() => {
    setShow(true);
    quill && quill.setContents(editedDelta || (comment.delta as any));
    user && setLiked(comment.likes!.includes(user._id!));
  }, [quill]);

  return (
    <Transition
      show={show}
      enter="transition transform duration-[200ms]"
      enterFrom="transition transform opacity-0"
      enterTo="transition transform opacity-100"
      leave="transition transform duration-[200ms]"
      leaveFrom="transition transform opacity-100"
      leaveTo="transition transform opacity-0"
    >
      <div className="flex flex-col">
        <div className="flex justify-between p-1 gap-2">
          <span className="text-sm text-stone-900">
            @{comment.author!.username}
          </span>

          {/* edit delete */}
          {edit ? (
            <button
              className="px-4 py-0.5 shadow-md rounded-lg bg-stone-900 text-stone-50"
              onClick={() => handleSaveClick()}
            >
              Save
            </button>
          ) : (
            user_is_author && (
              <div className="flex gap-2">
                <button onClick={() => handleEditClick()}>
                  <PencilSquareIcon className="text-stone-900 w-5 h-5" />
                </button>
                <button onClick={() => handleDeleteClick()}>
                  <TrashIcon className="text-stone-900 w-5 h-5" />
                </button>
              </div>
            )
          )}
        </div>

        {/* delta */}
        {edit ? (
          <div className="z-10" ref={quillRef}></div>
        ) : (
          <Delta delta={editedDelta || comment.delta} />
        )}
        {/* stats */}
        <div className="flex justify-between items-center p-1">
          <span className="text-sm text-stone-500">
            {timeAgo(comment.date!)}
          </span>
          <div className="flex items-center gap-2">
            <span className="flex gap-1 text-sm text-stone-500">
              {comment.comments!.length}
              <ChatBubbleLeftIcon className="w-5 h-5" />
            </span>
            <LikeButton
              parent_type="comment"
              parent_id={comment._id!}
              likes={comment.likes!.length}
              liked={liked}
            />
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Comment;
