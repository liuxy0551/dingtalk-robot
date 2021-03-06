import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/auth' },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('../views/auth/index.vue')
    },
    {
      path: '/money',
      name: 'Money',
      meta: { title: '็่ดข' },
      component: () => import('../views/money/index.vue')
    },
    {
      path: '/personal',
      name: 'Personal',
      meta: { title: 'ๆ็' },
      component: () => import('../views/personal/index.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  // console.log(111, { ...to })
})

export default router
