import service from "../utils/service";

export function AddInfo(data) {
  return service.request({
    method: "post",
    url: "/news/add/",
    data: data
  });
}

export function EditInfo(data) {
  return service.request({
    method: "post",
    url: "/news/editInfo/",
    data: data
  });
}

export function DeleteInfo(data) {
  return service.request({
    method: "post",
    url: "/news/deleteInfo/",
    data: data
  });
}

export function AddFirstCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data: data
  });
}

export function AddChildCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addChildrenCategory/",
    data: data
  });
}

export function GetList(data) {
  return service.request({
    method: "post",
    url: "/news/getList/",
    data: data
  });
}
export function GetCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data: data
  });
}
export function GetCategoryAll(data) {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data: data
  });
}
export function EditCategory(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data: data
  });
}
export function DeleteCategory(data) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data: data
  });
}
