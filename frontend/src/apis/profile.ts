import api from "./api"

export function getProfile() {
  return api.get("/profile");
}