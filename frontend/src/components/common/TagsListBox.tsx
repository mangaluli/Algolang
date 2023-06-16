import { FunctionComponent, useState } from "react";
import {
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";

import Tag from "../../interfaces/Tag";

interface TagsListBoxProps {
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
  setQueryChanged: (bool: boolean) => void;
}

const TagsListBox: FunctionComponent<TagsListBoxProps> = ({
  tags,
  selectedTags,
  setSelectedTags,
  setQueryChanged,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleAddTagClick = (tag: Tag) => {
    const tags = [...selectedTags, tag];
    setSelectedTags(tags);
    setQueryChanged(true);
  };

  const handleRemoveTagClick = (tag: Tag) => {
    const tags = selectedTags.filter((_tag) => _tag._id !== tag._id);
    setSelectedTags(tags);
    setQueryChanged(true);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const filteredTags = tags.filter(
    (tag) =>
      !selectedTags.some((selectedTag) => selectedTag._id === tag._id) &&
      tag.value.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <Menu>
        <Menu.Button className="relative flex cursor-pointer items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 font-medium text-gray-700 shadow-sm hover:bg-gray-50">
          <span>{selectedTags.length} selected</span>
          <ChevronDownIcon className="h-3 w-3" />
        </Menu.Button>
        <Menu.Items className="absolute z-10 w-max overflow-hidden rounded-md border border-gray-300 bg-white shadow-lg">
          <input
            type="text"
            className="w-full border-b border-gray-300 px-4 py-2 text-sm text-gray-900 focus:outline-none"
            placeholder="Search tags"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
          <ul className="max-h-48 overflow-y-auto">
            {selectedTags.map((tag) => (
              <li
                key={tag._id}
                className="group flex cursor-pointer items-center justify-end gap-2 px-2 py-1 hover:bg-gray-100"
                onClick={() => handleRemoveTagClick(tag)}
              >
                <span className="group-hover:text-blue-600">{tag.value}</span>
                <XMarkIcon className="h-4 w-4 text-gray-500 group-hover:text-blue-600" />
              </li>
            ))}
            <div className="h-px w-full bg-stone-500"></div>
            {filteredTags.map((tag) => (
              <li
                key={tag._id}
                className="group flex cursor-pointer items-center justify-start gap-2 px-2 py-1 hover:bg-gray-100"
                onClick={() => handleAddTagClick(tag)}
              >
                <PlusIcon className="h-4 w-4 text-gray-500 group-hover:text-blue-600" />
                <span className="group-hover:text-blue-600">{tag.value}</span>
              </li>
            ))}
          </ul>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default TagsListBox;
