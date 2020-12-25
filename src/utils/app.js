import cookies from "cookie_js";

const ADMIN_TOKEN = "admin_token";
const USER_NAME = "user_name";
export function getToken() {
  return cookies.get(ADMIN_TOKEN);
}
export function setToken(token) {
  cookies.set(ADMIN_TOKEN, token);
}
export function removeAll() {
  cookies.empty();
}

export function setUsername(username) {
  cookies.set(USER_NAME, username);
}
export function getUsername(username) {
    cookies.get(USER_NAME);
}
