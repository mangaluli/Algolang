import api from "./api"
import Post from "../interfaces/Post";
import Comment from "../interfaces/Comment";


export function getAllPosts() {
  return api.get("/post");
}

export function getPost(post_id: string) {
  return api.get(`post/${post_id}`);
}

export function addPost(post: Post) {
  return api.post("/post", post);
}

export function addComment(comment: Comment) {
  return api.post(`post/comment`, comment);
}


export function likePost(post_id: string) {
  return api.get(`post/${post_id}/like`);
}