<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

// Acceso a constantes del store
const user = computed(() => store.state.user)
const authIsReady = computed(() => store.state.authIsReady)

const emit = defineEmits(['cambio-busqueda'])

const busquedaFiltro = ref('')

const handleLogout = async () => {
  await store.dispatch('logout')
  router.push({ name: 'Login' })
}

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <RouterLink class="navbar-brand" :to="{ name: 'Home' }">El Tiempo</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Búsqueda (filtro) de ciudades -->
      <form class="d-flex">
        <input type="text" placeholder="Ej: Santiago" aria-label="Buscar" class="form-control"
          v-model.trim="busquedaFiltro" @input="$emit('cambio-busqueda', busquedaFiltro)">
      </form>
      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- ms-auto para que links se muestren a la derecha -->
        <template v-if="authIsReady">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" :to="{ name: 'Home' }">Inicio</RouterLink>
            </li>
            <template v-if="!user">
              <li class="nav-item">
                <RouterLink class="nav-link" active-class="active" :to="{ name: 'Login' }">Login</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" active-class="active" :to="{ name: 'Signup' }">Registrarse</RouterLink>
              </li>
            </template>
            <template v-else>
              <p class="small muted ms-4 mb-0">Hola, {{ user.displayName }}</p>
              <li class="nav-item">
                <RouterLink class="nav-link" active-class="active" :to="{ name: 'Profile' }">Perfil</RouterLink>
              </li>
              <li class="nav-item">
                <button class="btn" aria-label="Logout" @click="handleLogout">
                  <Icon icon="lucide:log-out" width="20" height="20" class="text-danger" />
                </button>
              </li>
            </template>
          </ul>
        </template>
        <template v-else>
          <div class="ms-auto spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>