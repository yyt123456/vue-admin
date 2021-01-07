import { MessageBox, Message } from "element-ui";
import store from "../store/index";
export default {
  install(Vue) {
    Vue.prototype.confirm = function(params) {
      MessageBox.confirm(params.content, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (params.fn) {
            params.fn();
          }
          Message.success({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          Message.success({
            type: "info",
            message: "已取消删除"
          });
        });
    };

    Vue.prototype.$button = function(params) {
      let data = store.getters["permission/btnPerm"];
      let roles = store.getters["permission/roles"].role;
      if (roles.includes("admin")) {
        return true;
      } else {
        if (params) {
          return data.indexOf(params) > -1;
        }
      }
    };
  }
};
