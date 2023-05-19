import { Alert, AlertIcon, Text } from "@chakra-ui/react";
import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostInterface from "../interfaces/Post";
import { getPost } from "../services/postService";

interface PostProps {}

const Post: FunctionComponent<PostProps> = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState<PostInterface | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    const postRes = await getPost(String(post_id));
    setPost(postRes.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      {error ? (
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>
      ) : post ? (
        <>
          <h1>aaaaaa</h1>
        </>
      ) : (
        <>
          <h1>Loading</h1>
        </>
      )}
    </>
  );
};

export default Post;
