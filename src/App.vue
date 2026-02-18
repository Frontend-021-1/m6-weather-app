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
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :busqueda="filtro" />
    </transition>
  </router-view>
  <Footer />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
