<script setup>
import { ref } from 'vue'
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';

const filtro = ref('')
const handleCambioBusqueda = (busqueda) => {
  filtro.value = busqueda
}

</script>

<template>
  <Navbar @cambio-busqueda="handleCambioBusqueda" />
  <RouterView :busqueda="filtro" />
  <Footer />
</template>

<style scoped></style>
