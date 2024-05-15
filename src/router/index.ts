import { createRouter, createWebHistory } from 'vue-router'
import GameView from '@/views/GameView.vue';
import TestView from '@/views/TestView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'game',
      component: GameView,
    },
    {
      path: '/test',
      component: TestView,
    }
  ]
})

export default router
