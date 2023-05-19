import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, FunctionComponent, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  setQuillDelta: (delta: any) => void;
}

const QuillEditor: FunctionComponent<QuillEditorProps> = ({
  setQuillDelta,
  ...props
}) => {
  const quillRef = useRef<ReactQuill>(null);

  const customImageHandler = function () {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files![0];
      const maxSize = 1024 * 1024 * 2; // (1024 * 1024) = 1MB.

      if (file.size > maxSize) {
        alert(
          "Image size is too large. Please choose an image smaller than 500KB."
        );
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const quill = quillRef.current?.getEditor();
        if (!quill) return;

        const range = quill.getSelection(true);
        const Delta = Quill.import("delta");
        quill.updateContents(
          new Delta()
            .retain(range.index)
            .delete(range.length)
            .insert({ image: reader.result }),
          "user"
        );
        quill.setSelection(range.index + 1, 0, "silent");
      };

      reader.readAsDataURL(file);
    };
  };

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], // toggled buttons

        [{ size: ["small", false, "large", "huge"] }], // custom dropdow

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ align: [] }],

        ["image", "link", "blockquote", "code-block"],

        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ direction: "rtl" }],

        ["clean"],
      ],
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    },
  };

  const handleChange = (content: any, delta: any, source: any, editor: any) => {
    console.log(delta);
    setQuillDelta(editor.getContents());
    // console.log(editor.getContents());
  };

  useEffect(() => {
    if (quillRef.current)
      quillRef.current
        .getEditor()
        .getModule("toolbar")
        .addHandler("image", customImageHandler);
  }, []);

  return (
    <Box bgColor="white">
      <ReactQuill
        ref={quillRef}
        theme="snow" // use the snow theme
        onChange={handleChange}
        modules={modules}
      />
    </Box>
  );
};

export default QuillEditor;
