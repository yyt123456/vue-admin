import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./permission";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueCompositionApi from "@vue/composition-api";
import moment from "moment";
import VueStorage from "vue-ls";
//自定义全局方法
import global from "./utils/global";
import common from "./api/common";

//自定义全局组件
import "./icons";
Vue.config.productionTip = false;

Vue.use(VueStorage, {
  namespace: "VUE-ADMIN-",
  name: "ls",
  storage: "session"
});
Vue.use(ElementUI);
Vue.use(global);
Vue.use(common);
Vue.use(VueCompositionApi);
Vue.prototype.$moment = moment;
//运行模式 runtime
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
