import { GetCategory, GetCategoryAll } from "./news";
// import { Message } from "element-ui";

export default {
  install(Vue) {
    Vue.prototype.$getCategory = function() {
      return new Promise(resolve => {
        GetCategory()
          .then(res => {
            const { data } = res.data.data;
            resolve(data);
          })
          .catch(() => {
            // Message.error({
            //   message: "接口请求失败"
            // });
          });
      });
    };
    Vue.prototype.$getCategoryAll = function() {
      return new Promise(resolve => {
        GetCategoryAll()
          .then(res => {
            const { data } = res.data;
            let category = [];
            data.map(item => {
              if (item.children && item.children.length > 0) {
                category.push({
                  id: item.id,
                  parent_id: item.parent_id,
                  category_name: item.category_name
                });
                let children = item.children;
                children.map(child => {
                  category.push({
                    id: child.id,
                    parent_id: child.parent_id,
                    category_name: child.category_name
                  });
                });
              } else {
                category.push({
                  id: item.id,
                  parent_id: item.parent_id,
                  category_name: item.category_name
                });
              }
            });
            resolve(category);
          })
          .catch(() => {
            // Message.error({
            //   message: "接口请求失败"
            // });
          });
      });
    };
  }
};
