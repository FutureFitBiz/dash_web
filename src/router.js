import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './views/Main.vue'
import Login from './views/Login.vue'
import store from '@/store.js'


Vue.use(VueRouter)

function requireAuth(to, from, next) {

  if (store.state.token.length === 0) {
    console.log('logged out')
    router.push({ path: '/login' })
  } else {
    next()
  }
}

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    beforeEnter: requireAuth,
    component: Main,
    children: [
      { path: '/', component: () => import('./components/Home.vue') },
      { path: '/risk-profile', component: () => import('./components/RiskAssessment.vue') },
      { path: '/inputs/:input_type', component: () => import('./components/Inputs.vue') },
      { path: '/getting-started', component: () => import('./components/GettingStarted.vue') },
      { path: '/progress', component: () => import('./components/ProgressSummary.vue') },
      { path: '/be/:goal', component: () => import('./components/Goal.vue') },
      { path: '/be/:goal/:goal_type', component: () => import('./components/Goal.vue') },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
