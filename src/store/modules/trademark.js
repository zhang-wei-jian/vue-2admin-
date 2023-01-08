import { reqDeleteTm } from '@/api';

export default {
  state: {
    // name:'trademark'
  },
  mutations: {},
  actions: {
    async getDeleteTm({ commit }, {page, limit}) {
      const res = await reqDeleteTm(page, limit)
      if(res.code===200){
        return 'ok'
      }else{
        return Promise.reject('err获取页信息出错')
      }
    },
  },

  getters: {},
  modules: {},
};
