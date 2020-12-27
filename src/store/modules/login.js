import { userLogin } from "../../api/login";
import { setToken, setUsername, getUsername, removeAll } from "../../utils/app";
const state = {
  token: "",
  username: getUsername() || ""
};
const mutations = {
  SET_TOKEN(content, token) {
    state.token = token;
  },
  SET_USERNAME(content, username) {
    state.username = username;
  }
};
const getters = {};
const actions = {
  Login(content, data) {
    return new Promise((resolve, reject) => {
      userLogin(data)
        .then(res => {
          const { token, username } = res.data.data;
          content.commit("SET_TOKEN", token);
          content.commit("SET_USERNAME", username);
          setToken(token);
          setUsername(username);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  Exit({ commit }) {
    return new Promise(resolve => {
      removeAll();
      commit("login/SET_TOKEN", "");
      commit("login/SET_USERNAME", "");
      resolve();
    });
  }
};
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
