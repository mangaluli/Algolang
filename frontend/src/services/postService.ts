import axios from "axios";
import PostInterface from "../interfaces/Post";
import PostDeltaInterface from "../interfaces/PostDelta";

const api: string = process.env.REACT_APP_API + '/post' || '';

export function addPost(post: PostInterface, postDelta: PostDeltaInterface) {
  return axios.post(api, {post, postDelta});
}

export function editPost(post: PostInterface) {
  return axios.put(`${api}/${post._id}`, post);
}

export function getPost(post_id: string) {
  return axios.get(`${api}/${post_id}`);
}

export function getAllPosts() {
  return axios.get(api);
}

export function getPostDelta(post_id: string) {}

export function deletePost(id: string) {
  return axios.delete(`${api}/${id}`);
}