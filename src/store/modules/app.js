const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
};
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  }
};
const actions = {};
const getters = {
  isCollapse: state => state.isCollapse
};
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true // 区分命名空间
};
