import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// https://www.cnblogs.com/tzwbk/p/13953570.html
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
VueRouter.prototype.replace = function push(location) {
  return originalReplace.call(this, location).catch(err => err);
};
import LayOut from "../views/layout/Index";
const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录页"
    },
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/login/Index")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "menu"
    },
    component: LayOut,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () =>
          import(/* webpackChunkName: "Index" */ "../views/console/Index")
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "info"
    },
    component: LayOut,
    children: [
      {
        path: "/infoIndex",
        name: "infoIndex",
        meta: {
          name: "信息列表"
        },
        component: () =>
          import(/* webpackChunkName: "infoIndex" */ "../views/info/Index")
      },
      {
        path: "/infoCategory",
        name: "infoCategory",
        meta: {
          name: "信息分类"
        },
        component: () =>
          import(
            /* webpackChunkName: "infoCategory" */ "../views/info/Category"
          )
      },
      {
        path: "/infoDetail",
        name: "infoDetail",
        hidden: true,
        meta: {
          name: "信息详情"
        },
        component: () =>
          import(/* webpackChunkName: "infoDetail" */ "../views/info/Detail")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      icon: "user"
    },
    component: LayOut,
    children: [
      {
        path: "/userIndex",
        name: "infoIndex",
        meta: {
          name: "用户列表"
        },
        component: () =>
          import(/* webpackChunkName: "userIndex" */ "../views/user/Index")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
