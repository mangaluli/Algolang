import { Flex, Tag } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface CategoryListProps {
  categories: string[];
}

const CategoryList: FunctionComponent<CategoryListProps> = ({ categories }) => {
  return (
    <>
      <Flex p="2" gap="1" flexWrap="wrap">
        {categories.map((category: string, index: number) => (
          <Tag id={String(index)} colorScheme="teal" size="sm">
            {category}
          </Tag>
        ))}
      </Flex>
    </>
  );
};

export default CategoryList;
