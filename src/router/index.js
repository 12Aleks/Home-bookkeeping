import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase";


Vue.use(VueRouter)

const router = new VueRouter ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main', auth :true
    },
    component: () =>
      import('../views/Home.vue')
  }, {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'empty'
    },
    component: () =>
      import('../views/Login.vue')
  }, {
    path: '/register',
    name: 'Register',
    meta: {
      layout: 'empty'
    },
    component: () =>
      import('../views/Register.vue')
  }, {
    path: '/detail/:id',
    name: 'DetalRecord',
    meta: {
      layout: 'main', auth: true
    },
    component: () =>
      import('../views/DetalRecord.vue')
  }, {
    path: '/categories',
    name: 'Categories',
    meta: {
      layout: 'main', auth: true
    },
    component: () =>
      import('../views/Categories.vue')
  }, {
    path: '/record',
    name: 'Record',
    meta: {
      layout: 'main', auth: true
    },
    component: () =>
      import('../views/Record.vue')
  }, {
    path: '/history',
    name: 'History',
    meta: {
      layout: 'main'
    },
    component: () =>
      import('../views/History.vue')
  }, {
    path: '/planing',
    name: 'Planing',
    meta: {
      layout: 'main', auth: true
    },
    component: () =>
      import('../views/Planning.vue')
  }, {
    path: '/profile',
    name: 'Profile',
    meta: {
      layout: 'main', auth: true
    },
    component: () =>
      import('../views/Profile.vue')
  }]})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser

  const requireAuth = to.matched.some(record => record.meta.auth)
  if(requireAuth  && !currentUser){
    next('/login?message=login')
  }else{
    next()
  }
})
export default router
