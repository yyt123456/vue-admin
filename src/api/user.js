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
