import service from "../utils/service";

export function AddInfo(data) {
  return service.request({
    method: "post",
    url: "devApi/news/add/",
    data: data
  });
}

export function EditInfo(data) {
  return service.request({
    method: "post",
    url: "devApi/news/editInfo/",
    data: data
  });
}

export function DeleteInfo(data) {
  return service.request({
    method: "post",
    url: "devApi/news/deleteInfo/",
    data: data
  });
}

export function AddFirstCategory(data) {
  return service.request({
    method: "post",
    url: "devApi/news/addFirstCategory/",
    data: data
  });
}

export function AddChildCategory(data) {
  return service.request({
    method: "post",
    url: "devApi/news/addChildrenCategory/",
    data: data
  });
}

export function GetList(data) {
  return service.request({
    method: "post",
    url: "devApi/news/getList/",
    data: data
  });
}
export function GetCategory(data) {
  return service.request({
    method: "post",
    url: "devApi/news/getCategory/",
    data: data
  });
}
export function GetCategoryAll(data) {
  return service.request({
    method: "post",
    url: "devApi/news/getCategoryAll/",
    data: data
  });
}
export function EditCategory(data) {
  return service.request({
    method: "post",
    url: "devApi/news/editCategory/",
    data: data
  });
}
export function DeleteCategory(data) {
  return service.request({
    method: "post",
    url: "devApi/news/deleteCategory/",
    data: data
  });
}
