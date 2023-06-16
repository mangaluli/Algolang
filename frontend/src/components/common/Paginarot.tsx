import { FunctionComponent } from "react";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Paginator: FunctionComponent<PaginatorProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return <>paginator</>;
};

export default Paginator;
