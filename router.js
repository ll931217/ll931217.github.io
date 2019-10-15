import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '',
        name: 'index',
        component: () => import('~/pages/index')
      },
      {
        path: '/start',
        name: 'StartPage',
        component: () => import('~/pages/StartPage')
      }
    ]
  })
}
