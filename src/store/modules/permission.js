import { GetUserRole } from "../../api/login";
import { AsyncRoutes, defaultRouters } from "../../router/";
const state = {
  roles: [],
  allRouters: [],
  addRouters: []
};
const mutations = {
  GET_USER_ROLES(state, value) {
    state.roles = value;
  },
  SET_ROUTES(state, router) {
    state.addRouters = router;
    state.allRouters = defaultRouters.concat(router);
  }
};
const getters = {
  roles: state => state.roles,
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
      console.log(btnPerm, button, role);
      let addRouters = [];
      if (role.includes("admin")) {
        addRouters = AsyncRoutes;
      } else {
        addRouters = AsyncRoutes.filter(item => {
          if (role.includes(item.meta.system)) {
            return item;
          }
        });
      }
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
