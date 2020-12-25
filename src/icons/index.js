import Vue from "vue";
import svgIcons from "./svgIcon";

const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);

// 需要在模板模式下使用 vue-config-js 搜索 【'vue':'vue/dist/vue.js'】
Vue.component("svg-icon", svgIcons);
