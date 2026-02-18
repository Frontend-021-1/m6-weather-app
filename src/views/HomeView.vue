<script setup>
import { ref, onMounted, computed } from 'vue'
import WeatherApp from '@/services/WeatherApp';

const props = defineProps({
  busqueda: String
})

const weather = new WeatherApp()

const climas = ref([])
const tempSystem = ref(true)

const tempDisplay = computed(() => {
  return tempSystem.value ? 'Celsius' : 'Fahrenheit'
})

const climasFiltrados = computed(() => {
  return climas.value.filter(clima => clima.location.name.toLowerCase().includes(props.busqueda.toLowerCase()))
})

const lugares = [
  'Santiago',
  'Arica',
  'Puerto Natales',
  'Concepción',
  'Putre',
  'Temuco'
]

// Consumo de la API
onMounted(async () => {
  await weather.fetchWeather(lugares)
  climas.value = weather.weather
  console.log(climas.value)
})
</script>

<template>
  <main class="container my-4">
    <h1 class="text-center">Reporte del tiempo en Chile</h1>
    <!-- Elegir si mostrar la temp en C o F -->
    <div class="form-check form-switch">

      <input class="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" checked
        v-model="tempSystem">
      <label class="form-check-label" for="switchCheckChecked">{{ tempDisplay }}</label>
    </div>
    <div class="row row-cols-1 row-cols-md-4 row-cols-lg-6 g-4 justify-content-center" id="lugares">
      <!-- Acá se insertarán dinámicamente los lugares -->
      <TransitionGroup name="slide-fade">
        <div class="col" v-for="lugar in climasFiltrados" :key="`${lugar.location.lat}-${lugar.location.lon}`">
          <div class="card h-100 text-center">
            <img :src="lugar.current.condition.icon" class="card-image-top">
            <div class="card-body">
              <h5 class="card-title">{{ lugar.location.name }}</h5>
              <p class="card-text">{{ tempSystem ? `${lugar.current.temp_c}°C` : `${lugar.current.temp_f}°F` }}</p>
              <p class="card-text">{{ lugar.current.condition.text }}</p>
            </div>
            <div class="card-footer bg-transparent border-0">
              <RouterLink class="card-link" :to="{ name: 'Detalle', params: { ciudad: lugar.location.name } }">Ver
                detalle
              </RouterLink>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </main>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>