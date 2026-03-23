<script setup>

</script>

<template>
  <div class="text-center">
    <h1>404 - Página no encontrada</h1>
    <p>La página a la que intentas acceder no existe.</p>
    <router-link :to="{ name: 'Home' }">Volver al inicio</router-link>
  </div>
</template>

<style scoped></style>