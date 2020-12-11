const store1 = {
    state: {
      dataStoreMaps: {} // 数据词典
    },
    mutations: {
      SET_DATA_STORE_MAPS: (state, list) => {
        state.dataStoreMaps = list
      }
    },
    actions: {
      setDataStoreMaps ({ commit }, list) {
        commit('SET_DATA_STORE_MAPS', list)
      }
  
    }
  }
  
  export default store1