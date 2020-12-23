import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/login/Index")
  },
  {
    path: "/console",
    name: "Console",
    component: () =>
      import(/* webpackChunkName: "Console" */ "../views/console/Index")
  }
];

const router = new VueRouter({
  routes
});

export default router;
