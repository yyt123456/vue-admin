import router from "../router";
import { getToken } from "../utils/app";
const whiteSpace = ["/login"];
router.beforeEach((to, from, next) => {
  if (getToken()) {
    console.log("有token");
  } else {
    if (whiteSpace.indexOf(to.path) > -1) {
      next();
    } else {
      next("/login");
    }
  }
});
