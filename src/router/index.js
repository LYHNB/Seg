import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/login/index.vue'
import Framework from '@/views/Framework.vue'
import NotFound from '@/views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    //登录页
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    //首页
    path: '/home',
    name: 'home',
    component: Framework,
    children:[
      {
        path:'/test',
        name:'test',
        component:Home
      }
    ]
  },
  {
    path:'*',
    component:NotFound,
    hidden:true
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
