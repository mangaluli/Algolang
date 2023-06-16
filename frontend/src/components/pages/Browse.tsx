import { FunctionComponent, useEffect, useState } from "react";
import { getPaginated } from "../../apis/postApi";

interface Card {}

interface BrowseProps {}

const Browse: FunctionComponent<BrowseProps> = () => {
  const [posts, setPosts] = useState<Card[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [layout, setLayout] = useState("cards"); // "cards" or "table".
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(4);

  const [refetchPosts, setRefetchPosts] = useState(true); // toggle
  const refetch = () => {
    setRefetchPosts((prev) => !prev);
  };

  useEffect(() => {
    const query = `?page=${currentPage}&perpage=${perPage}${searchQuery}`;
    // getPaginated();
  }, [refetchPosts]);

  return (
    <>
      {/* <SearchBar setQuery={setQuery} refetch={refetch} />
      {layout == "cards" && <PostsCardsLayout posts={posts} />}
      {layout == "table" && <PostsTableLayout posts={posts} />}
      <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
    </>
  );
};

export default Browse;
