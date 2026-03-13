<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// Acceder a instancia global del store
const store = useStore()
const router = useRouter()

// Accedemos a variables loading y error del store
const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)

// Variables para el formulario
const name = ref('')
const email = ref('')
const password = ref('')

// Función para manejar el registro (submit del formulario)
const handleSignup = async () => {
  try {
    await store.dispatch('signup', {
      email: email.value,
      password: password.value,
      displayName: name.value
    })
    // si se produce correctamente el registro, nos lleva a la vista de perfil
    router.push({ name: 'Profile' })
  } catch (error) {
    console.warn('Error al crear cuenta:', error)
  }
}

const clearError = () => {
  if (error.value) {
    store.commit('SET_ERROR', null)
  }
}
</script>

<template>
  <main class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h1 class="text-center">Registro</h1>
        <form class="border rounded-3 shadow p-4" @submit.prevent="handleSignup" :disabled="loading">
          <div class="mb-3">
            <label class="form-label" for="name">Nombre</label>
            <input type="name" name="name" id="name" class="form-control" placeholder="Juan Perez" v-model="name"
              @input="clearError">
          </div>
          <div class="mb-3">
            <label class="form-label" for="email">Email</label>
            <input type="email" name="email" id="email" class="form-control" placeholder="Ej: mail@mail.com"
              v-model="email" @input="clearError">
          </div>
          <div class="mb-3">
            <label class="form-label" for="password">Contraseña</label>
            <input type="password" name="password" id="password" class="form-control" v-model="password"
              @input="clearError">
          </div>
          <div class="d-grid mb-3">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <div class="spinner-border" role="status" v-if="loading">
                <span class="visually-hidden">Loading...</span>
              </div>
              <span v-else>Crear cuenta</span>
            </button>
          </div>
          <p class="text-danger small">{{ error }}</p>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped></style>