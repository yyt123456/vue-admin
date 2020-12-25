import router from "../router";
import { getToken } from "../utils/app";
const whiteRouter = ["/login"];
router.beforeEach((to, from, next) => {
  console.log(getToken(), "getToken");
  if (getToken()) {
    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
