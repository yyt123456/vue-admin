import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./permission";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueCompositionApi from "@vue/composition-api";
import moment from "moment";

//自定义全服方法
import global from "./utils/global";
import common from "./api/common";

//自定义全局组件
import "./icons";
Vue.config.productionTip = false;

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
