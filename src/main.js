import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/icon/iconfont.css'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://112.74.103.3:8080/seek_lost/api/user'
Vue.config.productionTip = false


Vue.filter('flod',function(item){
	if(!item.context) return;
	if (item.isExpand) {
          //当下全文状态
            return item.context.substr(0, item.context.length - 1);//字符串截取
        } else {
            // 当下收起状态
          return item.context.substr(0, 100);//字符串截取100个字)
		}
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



