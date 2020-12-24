import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueCompositionApi from "@vue/composition-api";
Vue.config.productionTip = false;

// 需要在模板模式下使用 vue-config-js 搜索 【'vue':'vue/dist/vue.js'】
Vue.component("svg-icon", {
  template: "<div>123</div>"
});

Vue.use(ElementUI);
Vue.use(VueCompositionApi);

//运行模式 runtime
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
