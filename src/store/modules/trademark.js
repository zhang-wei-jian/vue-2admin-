import { reqAddOrEdit,reqTmList, reqDeleteTm } from '@/api';


export default {
  namespaced: true,
  state: {
    tmList: [],
    total: 0,
  },
  mutations: {
    UPDATA_LIST(state, data) {
      state.tmList = data.records;
      state.total = data.total;
    },
  },
  actions: {
    //请求列表数据
    async getTmList({ commit }, { page, limit }) {
      const res = await reqTmList(page, limit);
      if (res.code === 200) {
        commit('UPDATA_LIST', res.data);
        return 'ok';
      } else {
        return Promise.reject('err获取页信息出错');
      }
    },
    async getAddOrEdit({ commit }, tm) {
  
      const res = await reqAddOrEdit(tm);
      if(res.code===200){
        return 'ok'
      }else{
        return Promise.reject('err修改或者添加失败')
      }
    },
    //删除
    async getDeleteTm({commit},id){
   
      
      const res =await reqDeleteTm(id)
      if(res.code===200){
        return '删除成功id:'+id
      }else{
        return Promise.reject('删除失败')
      }
    }
  },

  getters: {},
  modules: {},
};
