import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'
import Hot from '../components/Children/Hot.vue'
import Pulish from '../components/Children/Pulish.vue'
import Detail from '../components/Children/Detail.vue'
import Setting from '../components/Children/Setting.vue'
Vue.use(VueRouter)


  const routes = [
 
]

const router = new VueRouter({
  routes:[
	  {path:'/',redirect:'/login'},
	  {path:'/login',component:Login},
	  {path:'/register',component:Register},
	  {path:'/home',
	  component:Home,
	  children:[
	  		{ path:'/hot',component:Hot},
	  		{ path:'/pulish',component:Pulish},
	  		{ path:'/detail',component:Detail},
			{ path:'/setting',component:Setting}
	  		]
	  
	  }
  ]
})

export default router
