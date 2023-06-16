import api from "./api"
import Post from "../interfaces/Post";
import Comment from "../interfaces/Comment";


export function getAllPosts() {
  return api.get("/post");
}

export function getPaginated(query = "") {
  // const tags_query = "&" + tags.map(tag => `tags[]=${tag}`).join('&');
  // const query = `?page=${page}&title=${title}&sort_by=${sort_by}${tags_query}`
  
  return api.get("post/paginate" + query);
}

export function getPost(post_id: string) {
  return api.get(`post/${post_id}`);
}

export function addPost(post: Post) {
  return api.post("/post", post);
}

export function updatePost(post:Post) {
  return api.put("post/update", post)
}

export function addComment(comment: Comment) {
  return api.post(`post/comment`, comment);
}

export function likePost(post_id: string) {
  return api.get(`post/${post_id}/like`);
}

export function deletePost(post_id: string) {
  return api.delete(`post/${post_id}`);
}

interface Report {
  report_type: string,
  report_text: string,
}

export function reportPost(post_id:string, report: Report) {
  return api.post(`post/${post_id}/report`, report)
}
