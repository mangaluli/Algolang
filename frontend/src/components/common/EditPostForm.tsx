import { ErrorMessage, Field, Form, Formik } from "formik";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import * as Yup from "yup";
import Tag from "../../interfaces/Tag";
import { getAllTags } from "../../apis/tagsApi";
import { toast } from "react-hot-toast";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { testUrl } from "../../apis/testUrlApi";
import User from "../../interfaces/User";
import Delta from "../../interfaces/Delta";

interface Post {
  _id: string;
  date: string;
  author: User;
  tags: Tag[];
  score?: number;

  title: string;
  delta: Delta;
  url: string;

  likes: string[];
  comments: string[];
}

interface Values {
  title: string;
  url: string;
}

const postSchema = Yup.object({
  title: Yup.string().required().min(2),
  url: Yup.string().required().min(2),
});

interface EditPostFormProps {
  post: Post;
  setPost: (post: Post) => void;
}

const EditPostForm: FunctionComponent<EditPostFormProps> = ({
  post,
  setPost,
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tempUrl, setTempUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues: Values = {
    title: post.title,
    url: tempUrl,
  };

  const fetchTags = () => {
    getAllTags()
      .then((res) => {
        setTags(res.data);
      })
      .catch((error) => {
        toast.error("Error Loading Tags: " + error);
      });
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updated_post = { ...post, title: event.target.value };
    setPost(updated_post);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTempUrl(event.target.value);
  };

  const handleTestUrlClick = () => {
    if (!loading) {
      const id = toast.loading("Testing url..");
      setLoading(true);
      testUrl(tempUrl)
        .then((res) => {
          if (res.status === 200) {
            toast.success("URL is valid!", { id });
            const updated_post = { ...post, url: tempUrl };
            setPost(updated_post);
            setLoading(false);
          }
        })
        .catch(() => {
          toast.error("URL is invalid!", { id });
          setTempUrl(post.url);
          setLoading(false);
        });
    }
  };

  const handleAddTagClick = (tag: Tag) => {
    const tags = [...post.tags, tag];
    setPost({ ...post, tags });
  };

  const handleRemoveTagClick = (tag: Tag) => {
    const tags = post.tags.filter((_tag) => _tag._id !== tag._id);
    setPost({ ...post, tags });
  };

  useEffect(() => {
    setTempUrl(post.url);
    if (tags.length === 0) {
      fetchTags();
    }
  }, [post]);

  return (
    <div className="verflow-hidden flex w-full grow rounded-2xl bg-white px-4 shadow-md">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={postSchema}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={() => {}}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col justify-between py-2">
            {/* TITLE */}
            <div className="flex flex-col justify-end gap-1">
              <label className="font-bold text-stone-900" htmlFor="title">
                Title:
              </label>
              <Field
                id="title"
                name="title"
                placeholder="A great title"
                value={post.title}
                onChange={handleTitleChange}
                className={`rounded-md border-2 px-2 py-0.5 ${
                  errors.title && touched.title
                    ? "border-red-400"
                    : "border-stone-400"
                }`}
              />
              {errors.title && touched.title ? (
                <ErrorMessage name="title">
                  {(msg) => <span className="text-sm text-red-400">{msg}</span>}
                </ErrorMessage>
              ) : (
                <span className="text-sm text-stone-500">
                  A short descriptive title
                </span>
              )}
            </div>

            {/* URL */}
            <div className="flex flex-col justify-end gap-1">
              <label className="font-bold text-stone-900" htmlFor="/title">
                URL:
              </label>
              <div className="flex items-center gap-2">
                <Field
                  id="url"
                  name="url"
                  placeholder="A great url"
                  value={tempUrl}
                  onChange={handleUrlChange}
                  className={`w-full rounded-md border-2 px-2 py-0.5 ${
                    errors.url && touched.url
                      ? "border-red-400"
                      : "border-stone-400"
                  }`}
                />
                <button
                  disabled={tempUrl.length === 0}
                  className="min-w-max rounded-lg bg-stone-900 px-4 py-0.5 text-lg text-stone-50 shadow-md disabled:bg-stone-500"
                  type="button"
                  onClick={() => handleTestUrlClick()}
                >
                  Test url
                </button>
              </div>
              {errors.url && touched.url ? (
                <ErrorMessage name="url">
                  {(msg) => <span className="text-sm text-red-400">{msg}</span>}
                </ErrorMessage>
              ) : (
                <span className="text-sm text-stone-500">
                  The url for your CodeSandBox
                </span>
              )}
            </div>

            {/* All Tags */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-stone-900" htmlFor="/title">
                Tags:
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map(
                  (tag) =>
                    !post.tags.some((_tag) => _tag._id === tag._id) && (
                      <span
                        key={tag._id}
                        className="flex cursor-pointer items-center gap-1 rounded-md border-2 border-stone-300 bg-white pl-1 pr-2 hover:border-stone-500"
                        onClick={() => handleAddTagClick(tag)}
                      >
                        <PlusIcon className="h-4 w-4 text-stone-500 group-hover:text-stone-900" />
                        {tag.value}
                      </span>
                    )
                )}
              </div>
              {post.tags.length === 0 ? (
                <span className="text-sm text-red-400">
                  Please select at least 1 tag
                </span>
              ) : (
                <span className="text-sm text-stone-500">
                  The tags are a summary description of your post and are used
                  for finding it
                </span>
              )}
            </div>

            {/* Selected Tags */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-stone-900" htmlFor="/title">
                Selected Tags:
              </label>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="group flex cursor-pointer items-center gap-1 rounded-md border-2 border-stone-300 bg-white pl-2 pr-1 hover:border-stone-500"
                    onClick={() => handleRemoveTagClick(tag)}
                  >
                    {tag.value}
                    <XMarkIcon className="h-4 w-4 text-stone-500 group-hover:text-stone-900" />
                  </span>
                ))}
              </div>
              <span className="text-sm text-stone-500">Your selected Tags</span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPostForm;
