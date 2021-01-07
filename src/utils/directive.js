import store from "../store/index";
export default {
  install(Vue) {
    Vue.directive("btnPerm", {
      bind: function(el, bingind) {
        if (bingind.def.hasPermission(bingind.value)) {
          el.className = el.className + " hidden-button";
          console.log(el.className);
        }
      },
      inserted: function() {},
      update: function() {},
      componentUpdated: function() {},
      unbind: function() {},
      hasPermission: function(params) {
        let data = store.getters["permission/btnPerm"];
        if (params) {
          return data.indexOf(params) > -1;
        }
      }
    });
  }
};
