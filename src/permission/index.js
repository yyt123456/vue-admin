import router from "../router";
import { getToken, removeAll } from "../utils/app";
import store from "../store/index";
const whiteRouter = ["/login"];
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === "/login") {
      removeAll();
      store.commit("login/SET_TOKEN", "");
      store.commit("login/SET_USERNAME", "");
      next();
    } else {
      next();
    }
    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
