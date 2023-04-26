import axios from "axios";
import User from "../interfaces/User";

const api: string = process.env.REACT_APP_API + '/users' || '';

export function addUser(user: User) {
  return axios.post(api, user);
}

export function editUser(user: User) {
  return axios.put(`${api}/${user._id}`, user);
}

export function getUser(userId: string) {
  return axios.get(`${api}?id=${userId}`);
}

export function deleteUser(id: string) {
  return axios.delete(`${api}/${id}`);
}

export function loginUser(user: User) {
  return axios.get(`${api}?email=${user.email}&password=${user.password}`);
}