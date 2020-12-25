import { userLogin } from "../api/login";
export default {
  state: {},
  mutations: {},
  actions: {
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
  }
};
