import Vue from "vue";
import Vuex from "vuex";
import Cookies from 'cookie_js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(Cookies.get('isCollapse')) || false
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
        Cookies.set('isCollapse', JSON.stringify(state.isCollapse))
    }
  },
  actions: {},
  modules: {}
});
