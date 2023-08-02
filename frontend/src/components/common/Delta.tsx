import { FunctionComponent, useEffect } from "react";
import { useQuill } from "react-quilljs";
import DeltaInterface from "../../interfaces/Delta";

interface DeltaProps {
  delta: DeltaInterface;
}

const Delta: FunctionComponent<DeltaProps> = ({ delta }) => {
  const { quill, quillRef } = useQuill({
    readOnly: true,
    modules: {
      toolbar: false,
    },
  });

  useEffect(() => {
    quill && quill.setContents(delta as any);
  }, [quill]);

  return (
    <div className="h-full w-full bg-white ">
      <div className="border" ref={quillRef}></div>
    </div>
  );
};

export default Delta;
