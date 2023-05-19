import { Box, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../interfaces/Post";
import JSfiddle from "./JSfiddle";

import CategoriesList from "./CategoryList";

interface PostPreviewProps {
  post: Post;
}

const PostPreview: FunctionComponent<PostPreviewProps> = ({ post }) => {
  const navigate = useNavigate();

  function timeAgo(publishDate: Date) {
    const now = new Date();
    if (+publishDate === 69) {
      return "wasent posted yet";
    }

    const diffInSeconds = Math.floor((+now - +publishDate) / 1000);

    if (diffInSeconds < 60) {
      return `posted ${diffInSeconds} sec ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `posted ${diffInMinutes} min ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `posted ${diffInHours} hr ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `posted ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `posted ${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `posted ${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  }

  return (
    <>
      <Flex
        flexDir="column"
        w="xs"
        rounded="xl"
        bgColor="gray.50"
        shadow="md"
        overflow="hidden"
      >
        {/* Title */}
        <Text
          color="teal"
          decoration="underline"
          fontSize="2xl"
          fontWeight="bold"
          noOfLines={1}
          cursor="pointer"
          px="2"
          onClick={() => navigate(`/post/${post._id}`)}
          borderTop="1px solid"
          borderColor="gray.100"
        >
          {post.title}
        </Text>

        {/* Tags */}
        <Box py="1">
          <CategoriesList categories={post.categories} />
        </Box>

        {/* author + date */}
        <Flex
          align="center"
          justify="space-between"
          px="2"
          pb="1"
          fontSize="sm"
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Text
            color="teal"
            fontWeight="bold"
            cursor="pointer"
            decoration="underline"
            onClick={() => navigate(`/user/${post.author_id}`)}
          >
            @{post.author_name}
          </Text>
          <Text color="gray.500" minW="max-content">
            {timeAgo(post.date!)}
          </Text>
        </Flex>

        <JSfiddle title={post.title} url={post.url} />

        {/* Stats */}
        <Flex
          justify="space-between"
          color="gray.600"
          px="2"
          py="1"
          fontSize="sm"
          borderTop="1px"
          borderColor="gray.100"
        >
          <Text>{post.comment_ids?.length} comment's.</Text>
          <Text>{post.viewed_by_user_ids?.length} view's.</Text>
          <Text>{post.like_user_ids?.length} like's.</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default PostPreview;
