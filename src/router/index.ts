import { createRouter, createWebHistory } from 'vue-router'
import LeaguesView from '@/views/LeaguesView.vue'

const routes = [
  {
    path: '/',
    name: 'Leagues',
    component: LeaguesView,
    meta: { titleKey: 'pages.leagues', descriptionKey: 'meta.leagues', keepAlive: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/PageNotFoundView.vue'),
    meta: { titleKey: 'pages.pageNotFound', descriptionKey: 'meta.pageNotFound', keepAlive: false },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
