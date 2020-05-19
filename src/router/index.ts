import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import App from '../App.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: App
  },
]

const router = new VueRouter({
  routes
})

export default router
