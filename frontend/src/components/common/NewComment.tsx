import { FunctionComponent, useEffect, useState } from "react";
import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";
import { addComment } from "../../apis/postApi";
import Delta from "../../interfaces/Delta";
import { toast } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface NewCommentProps {
  refreshParent: Function;
  parent_id: string;
  refModel: string;
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

  useEffect(() => {}, []);

  return (
    <>
      <div className="flex flex-col container max-w-screen-md m-auto gap-2">
        <p className="text-stone-900 font-bold text-lg underline text-center">
          Leave a comment
        </p>

        <div className="w-full h-full shadow-md bg-white">
          <div className="p-2 " ref={quillRef} />
        </div>

        <button
          className="flex items-center gap-2 px-4 py-1 rounded-lg bg-stone-900 text-stone-50 text-lg w-min self-center"
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
            <ArrowPathIcon className="w-4 h-4" />
          </Transition>
          {submitting ? "Posting.." : "Post"}
        </button>
      </div>
    </>
  );
};

export default NewComment;
