import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/page/Dashboard'
import Layout from '@/page/Layout'
import lyx from './basic'

Vue.use(Router)

let routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    title: '数据可视化',
                    requireAuth: true
                },
            }
        ]
    }
]
routes = [...routes, ...lyx]

let router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (localStorage.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    }
    else {
        next();
    }
})
router.afterEach((to, from) => {
    document.title = to.meta.title||'XX管理系统'
})

export default router;