import { FunctionComponent, useState } from "react";
import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";
import { addComment } from "../../apis/postApi";
import Delta from "../../interfaces/Delta";
import { toast } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface NewCommentProps {
  parent_id: string;
  refModel: string;
  refreshParent: () => void;
}

function isDeltaEmpty(delta: Delta): boolean {
  return delta.ops.every((op) => {
    if (typeof op.insert === "string") {
      return /^\s*$/.test(op.insert);
    } else if (op.insert instanceof Object) {
      return false;
    } else {
      return true;
    }
  });
}

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

const NewComment: FunctionComponent<NewCommentProps> = ({
  parent_id,
  refModel,
  refreshParent,
}) => {
  const { quill, quillRef } = useQuill(quill_setting);
  const [submitting, setSubmitting] = useState(false);

  const handleCommentSubmit = () => {
    if (!submitting) {
      setSubmitting(true);
      const id = toast.loading("Commenting..");
      const delta = quill?.getContents() as any as Delta;
      const new_comment = {
        parent: parent_id,
        refModel,
        delta,
      };
      if (!isDeltaEmpty(delta)) {
        addComment(new_comment)
          .then(() => {
            toast.success("Comment Posted!", { id });
            refreshParent();
            setSubmitting(false);
          })
          .catch((error) => {
            toast.error("Commenting Failed: " + error.response.data.message, {
              id,
            });
            setSubmitting(false);
          });
      } else {
        toast.error("Comment Can't Be Empty!", { id });
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      <div className="container m-auto flex max-w-screen-md flex-col gap-2">
        <p className="text-center text-lg font-bold text-stone-900 underline">
          Leave a comment
        </p>

        <div className="h-full w-full bg-white shadow-md">
          <div className="p-2 " ref={quillRef} />
        </div>

        <button
          className="flex w-min items-center gap-2 self-center rounded-lg bg-stone-900 px-4 py-1 text-lg text-stone-50"
          disabled={submitting}
          onClick={() => handleCommentSubmit()}
        >
          <Transition
            show={submitting}
            enter="transition transform duration-[1000ms]"
            enterFrom="transform rotate-[0deg] opacity-0"
            enterTo="transform rotate-[180deg] opacity-100"
            leave="transition transform duration-[0ms]"
          >
            <ArrowPathIcon className="h-4 w-4" />
          </Transition>
          {submitting ? "Posting.." : "Post"}
        </button>
      </div>
    </>
  );
};

export default NewComment;
