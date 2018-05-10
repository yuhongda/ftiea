const #{pageName}#Store = {
  state: {
      value1: 'some things'
  },
  mutations: {
      setValue1(state, value){
          state.value1 = value
      },
  },
  actions: {
      setValue1({commit}, value){
          commit('setValue1', value)
      }
  }
};

export default #{pageName}#Store