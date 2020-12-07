import http from "../utils/http";
// 验证码
export function getSms() {
  http.request({
    method: "post",
    url: "/getSms/",
    data: {}
  });
}
// 用户
// 登录角色
//注册
