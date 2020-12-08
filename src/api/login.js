import service from "../utils/service";
// 验证码
export function getSms() {
  service.request({
    method: "post",
    url: "devApi/getSms/",
    data: {}
  });
}
// 用户
// 登录角色
//注册
