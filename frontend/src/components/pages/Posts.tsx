import { FunctionComponent, useEffect, useState, ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import { getPaginated } from "../../apis/postApi";
import { getAllTags } from "../../apis/tagsApi";
import Tag from "../../interfaces/Tag";
import PostPreview from "../common/PostCard";
import Spinner from "../common/Spinner";
import Delta from "../../interfaces/Delta";
import User from "../../interfaces/User";
import TagsListBox from "../common/TagsListBox";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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

// interface PostsProps {}

const sorts = [
  { value: "date_desc", text: "new to old" },
  { value: "date_asc", text: "old to new" },
  { value: "likes_desc", text: "top likes" },
  { value: "comments_desc", text: "top comments" },
];

const Posts: FunctionComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [sortBy, setSortBy] = useState(0);

  const [fetchingPosts, setFetchingPosts] = useState(false);

  const [queryChanged, setQueryChanged] = useState(false);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setQueryChanged(true);
  };

  const handleSortChange = (index: number) => {
    setSortBy(index);
    setQueryChanged(true);
  };

  const handlePostsFetch = (newPage?: number) => {
    if (!fetchingPosts) {
      setFetchingPosts(true);

      let currentPage = newPage !== undefined ? newPage : page;

      if (queryChanged) {
        setPage(() => 1);
        currentPage = 1;
        setQueryChanged(false);
      }
      getPaginated(
        `?page=${page}&title=${title}&sort_by=${
          sorts[sortBy].value
        }&${selectedTags.map((tag) => `tags[]=${tag._id}`).join("&")}`
      )
        .then((res) => {
          setPosts(res.data.posts);
          setTotalPages(res.data.totalPages);
          setPage(res.data.currentPage);
          setQueryChanged(false);
          setFetchingPosts(false);
        })
        .catch((error) => {
          toast.error("Error Getting Posts: " + error);
          setQueryChanged(false);
          setFetchingPosts(false);
        });
    }
  };

  const fetchTags = () => {
    getAllTags()
      .then((res) => {
        setTags(res.data);
      })
      .catch((error) => {
        toast.error("Error Getting Tags: " + error);
      });
  };
  useEffect(() => {
    handlePostsFetch();
    fetchTags();
  }, []);

  return (
    <>
      <div className="flex items-end justify-center gap-4 py-4">
        <div className="flex flex-col justify-center">
          <label htmlFor="Title" className="text-sm">
            Filter by title:
          </label>
          <input
            type="text"
            className="rounded-md border border-gray-300 bg-white px-2 py-1 font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            placeholder="title.."
            onChange={handleTitleChange}
          />
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="sort by" className="text-sm">
            Sort by:
          </label>
          <div>
            <Menu>
              <Menu.Button className="relative flex cursor-pointer items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                <span>{sorts[sortBy].text}</span>
                <ChevronDownIcon className="h-3 w-3" />
              </Menu.Button>
              <Menu.Items className="absolute z-10 w-max overflow-hidden rounded-md border border-gray-300 bg-white shadow-lg">
                <ul className="max-h-48 overflow-y-auto">
                  {sorts.map((sort, index) => (
                    <Menu.Item key={index}>
                      <li
                        className="group flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-100"
                        onClick={() => handleSortChange(index)}
                      >
                        <span className="group-hover:text-blue-600">
                          {sort.text}
                        </span>
                      </li>
                    </Menu.Item>
                  ))}
                </ul>
              </Menu.Items>
            </Menu>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="sort by" className="text-sm">
            Tags filter:
          </label>
          <TagsListBox
            tags={tags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            setQueryChanged={setQueryChanged}
          />
        </div>
        <button
          className="h-max rounded-md border-2 border-blue-600 bg-white px-4 py-1 font-bold text-blue-600 hover:bg-blue-600 hover:text-stone-50"
          onClick={() => handlePostsFetch()}
        >
          Search
        </button>
      </div>

      {fetchingPosts ? (
        <Spinner size="max-w-[22%] max-h-[22%]" />
      ) : (
        <div className="container m-auto flex max-w-screen-lg flex-col items-center justify-center gap-8 py-8">
          {posts.map((post, index) => (
            <PostPreview key={index} post={post} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-end justify-center gap-2 py-8">
          {page > 2 && (
            <>
              <button
                className="h-10 w-10 cursor-pointer rounded-full border-2 text-lg hover:border-stone-600"
                onClick={() => {
                  handlePostsFetch(1);
                }}
              >
                1
              </button>
              <span className="text-lg text-stone-400">. . .</span>
            </>
          )}
          {page > 1 && (
            <button
              className="h-10 w-10 cursor-pointer rounded-full border-2 text-lg hover:border-stone-600"
              onClick={() => {
                handlePostsFetch(page - 1);
              }}
            >
              {page - 1}
            </button>
          )}
          <button
            disabled={true}
            className="h-10 w-10 cursor-pointer rounded-full border-2 border-stone-600 text-lg"
          >
            {page}
          </button>
          {page < totalPages && (
            <button
              className="h-10 w-10 cursor-pointer rounded-full border-2 text-lg hover:border-stone-600"
              onClick={() => {
                handlePostsFetch(page + 1);
              }}
            >
              {page + 1}
            </button>
          )}
          {page + 1 < totalPages && (
            <>
              <span className="text-lg text-stone-400">. . .</span>
              <button
                className="h-10 w-10 cursor-pointer rounded-full border-2 text-lg hover:border-stone-600"
                onClick={() => {
                  handlePostsFetch(totalPages);
                }}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Posts;
