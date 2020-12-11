const store2 = {
    state: {
      managerGroupList: [], // 管理组列表
      dataTypeList: [] // 数据类型列表
    },
    mutations: {
      SET_MANAGER_GROUP: (state, list) => {
        state.managerGroupList = list
      }
    },
    actions: {
      setManagerGroup ({ commit }, list) {
        commit('SET_MANAGER_GROUP', list)
      }
  
    }
  }
  
  export default store2