import cookies from "cookie_js";

const ADMIN_TOKEN = "admin_token";
export function getToken() {
  cookies.get(ADMIN_TOKEN);
}
export function setToken(token) {
  cookies.set(ADMIN_TOKEN, token);
}
