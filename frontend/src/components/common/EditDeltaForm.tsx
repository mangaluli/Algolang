import { FunctionComponent, useEffect } from "react";
import { useQuill } from "react-quilljs";
import Delta from "../../interfaces/Delta";
import Post from "../../interfaces/Post";

const quill_settings = {
  theme: "snow",
  modules: {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  },
};

interface EditDeltaFormProps {
  delta: Delta;
  setPost: (post: any) => void;
}

const EditDeltaForm: FunctionComponent<EditDeltaFormProps> = ({
  delta,
  setPost,
}) => {
  const { quill, quillRef } = useQuill(quill_settings);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const delta = quill.getContents() as any;
        setPost((prev: Post) => {
          return { ...prev, delta: { _id: prev.delta._id, ...delta } };
        });
      });
    }
  }, [quill]);

  useEffect(() => {
    if (quill) {
      quill.setContents(delta as any);
    }
  }, [quill]);

  return <div ref={quillRef}></div>;
};

export default EditDeltaForm;
