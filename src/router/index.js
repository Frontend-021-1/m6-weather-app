import store from '@/store/store';
import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/detalle/:ciudad',
      name: 'Detalle',
      props: true,
      component: () => import('@/views/DetalleView.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/views/SignupView.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});

const waitForAuthReady = () => {
  return new Promise((resolve) => {
    if (store.state.authIsReady) resolve();
    else {
      const unsubscribe = store.subscribe((mutation) => {
        if (mutation.type === 'SET_AUTH_IS_READY') {
          unsubscribe();
          resolve();
        }
      });
    }
  });
};

// Guardia de navegación global
router.beforeEach(async (to, from) => {
  // Pausamos ejecucion de esta funcion hasta saber si el usuario está logueado
  await waitForAuthReady();

  // const isAuthenticated = store.state.user ? true : false
  const isAuthenticated = !!store.state.user;

  // Caso 1: La ruta exige estar logueado (requiresAuth: true) pero el usuario no lo está
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'Login' };
  }

  // Caso 2: El usuario está logueado y trata de ingresar a Login o Signup (no tendría mucho sentido...)
  if (
    (to.name === 'Login' && isAuthenticated) ||
    (to.name === 'Signup' && isAuthenticated)
  ) {
    return { name: 'Profile' };
  }
});

export default router;
