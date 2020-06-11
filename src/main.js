import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/icon/iconfont.css'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://112.74.103.3:8080/seek_lost'
axios.withCredentials = false,
axios.interceptors.request.use(config => {
	config.headers.token = window.sessionStorage.getItem('token')
	return config
})
Vue.config.productionTip = false


Vue.filter('flod',function(item){
	if(!item) return;
	if (item.isExpand) {
          //当下全文状态
            return item.main.substr(0, item.main.length - 1);//字符串截取
        } else {
            // 当下收起状态
          return item.main.substr(0, 200);//字符串截取100个字)
		  
		}
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



