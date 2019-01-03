import Login from '@/page/Login'
import ResetPassword from '@/page/ResetPassword'
let routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta:{
            title:'登录',
            requireAuth:false
        }
    },
    {
        path: '/resetPassword',
        name: 'ResetPassword',
        component: ResetPassword,
        meta:{
            title:'重置密码',
            requireAuth:false
        }
    }
]
export default routes