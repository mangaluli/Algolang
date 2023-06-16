import { FunctionComponent, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { addPost, getPost, updatePost } from "../../apis/postApi";
import { UserContext } from "../../providers/UserProvider";
import EditPostForm from "../common/EditPostForm";
import PostPreview from "../common/PostPreview";
import * as Yup from "yup";
import EditDeltaForm from "../common/EditDeltaForm";
import PageNotFound from "./PageNotFound";
import Spinner from "../common/Spinner";
import User from "../../interfaces/User";
import Tag from "../../interfaces/Tag";
import DeltaInterface from "../../interfaces/Delta";

interface Post {
  _id: string;
  date: string;
  author: User;
  tags: Tag[];
  score?: number;

  title: string;
  delta: DeltaInterface;
  url: string;

  likes: string[];
  comments: string[];
}

interface EditPostProps {
  is_new?: boolean;
}

const EditPost: FunctionComponent<EditPostProps> = ({ is_new }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <PageNotFound />;
  }

  const { post_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>();

  const postSchema = Yup.object().shape({
    title: Yup.string().required().max(255),
    url: Yup.string().required().max(255),
    tags: Yup.array()
      .of(
        Yup.object().shape({
          _id: Yup.string()
            .length(24)
            .matches(/^[0-9a-fA-F]{24}$/)
            .required(),
          value: Yup.string().required(),
        })
      )
      .min(1, "Tags must have a minimum length of 1"),
    delta: Yup.object().shape({
      ops: Yup.array()
        .of(
          Yup.object().shape({
            insert: Yup.string().required("Post can't be empty"),
            attributes: Yup.object(),
          })
        )
        .required(),
    }),
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!submitting) {
      setSubmitting(true);
      const id = toast.loading("Saving post..");

      if (post) {
        try {
          await postSchema.validate(post);

          if (is_new) {
            try {
              const res = await addPost(post);
              toast.success("Post uploaded successfully", { id });
              setSubmitting(false);
              navigate(`/post/${res.data._id}`);
            } catch (error) {
              toast.error(String(error), { id });
              setSubmitting(false);
            }
          } else {
            try {
              await updatePost(post);
              toast.success("Post updated successfully", { id });
              setSubmitting(false);
              navigate(`/post/${post._id}`);
            } catch (error) {
              toast.error(String(error), { id });
              setSubmitting(false);
            }
          }
        } catch (error) {
          toast.error(String(error), { id });
          setSubmitting(false);
        }
      }
    }
  };

  const fetchPost = async () => {
    try {
      const posts_res = await getPost(String(post_id));
      setPost(posts_res.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Loading Post: " + error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (is_new) {
      setPost({
        _id: "",
        author: user,
        date: "69",
        tags: [],
        title: "",
        url: "",
        delta: { ops: [{ insert: "" }] },
        likes: [],
        comments: [],
      });
      setLoading(false);
    } else {
      fetchPost();
    }
  }, []);

  if (loading) {
    return <Spinner size="max-w-[22%] max-h-[22%]" />;
  }

  return (
    <>
      {post ? (
        <div className="container m-auto flex max-w-screen-lg flex-col gap-4 py-8">
          <div className="flex gap-4">
            <div className="flex w-full flex-col items-stretch">
              <h2 className="text-center text-xl font-bold">
                Post&apos;s Basic Information:
              </h2>
              <EditPostForm post={post} setPost={setPost} />
            </div>
            <div>
              <h2 className="text-center text-xl font-bold">Post Prview:</h2>
              <PostPreview post={post} />
            </div>
          </div>
          <div>
            <h2 className="text-center text-xl font-bold">Post&apos;s Text:</h2>
            <EditDeltaForm delta={post.delta} setPost={setPost} />
          </div>
          <button
            className="m-auto w-max rounded-lg bg-stone-900 px-4 py-1 text-lg text-stone-50 shadow-md"
            onClick={() => handleSubmit()}
          >
            {is_new ? "Post" : "Save"}
          </button>
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default EditPost;
