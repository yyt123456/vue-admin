import { MessageBox, Message } from "element-ui";
import { ref } from "@vue/composition-api";
export function global() {
  const str = ref("123");
  const confirm = params => {
    MessageBox.confirm(params.content, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(action => {
        if (action === "confirm") {
          params.fn && params.fn(params.id || "");
          Message.success({
            type: "success",
            message: "删除成功!"
          });
        }
      })
      .catch(() => {
        params.catchFn && params.catchFn();
        Message.warning({
          type: "warning",
          message: "已取消删除"
        });
      });
  };
  return { str, confirm };
}
