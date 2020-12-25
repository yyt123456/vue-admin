import { userLogin } from "../../api/login";
import { setToken, setUsername } from "../../utils/app";
const state = {
  token: "",
  username: ""
};
const mutations = {
  SET_TOKEN(content, token) {
    state.token = token;
  },
  SET_USERNAME(content, username) {
    state.username = username;
  }
};
const actions = {
  Login(content, data) {
    new Promise((resolve, reject) => {
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
