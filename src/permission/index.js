import router from "../router";
import { getToken, removeAll } from "../utils/app";
import store from "../store/index";
const whiteRouter = ["/login"];
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ minimum: 0.1 });
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === "/login") {
      removeAll();
      store.commit("login/SET_TOKEN", "");
      store.commit("login/SET_USERNAME", "");
      next();
    } else {
      //获取用户角色
      //动态路由分配权限
      if (store.getters["permission/roles"].length === 0) {
        store.dispatch("permission/getUserRoles").then(res => {
          let roles = res;
          // store.commit('permission/GET_USER_ROLES');
          store.dispatch("permission/createRouters", roles).then(() => {
            let addRouters = store.getters["permission/addRouters"];
            let allRouters = store.getters["permission/allRouters"];
            router.options.routes = allRouters;
            router.addRoutes(addRouters);
            next({ ...to, replace: true });
          });
        });
      } else {
        next();
      }
    }
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
