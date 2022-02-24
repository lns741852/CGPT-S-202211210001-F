/**
 * 路由配置
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    //重定向
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../components/Main.vue'),
    redirect: '/welcome',
    children: [
      {path: '/welcome',name: 'Welcome',component: () => import('../components/Welcome.vue')},
      {path: '/account',name: 'Account',component: () => import('../components/account/accountlist.vue')},
      // {path: '/carcase',name: 'Carcase',component: () => import('../components/account/carcaselist.vue')},
      // {path: '/setno_seq',name: 'Setno_Seq',component: () => import('../components/account/accountlist.vue')},
      // {path: '/udi',name: 'Udi',component: () => import('../components/account/accountlist.vue')},
      // {path: '/setno',name: 'Setno',component: () => import('../components/account/accountlist.vue')},
      // {path: '/account',name: 'Account',component: () => import('../components/account/accountlist.vue')},
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
