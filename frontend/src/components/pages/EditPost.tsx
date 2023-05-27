import { FunctionComponent, useContext, useEffect, useState } from "react";
import Post from "../../interfaces/Post";
import PostDelta from "../../interfaces/Delta";
import PostPreview from "../common/PostPreview";
import { useParams } from "react-router-dom";
import { getPost } from "../../apis/postApi";
import toast from "react-hot-toast";
import { UserContext } from "../../providers/UserProvider";
import Tag from "../../interfaces/Tag";
import { getAllTags } from "../../apis/tagsApi";
import { useQuill } from "react-quilljs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

const postSchema = Yup.object().shape({
  title: Yup.string().min(2).max(255).required(),
  url: Yup.string().min(1).max(255).required(),
  tags: Yup.array().of(
    Yup.string()
      .length(24)
      .matches(/^[0-9a-fA-F]{24}$/)
      .required()
  ),
  delta: Yup.object().shape({
    ops: Yup.array()
      .of(
        Yup.object().shape({
          insert: Yup.object().required(),
          attributes: Yup.object(),
        })
      )
      .required(),
  }),
});

interface EditPostProps {
  isNew?: boolean;
}

const EditPost: FunctionComponent<EditPostProps> = ({ isNew = false }) => {
  const { post_id } = useParams();
  const { user } = useContext(UserContext);
  const { quill, quillRef } = useQuill(quill_setting);

  const [tags, setTags] = useState<Tag[]>([]);
  const [post, setPost] = useState<Post>({
    date: "69",
    author: user!,
    tags: [],

    delta: {
      ops: [{ insert: "" }],
    },
    title: "",
    url: "",

    likes: [],
    comments: [],
  });

  const fetchPost = () => {
    if (!isNew && post_id) {
      getPost(post_id)
        .then((res) => {
          setPost(res.data);
        })
        .catch((error) => {
          toast.error("Error Loading Post: " + error.response.message);
        });
    }
  };

  const fetchTags = () => {
    getAllTags()
      .then((res) => {
        setTags(res.data);
      })
      .catch((error) => {
        toast.error("Error Loading Tags: " + error.response.message);
      });
  };

  const handleSubmit = (values: Post) => {
    console.log(values);
  };

  useEffect(() => {
    fetchPost();
    fetchTags();
    quill && quill.setContents(post.delta as any);
  }, [quill]);

  return (
    <div className="flex flex-col justify-center container max-w-screen-lg m-auto gap-4">
      <div className="flex">
        {/* EDIT FORM */}
        <div className="flex flex-col w-full bg-red-200 gap-2">
          <Formik
            initialValues={{
              title: post.title,
              url: post.url,
              tags: post.tags,
              delta: post.delta,
            }}
            validationSchema={postSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form></Form>
          </Formik>
        </div>
        {/* POST PREVIEW */}
        <PostPreview post={post} />
      </div>
      {/* DELTA QUILL */}
      <div>
        <div className="bg-white" ref={quillRef}></div>
      </div>
    </div>
  );
};

export default EditPost;
