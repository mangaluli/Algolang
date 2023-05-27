import api from "./api"
import Tag from "../interfaces/Tag";

export function getAllTags() {
  return api.get("/tag");
}

export function getTag(tag_id: string) {
  return api.get(`tag/${tag_id}`);
}

export function addtTag(tag: Tag) {
  return api.post("/tag", tag);
}