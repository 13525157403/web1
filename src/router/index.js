import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home'
Vue.use(VueRouter)
const routs = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

routs.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokin = window.sessionStorage.getItem('token')
  if (!tokin) {
    return next('/login')
  }
  next()
})
export default routs
