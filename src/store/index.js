import Vue from 'vue';
import Vuex from 'vuex';
import trademark from './modules/trademark';
Vue.use(Vuex);


const state = {};
const mutations = {};
const actions = {};
const getters = {};
const modules = {
  trademark,
};


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules,
  });