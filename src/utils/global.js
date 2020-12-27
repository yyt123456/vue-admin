import { MessageBox, Message } from "element-ui";
export default {
  install(Vue, options) {
    console.log(options, "options");
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
  }
};
