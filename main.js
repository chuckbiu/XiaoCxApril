import Vue from 'vue'
import App from './App'
import store from './store/store.js'
Vue.config.productionTip = false
App.mpType = 'app'

// 全局方法
// 获取顶部距离
Vue.prototype.$getNavTop = function(){
  let windowWidth = uni.getSystemInfoSync().windowWidth;
  const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
  const menuButton = uni.getMenuButtonBoundingClientRect();
  let navHeight = (menuButton.height + (menuButton.top - statusBarHeight) * 2) * (750 / windowWidth);
  let statusBarTop = statusBarHeight * (750 / windowWidth);
  this.navtop = menuButton.top + 'px';
}

const app = new Vue({
	...App,
  store
})
app.$mount()
