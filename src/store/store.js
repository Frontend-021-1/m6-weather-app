import { createStore } from 'vuex';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/firebase/config';

const store = createStore({
  state: {
    user: null,
    error: null,
    loading: false,
    authIsReady: false,
  },
  mutations: {
    SET_USER(state, newUser) {
      state.user = newUser;
    },
    SET_ERROR(state, newError) {
      state.error = newError;
    },
    SET_LOADING(state, newLoading) {
      state.loading = newLoading;
    },
    SET_AUTH_IS_READY(state, authReady) {
      state.authIsReady = authReady;
    },
  },
  actions: {
    async signup({ commit }, { email, password, displayName }) {
      try {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        // primero validar que haya una response desde el servidor
        if (response) {
          // si es que el usuario entregó un nombre en el formulario, lo adjuntamos al perfil de firebase
          if (displayName) {
            await updateProfile(response.user, {
              displayName: displayName,
            });
          }
          commit('SET_USER', response.user);
        } else {
          throw new Error('No se pudo completar la creación de cuenta');
        }
      } catch (error) {
        console.log(error);
        commit('SET_ERROR', error.message);
        // Cómo manejar este error desde el componente???
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async login({ commit }, { email, password }) {
      try {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        // primero validar que haya una response desde el servidor
        if (response) {
          commit('SET_USER', response.user);
        } else {
          throw new Error('No se pudo completar el inicio de sesión');
        }
      } catch (error) {
        console.log(error);
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async logout({ commit }) {
      console.log('Logging out', this.state.user);
      await signOut(auth);
      commit('SET_USER', null);
    },
  },
});

const unsub = onAuthStateChanged(auth, (user) => {
  if (user) {
    store.commit('SET_USER', user);
  } else {
    store.commit('SET_USER', null);
  }

  store.commit('SET_AUTH_IS_READY', true);

  unsub();
});

export default store;
