import api from "./api"
import User from "../interfaces/User";

export function register(user: User) {
  return api.post("auth/register", user);
}

export function login(user: User) {
  return api.post("auth/login", user);
}

export function logout() {
  return api.get("auth/logout");
}

export function session() {
  return api.get("auth/session");
}