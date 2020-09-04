import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/login',
        name: 'Login',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/Login.vue')
    }, {
        path: '/register',
        name: 'Register',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/Register.vue')
    }, {
        path: '/detal',
        name: 'DetalRecord',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/DetalRecord.vue')
    }, {
        path: '/categories',
        name: 'Categories',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Categories.vue')
    }, {
        path: '/record',
        name: 'Record',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Record.vue')
    }, {
        path: '/history',
        name: 'History',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/History.vue')
    }, {
        path: '/planing',
        name: 'Planing',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Planning.vue')
    }, {
        path: '/profile',
        name: 'Profile',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Profile.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
