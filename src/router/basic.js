import Login from '@/page/Login'
let routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta:{
            title:'登录',
            requireAuth:false
        }
    }
]
export default routes