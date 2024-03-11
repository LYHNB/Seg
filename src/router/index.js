import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/login/index.vue'
import Framework from '@/views/Framework.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/login'
  },
  {
    //登录页
    path: '/login',
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
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
