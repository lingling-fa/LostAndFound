import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'
import Pulish from '../components/Children/Pulish.vue'
import Detail from '../components/Children/Detail.vue'
import Setting from '../components/Children/Setting.vue'
import FirstPage from '../components/Children/FirstPage.vue'
import NewPage from '../components/Children/NewPage.vue'
import PersonalHome from'../components/Children/PersonalHome.vue'
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
	  redirect:	'/firstpage',
	  children:[
	  		{ path:'/firstpage',component:FirstPage},
	  		{ path:'/pulish',component:Pulish},
	  		{ path:'/detail/:id',
			 name:'Detail',
			component:Detail},
			{   name:'Setting',
				path:'/setting',
			component:Setting},
			{ path:'/newpage',component:NewPage},
			{ path:'/personalhome',
			name:'Personalhome',
			component:PersonalHome}
	  		]
	  
	  }
  ],
  
})

router.beforeEach((to, from, next)=>{
	//to 将要访问的路径
	//from 从哪个路径跳转来
	//next 是一个函数，表示放行
		if(to.path === '/login') 
		    return next();
				
		const tokenStr = window.sessionStorage.getItem('token');
		
		if(!tokenStr) 
				return next('/login')
		 else  
			  next();
		
})

export default router
