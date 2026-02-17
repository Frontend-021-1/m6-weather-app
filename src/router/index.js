import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/detalle/:ciudad',
      name: 'Detalle',
      props: true,
      component: () => import('@/views/DetalleView.vue'),
    },
  ],
});

export default router;
