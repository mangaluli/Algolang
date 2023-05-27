import api from "./api"
import Delta from "../interfaces/Delta";

export function getComment(comment_id:string) {
  return api.get(`comment/${comment_id}`);
}

export function addReply(post_id: string, delta: Delta) {
  return api.post(`comment/${post_id}/reply`, delta);
}

export function deleteComment(comment_id: string) {
  return api.delete(`comment/${comment_id}`);
}

export function getComments(parent_type:string, parent_id: string, page:number) {
  return api.get(`comment/${parent_type}/${parent_id}/${page}`);
}

export function likeComment(comment_id: string) {
  return api.get(`comment/${comment_id}/like`);
}

export function updateComment(comment_id: string, delta: Delta) {
  return api.patch(`comment/${comment_id}`, delta);
}