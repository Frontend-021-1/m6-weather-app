<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';

const store = useStore()

const user = computed(() => store.state.user)

/* 
displayName
email
emailVerified
uid
*/

const estadoVerificacion = computed(() => {
  return user.emailVerified ? 'Tu email está verificado' : 'Tu email no ha sido verificado'
})
</script>

<template>
  <main class="container my-5">
    <h1 class="mb-3">Bienvenido a tu perfil, {{ user.displayName }}</h1>
    <div class="border rounded-3 p-4 shadow-sm d-inline-block">
      <h2>Tus datos:</h2>
      <p>Email: {{ user.email }}</p>
      <p :class="user.emailVerified ? 'text-success' : 'text-danger'">{{ estadoVerificacion }}</p>
      <p>Id de Usuario: {{ user.uid }}</p>
    </div>

  </main>
</template>

<style scoped></style>