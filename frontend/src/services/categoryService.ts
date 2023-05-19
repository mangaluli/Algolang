import axios from "axios";
import Category from "../interfaces/Category";

const api: string = process.env.REACT_APP_API + '/category' || '';


export function getCategory(post_id: string) {
  return axios.get(`${api}/${post_id}`);
}

export function getAllCategories() {
  return axios.get(api);
}

export function addCategoty(post: Category) {
  return axios.post(api, post);
}

export function editCategory(post: Category) {
  return axios.put(`${api}/${post._id}`, post);
}

export function deleteCategory(id: string) {
  return axios.delete(`${api}/${id}`);
}