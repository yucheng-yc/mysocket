import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from "../views/login";
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path:"/",
    redirect:"/login"
  },
  {
    path:"/login",
    name:"login",
    component:login
  }
]

const router = new VueRouter({
  routes
})

export default router
