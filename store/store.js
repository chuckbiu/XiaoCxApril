// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
import userinfo from './user.js'
// 导入位置的 vuex 模块
import modulePois from './pois.js'
// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

// 3. 创建 Store 的实例对象
const store = new Vuex.Store({
  // TODO：挂载 store 模块
  state:{
  },
  modules: {
    'user_info':userinfo,
    'pois':modulePois
  },
  mutations:{
    
  }
})

// 4. 向外共享 Store 的实例对象
export default store