const store3 = {
    state: {
      businessCodeList: [] // 业务系统列表
    },
    mutations: {
      SET_BUSINESS_CODE_LIST: (state, list) => {
        state.businessCodeList = list
      }
    },
    actions: {
      setBusinessCodeList ({ commit }, list) {
        commit('SET_BUSINESS_CODE_LIST', list)
      }
    }
  }
  
  export default store3