import service from "../utils/service";

export function GetUserList(data) {
  return service.request({
    method: "post",
    url: "devApi/user/getList/",
    data: data
  });
}
