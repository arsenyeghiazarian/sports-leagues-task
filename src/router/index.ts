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
  // BASE_URL follows Vite's `base`, so routes also work when deployed under a sub-path (GitHub Pages)
  history: createWebHistory(import.meta.env.BASE_URL),
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
