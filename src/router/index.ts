import { createRouter, createWebHistory } from 'vue-router'
import GameView from '@/views/GameView.vue';
import InGameView from '@/views/InGameView.vue';
import GameWaitingView from '@/views/GameWaitingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/game',
      component: GameView,
      children: [
        {
          path: '',
          name: 'matching',
          component: GameWaitingView,
        },
        {
          path: ':roomId',
          name: 'ingame',
          component: InGameView,
        },
      ]
    },
  ]
})

export default router
