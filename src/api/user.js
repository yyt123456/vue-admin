import service from "../utils/service";

export function GetUserList(data) {
  return service.request({
    method: "post",
    url: "/user/getList/",
    data: data
  });
}

export function GetCityPicker(data) {
  return service.request({
    method: "post",
    url: "/cityPicker/",
    data: data
  });
}
export function GetRole(data) {
  return service.request({
    method: "post",
    url: "/role/",
    data: data
  });
}
export function AddUser(data) {
  return service.request({
    method: "post",
    url: "/user/add/",
    data: data
  });
}
export function DeleteUser(data) {
  return service.request({
    method: "post",
    url: "/user/delete/",
    data: data
  });
}
export function UserActives(data) {
  return service.request({
    method: "post",
    url: "/user/actives/",
    data: data
  });
}
export function EditUser(data) {
  return service.request({
    method: "post",
    url: "/user/edit/",
    data: data
  });
}

export function GetSys(data) {
  return service.request({
    method: "post",
    url: "/system/",
    data: data
  });
}
export function GetPermButton(data) {
  return service.request({
    method: "post",
    url: "/permButton/",
    data: data
  });
}
