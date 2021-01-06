import service from "../utils/service";

export function GetUserList(data) {
  return service.request({
    method: "post",
    url: "devApi/user/getList/",
    data: data
  });
}

export function GetCityPicker(data) {
  return service.request({
    method: "post",
    url: "devApi/cityPicker/",
    data: data
  });
}
export function GetRole(data) {
  return service.request({
    method: "post",
    url: "devApi/role/",
    data: data
  });
}
export function AddUser(data) {
  return service.request({
    method: "post",
    url: "devApi/user/add/",
    data: data
  });
}
export function DeleteUser(data) {
  return service.request({
    method: "post",
    url: "devApi/user/delete/",
    data: data
  });
}
export function UserActives(data) {
  return service.request({
    method: "post",
    url: "devApi/user/actives/",
    data: data
  });
}
export function EditUser(data) {
  return service.request({
    method: "post",
    url: "devApi/user/edit/",
    data: data
  });
}
