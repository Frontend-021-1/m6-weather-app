<script setup>
import { ref } from 'vue'

const emit = defineEmits(['cambio-busqueda'])

const busquedaFiltro = ref('')

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <a class="navbar-brand" href="./index.html">El Tiempo</a>
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
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link active" :to="{ name: 'Home' }">Inicio</RouterLink>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>