import { api } from "./api";

const TOKEN_KEY = "jwt_token";

export async function login(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  localStorage.setItem(TOKEN_KEY, data.token);
  api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
  return data.token;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  delete api.defaults.headers.common.Authorization;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return !!getToken();
}

export function initAuth() {
  const token = getToken();
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}
