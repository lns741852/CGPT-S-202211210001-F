/**
 * 路由配置
 */
import { createRouter, createWebHashHistory } from 'vue-router' //createWebHashHistory

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
                path: '/package',
                name: 'Package',
                component: () =>
                    import ('../components/admin/package.vue')
            },
            {
                path: '/room',
                name: 'Room',
                component: () =>
                    import ('../components/admin/room.vue')
            },
            {
                path: '/disinfection',
                name: 'Disinfection',
                component: () =>
                    import ('../components/admin/disinfection.vue')
            },
            {
                path: '/position',
                name: 'Position',
                component: () =>
                    import ('../components/admin/position.vue')
            },
            {
                path: '/surgical',
                name: 'Surgical',
                component: () =>
                    import ('../components/admin/surgical.vue')
            },
            {
                path: '/setno_seq',
                name: 'Seq',
                component: () =>
                    import ('../components/admin/seq.vue')
            },
            {
                path: '/depno',
                name: 'Depno',
                component: () =>
                    import ('../components/admin/depno.vue')
            },
            {
                path: '/box',
                name: 'Box',
                component: () =>
                    import ('../components/admin/box.vue')
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
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router