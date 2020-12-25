import { userLogin } from "../../api/login";
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
};
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  }
};
const actions = {
  Login(content, data) {
    new Promise((resolve, reject) => {
      userLogin(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
