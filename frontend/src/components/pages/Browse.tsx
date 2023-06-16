import { FunctionComponent, useEffect, useState } from "react";
import { getPaginated } from "../../apis/postApi";
import Post from "../../interfaces/Post";
import BrowseSearchBar from "../common/BrowseSearchBar";
import Paginator from "../common/Paginarot";
import PostsCardLayout from "../common/PostsCardLayout";
import PostsTableLayout from "../common/PostsTableLayout";

// interface BrowseProps {}

const Browse: FunctionComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [layout, setLayout] = useState("cards"); // "cards" or "table".

  const [searchQuery, setSearchQuery] = useState("?page=1&sort_by=date_desc");
  const [perPage, setPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [refetchPosts, setRefetchPosts] = useState(true); // toggle
  const refetch = () => {
    setRefetchPosts((prev) => !prev);
  };

  useEffect(() => {
    const query = `?page=${currentPage}&perpage=${perPage}${searchQuery}`;
    // getPaginated();
  }, [refetchPosts]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <BrowseSearchBar
          setQuery={setSearchQuery}
          layout={layout}
          setLayout={setLayout}
          refetch={refetch}
        />
      </div>
      <div>
        {layout == "cards" && <PostsCardLayout posts={posts} />}
        {layout == "table" && <PostsTableLayout posts={posts} />}
      </div>
      <div>
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Browse;
