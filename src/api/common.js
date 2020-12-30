import { GetCategory, GetCategoryAll } from "./news";
import { Message } from "element-ui";

export default {
  install(Vue) {
    Vue.prototype.$getCategory = function() {
      return new Promise(resolve => {
        GetCategory()
          .then(res => {
            const { data } = res.data.data;
            resolve(data);
          })
          .catch(() => {
            Message.error({
              message: "接口请求失败"
            });
          });
      });
    };
    Vue.prototype.$getCategoryAll = function() {
      return new Promise(resolve => {
        GetCategoryAll()
          .then(res => {
            const { data } = res.data.data;
            resolve(data);
          })
          .catch(() => {
            Message.error({
              message: "接口请求失败"
            });
          });
      });
    };
  }
};
