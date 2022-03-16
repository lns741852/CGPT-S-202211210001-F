/**
 * 路由配置
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../components/Login.vue')
    },
    {
        //重定向
        path: '/',
        redirect: '/login'
    },
    {
        path: '/main',
        name: 'Main',
        component: () =>
            import ('../components/Main.vue'),
        redirect: '/account',
        children: [{
                path: '/account',
                name: 'Account',
                component: () =>
                    import ('../components/admin/account.vue')
            },
            {
                path: '/carcase',
                name: 'Carcase',
                component: () =>
                    import ('../components/admin/casecar.vue')
            },
            {
                path: '/udi',
                name: 'Udi',
                component: () =>
                    import ('../components/admin/udi.vue')
            },
            {
                path: '/setno',
                name: 'Setno',
                component: () =>
                    import ('../components/admin/setno.vue')
            },
            {
                path: '/setno_seq',
                name: 'Seq',
                component: () =>
                    import ('../components/admin/seq.vue')
            },
        ]
    },
    {
        path: '/setno_search',
        name: 'SetnoSearch',
        component: () =>
            import ('../components/common/setno_search.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router