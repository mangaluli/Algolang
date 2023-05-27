import axios from "axios";
import User from "../interfaces/User";

const api: string = process.env.REACT_APP_API + '/user' || '';

export function addUser(user: User) {
  return axios.post(api, user);
}

export function editUser(user: User) {
  return axios.put(`${api}/${user._id}`, user);
}

export function getUser(user_id: string) {
  return axios.get(`${api}/${user_id}`);
}

export function getAllUsers() {
  return axios.get(api);
}

export function getPostDelta(post_id: string) {}

export function deletePost(id: string) {
  return axios.delete(`${api}/${id}`);
}