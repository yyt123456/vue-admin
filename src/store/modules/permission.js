import { GetUserRole } from "../../api/login";
import { AsyncRoutes, defaultRouters } from "../../router/";
const state = {
  roles: [],
  buttons: [],
  btnPerm: [],
  allRouters: [],
  addRouters: []
};
function hasRoleList(roles, router) {
  // 角色权限分配
  if (router.meta && router.meta.roles) {
    return roles.some(item => router.meta.roles.indexOf(item) > -1);
  }
}
const mutations = {
  GET_USER_ROLES(state, value) {
    state.roles = value;
  },
  SET_BUTTON(state, value) {
    state.buttons = value;
  },
  SET_BTN_PERM(state, value) {
    state.btnPerm = value;
  },
  SET_ROUTES(state, router) {
    state.addRouters = router;
    state.allRouters = defaultRouters.concat(router);
  }
};
const getters = {
  roles: state => state.roles,
  buttons: state => state.buttons,
  btnPerm: state => state.btnPerm,
  allRouters: state => state.allRouters,
  addRouters: state => state.addRouters
};
const actions = {
  getUserRoles({ commit }, data) {
    return new Promise((resolve, reject) => {
      GetUserRole(data)
        .then(res => {
          commit("GET_USER_ROLES", res.data.data);
          resolve(res.data.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  createRouters({ commit }, data) {
    return new Promise(resolve => {
      let { btnPerm, button, role } = data;
      commit("SET_BUTTON", button);
      commit("SET_BTN_PERM", btnPerm);
      let addRouters = [];
      if (role.includes("admin")) {
        addRouters = AsyncRoutes;
      } else {
        addRouters = AsyncRoutes.filter(item => {
          //系统角色
          // if (role.includes(item.meta.system)) {
          //   return item;
          // }
          if (hasRoleList(role, item)) {
            if (item.children && item.children.length > 0) {
              item.children = item.children.filter(child => {
                if (hasRoleList(role, child)) {
                  return child;
                }
              });
              return item;
            }
            return item;
          }
        });
      }
      addRouters.push(AsyncRoutes[AsyncRoutes.length - 1]);
      addRouters.push(AsyncRoutes[AsyncRoutes.length - 2]);
      commit("SET_ROUTES", addRouters);
      resolve();
    });
  }
};
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true // 区分命名空间
};
