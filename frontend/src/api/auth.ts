import api from "./client";

export async function registerUser(username: string, password: string) {
  return api.post("/auth/register", { username, password });
}

export async function loginUser(username: string, password: string) {
  return api.post("/auth/login", { username, password });
}
