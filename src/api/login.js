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
export function userLogin(data) {
  return service.request({
    method: "post",
    url: "devApi/login/",
    data: data
  });
}
//注册
export function Register(data) {
  return service.request({
    method: "post",
    url: "devApi/register/",
    data: data
  });
}

//获取角色
export function GetUserRole(data) {
  return service.request({
    method: "post",
    url: "devApi/userRole/",
    data: data
  });
}
