import Vue from 'vue'
import VueRouter from 'vue-router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Home from '../views/HomeView.vue'
import Login from '../views/login/index.vue'
import Framework from '@/views/Framework.vue'
import NotFound from '@/views/404.vue'
import Employee from '@/views/employee/index.vue'
import nprogress from 'nprogress'
import HomeView from '@/views/HomeView.vue'
import {
  Message
} from 'element-ui'

Vue.use(VueRouter)

const routes = [{
    //登录页
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    //首页
    path: '/home',
    name: 'home',
    component: Framework,
    //定义一组路由，此处为改组路由都需要登陆验证
    meta: {
      authRequired: true
    },
    children: [{
        path: '/test',
        name: '测试',
        component: Home
      },
      {
        path: '/employeeList',
        name: '用户管理',
        component: Employee
      }
    ]
  },
  {
    path: '*',
    component: NotFound,
    hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  nProgress.start();
  const token = localStorage.getItem('token')
  if (to.name !== 'login' && !token) {
    next({
      name: 'login'
    })
    Message.error('用户未登录')
    nProgress.done();
  } else next()
})

router.afterEach(() => {
  nProgress.done();
})

export default router