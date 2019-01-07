import Vue from 'vue'
import Router from 'vue-router'
import Staff from '@/page/Staff'
import Role from '@/page/Role'
import Page from '@/page/Page'
import Dictionary from '@/page/Dictionary'
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
                path: 'staff',
                name: 'Staff',
                component: Staff,
                meta: {
                    title: '员工',
                    requireAuth: true
                },
            },
            {
                path: 'role',
                name: 'Role',
                component: Role,
                meta: {
                    title: '角色',
                    requireAuth: true
                },
            },
            {
                path: 'page',
                name: 'Page',
                component: Page,
                meta: {
                    title: '页面',
                    requireAuth: true
                },
            },
            {
                path: 'dictionary',
                name: 'Dictionary',
                component: Dictionary,
                meta: {
                    title: '字典',
                    requireAuth: true
                },
            },
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