import service from "../utils/service";
// 验证码
export function GetSms(data) {
  return service.request({
    method: "post",
    url: "devApi/getSms/",
    data: data
  });
}
// 用户
// 登录角色
//注册
export function Register(data) {
  return service.request({
    method: "post",
    url: "devApi/register/",
    data: data
  });
}
