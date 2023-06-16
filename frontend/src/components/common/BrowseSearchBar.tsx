import { Squares2X2Icon, TableCellsIcon } from "@heroicons/react/24/outline";
import { FunctionComponent } from "react";

interface BrowseSearchBarProps {
  setQuery: (query: string) => void;
  layout: string;
  setLayout: (layout: string) => void;
  refetch: () => void;
}

const BrowseSearchBar: FunctionComponent<BrowseSearchBarProps> = ({
  setQuery,
  layout,
  setLayout,
  refetch,
}) => {
  return (
    <div className="border bg-stone-100 shadow-md">
      <div className="container m-auto max-w-screen-lg">
        <div className="flex gap-2">
          <button
            className={`rounded-md border-2 border-stone-400 bg-white p-0.5 text-stone-500 hover:border-stone-900 hover:text-stone-900 ${
              layout == "cards" && "border-stone-900 text-stone-900"
            }`}
            onClick={() => setLayout("cards")}
          >
            <Squares2X2Icon className="w-6" />
          </button>
          <button
            className={`rounded-md border-2 border-stone-400 bg-white p-0.5 text-stone-500 hover:border-stone-900 hover:text-stone-900 ${
              layout == "table" && "border-stone-900 text-stone-900"
            }`}
            onClick={() => setLayout("table")}
          >
            <TableCellsIcon className="w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrowseSearchBar;
