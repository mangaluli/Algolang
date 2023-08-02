import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPost, reportPost } from "../../apis/postApi";
import { toast } from "react-hot-toast";
import NewComment from "../common/NewComment";
import "quill/dist/quill.snow.css";
import { timeAgo } from "../../utils/timeAgo";
import CodeSandboxEmbed from "../common/CodeSandboxEmbed";
import PostComments from "../common/PostComments";
import Delta from "../common/Delta";
import { UserContext } from "../../providers/UserProvider";
import Spinner from "../common/Spinner";
import LikeButton from "../common/LikeButton";
import {
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  EllipsisHorizontalCircleIcon,
  FlagIcon,
  HashtagIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import User from "../../interfaces/User";
import Tag from "../../interfaces/Tag";
import DeltaInterface from "../../interfaces/Delta";
import { Dialog, Menu } from "@headlessui/react";

interface PostInterface {
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

const reports = [
  { value: "title", text: "title" },
  { value: "code", text: "code/preview" },
  { value: "post", text: "post" },
];

// interface PostProps {}

const Post: FunctionComponent = () => {
  const { post_id } = useParams();
  const { user } = useContext(UserContext);

  const [post, setPost] = useState<PostInterface>();
  const [liked, setLiked] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(true);

  const navigate = useNavigate();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  const [reporting, setReporting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [selectedReportType, setSelectedReportType] = useState(0);
  const [reportText, setReportText] = useState("");

  const user_is_author = user && post && user._id === post.author._id;

  const refreshPost = () => {
    setRefresh((prev) => !prev);
  };
  const handleDeleteConfirmClick = () => {
    if (!deleting) {
      setDeleting(true);

      const id = toast.loading("Deleteing post..");
      post &&
        deletePost(post._id)
          .then(() => {
            toast.success("Post deleted successfully!", { id });
            setDeleteDialogOpen(false);
            setDeleting(false);
            navigate("/posts");
          })
          .catch((error) => {
            toast.error("Failed to delete post: " + error, { id });
            setDeleting(false);
          });
    }
  };

  const handleDeleteCancleClick = () => {
    setDeleteDialogOpen(false);
  };

  const handleReportConfirmClick = () => {
    if (reportText.length === 0) {
      return toast.error("Report cant be emtpy!");
    }

    if (!reporting) {
      setReporting(true);
      const id = toast.loading("Reporting..");

      reportPost(post!._id, {
        report_type: reports[selectedReportType].value,
        report_text: reportText,
      })
        .then((res) => {
          console.log(res.data);
          toast.success("Your report was sent!", { id });
          setReportDialogOpen(false);
          setReporting(false);
        })
        .catch((error) => {
          toast.error("Error Reporting: " + error, { id });
          setReportDialogOpen(false);
          setReporting(false);
        });
    }
  };

  const handleReportClick = () => {
    setSelectedReportType(0);
    setReportText("");
    setReportDialogOpen(true);
  };

  const handleReportCancleClick = () => {
    setReportDialogOpen(false);
  };

  const fetchPost = async () => {
    getPost(String(post_id))
      .then((res) => {
        setPost(res.data);
        user && setLiked(res.data.likes.includes(user._id));
      })
      .catch((error) => {
        toast.error(String(error));
      });
  };

  useEffect(() => {
    fetchPost();
  }, [refresh]);

  return (
    <>
      {post ? (
        <>
          {/* POST */}
          <div className="container m-auto my-4 flex w-full max-w-screen-lg flex-col rounded-xl border-2 bg-white text-stone-950 shadow-lg dark:border-stone-800 dark:bg-stone-900 dark:text-stone-50">
            {/* TOP */}
            <div className="flex items-center justify-between border-b-2 px-4 py-2 dark:border-stone-800">
              <h2 className="text-2xl font-bold tracking-wide">{post.title}</h2>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center rounded-xl bg-blue-100 px-2.5 py-0.5 text-sm font-semibold text-stone-600 shadow dark:bg-blue-900 dark:text-stone-400"
                  >
                    <HashtagIcon className="h-3 w-3" />
                    {tag.value}
                  </span>
                ))}

                {user && (
                  <div>
                    <Menu>
                      <Menu.Button className="relative flex items-center gap-1 py-1 text-stone-500 underline-offset-2 hover:underline">
                        <span className="flex items-center gap-1">
                          <EllipsisHorizontalCircleIcon className="h-6 w-6" />
                        </span>
                      </Menu.Button>
                      <Menu.Items className="absolute z-20 ml-[-60px] flex flex-col rounded-md border-2 bg-stone-50 dark:border-stone-800">
                        {user_is_author ? (
                          <>
                            <Menu.Item>
                              <span
                                className="flex cursor-pointer items-center gap-1 px-2 py-1 hover:bg-gray-100 hover:text-blue-600"
                                onClick={() =>
                                  navigate(`/edit-post/${post._id}`)
                                }
                              >
                                <PencilSquareIcon className="h-5 w-5" />
                                Edit
                              </span>
                            </Menu.Item>

                            <Menu.Item>
                              <span
                                className="flex cursor-pointer items-center gap-1 px-2 py-1 hover:bg-gray-100 hover:text-blue-600"
                                onClick={() => setDeleteDialogOpen(true)}
                              >
                                <TrashIcon className="h-5 w-5" />
                                Delete
                              </span>
                            </Menu.Item>
                          </>
                        ) : (
                          <Menu.Item>
                            <span
                              className="flex cursor-pointer items-center gap-1 px-2 py-1 hover:bg-gray-100 hover:text-blue-600"
                              onClick={handleReportClick}
                            >
                              <FlagIcon className="h-5 w-5" />
                              Report
                            </span>
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Menu>
                  </div>
                )}
              </div>
            </div>

            {/* SANDBOX */}
            <div className="border-b-2 dark:border-stone-800">
              <CodeSandboxEmbed
                embedId={post.url}
                view="split"
                height="400px"
              />
            </div>

            {/* DELTA */}
            <div className="h-full w-full">
              <Delta delta={post.delta} />
            </div>

            {/* BOTTOM */}
            <div className="flex items-center justify-between px-4 py-2">
              <div>
                <p className="flex gap-1 text-sm text-gray-500">
                  Posted {timeAgo(post.date)} by
                  <span
                    className="cursor-pointer text-blue-500 hover:underline"
                    onClick={() => navigate(`/user/${post.author._id}`)}
                  >
                    @{post.author.username}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-3">
                  <span className="text-sm text-gray-500">
                    {post.likes.length} likes
                  </span>
                  <span className="text-sm text-gray-500">
                    {post.comments.length} comments
                  </span>
                </div>
                <button
                  className="rounded-md bg-blue-600 px-4 py-1 text-white hover:shadow-md"
                  onClick={() => navigate(`/post/${post._id}`)}
                >
                  Read more
                </button>
              </div>
            </div>

            {/* Delete modal */}
            <Dialog
              as="div"
              open={deleteDialogOpen}
              onClose={handleDeleteCancleClick}
            >
              {/* backdrop */}
              <div
                className="fixed inset-0 flex bg-black/30"
                aria-hidden="true"
              />

              <div className="fixed inset-0">
                <div className="flex min-h-full items-center justify-center p-4">
                  <Dialog.Panel className="container fixed flex max-w-[260px] flex-col items-stretch justify-center gap-3 rounded-lg bg-stone-100 p-4">
                    {/* Your dialog content */}
                    <Dialog.Title className="text-lg font-bold">
                      Delete post 🗑️
                    </Dialog.Title>
                    <Dialog.Description>
                      Are you sure you want to delete this post?
                    </Dialog.Description>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handleDeleteConfirmClick}
                        className="rounded-md border-2 border-red-600 px-4 py-1 font-bold text-red-600 hover:bg-red-600 hover:text-stone-50"
                      >
                        Delete
                      </button>
                      <button
                        onClick={handleDeleteCancleClick}
                        className="rounded-md border-2 border-stone-500 px-4 py-1 font-bold text-stone-500 hover:bg-stone-500 hover:text-stone-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </div>
              </div>
            </Dialog>

            {/* Report modal */}
            <Dialog
              as="div"
              className="fixed inset-0 flex items-center justify-center bg-stone-900/30"
              open={reportDialogOpen}
              onClose={handleReportCancleClick}
            >
              <div className="container fixed flex max-w-[260px] flex-col items-stretch justify-center gap-3 rounded-lg bg-stone-100 p-4">
                {/* Your dialog content */}
                <Dialog.Title className="text-lg font-bold">
                  Report Inappropriate Post
                </Dialog.Title>

                {/* report type */}
                <div>
                  <label htmlFor="report_type" className="">
                    Wheres the problem?
                  </label>
                  <div>
                    <Menu>
                      <Menu.Button className="relative flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-300 bg-white px-2 py-1 font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                        <span>{reports[selectedReportType].text}</span>
                        <ChevronDownIcon className="h-3 w-3" />
                      </Menu.Button>
                      <Menu.Items className="absolute z-10 w-max overflow-hidden rounded-md border border-gray-300 bg-white shadow-lg">
                        <ul className="max-h-48 overflow-y-auto">
                          {reports.map((report, index) => (
                            <Menu.Item key={index}>
                              <li
                                className="cursor-pointer px-2 py-1 hover:bg-gray-100 hover:text-blue-600"
                                onClick={() => {
                                  setSelectedReportType(index);
                                }}
                              >
                                <span>{report.text}</span>
                              </li>
                            </Menu.Item>
                          ))}
                        </ul>
                      </Menu.Items>
                    </Menu>
                  </div>
                </div>

                {/* text area */}
                <div className="flex flex-col">
                  <label htmlFor="report_text">Whats the problem?</label>
                  <textarea
                    className="resize-y overflow-auto rounded border border-stone-300 bg-white px-2 py-1"
                    name="report_text"
                    id="report_text"
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                  />
                </div>

                {/* buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    className="rounded-md border-2 border-red-600 px-4 py-1 font-bold text-red-600 hover:bg-red-600 hover:text-stone-50"
                    onClick={handleReportConfirmClick}
                  >
                    Report
                  </button>
                  <button
                    className="rounded-md border-2 border-stone-500 px-4 py-1 font-bold text-stone-500 hover:bg-stone-500 hover:text-stone-50"
                    onClick={handleReportCancleClick}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Dialog>
          </div>

          {/* COMMENT SECTION */}
          {user && (
            <NewComment
              parent_id={post._id}
              refModel="posts"
              refreshParent={refreshPost}
            />
          )}
          <PostComments
            parent_type="post"
            parent_id={post._id}
            update={refresh}
            updateParent={refreshPost}
          />
        </>
      ) : (
        <Spinner size="max-w-[10%] max-h-[10%]" />
      )}
    </>
  );
};

export default Post;
