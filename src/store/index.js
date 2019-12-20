import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    client:null,
  },
  mutations: {
    // 建立一个链接
    createClient(state,options){
      try {
        state.client=options.client;
        state.client.onopen=options.open;
      }
      catch(e){
      }
    },
    // 当获取到消息
    message(state,fun){
      try {
        state.client.onmessage=fun;
      }
      catch(e){
        console.log(e)
      }
    },
    // 发送消息
    send(state,data){
      try {
        state.client.send(JSON.stringify(data));
      }
      catch(e){
        console.log(e)
      }
      
    }
  },
  actions: {
  },
  modules: {
  }
})
