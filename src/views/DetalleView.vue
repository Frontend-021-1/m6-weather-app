<script setup>
import { ref, onMounted } from 'vue'
import WeatherApp from '@/services/WeatherApp';

const weather = new WeatherApp()

const props = defineProps({
  ciudad: String
})

const clima = ref([])
const estadisticas = ref([])

onMounted(async () => {
  await weather.fetchWeatherByName(props.ciudad)
  clima.value = weather.cityForecast
  estadisticas.value = weather.estadisticasPronostico()
  console.log(estadisticas.value)
})
</script>

<template>
  <main class="container my-4">
    <RouterLink :to="{ name: 'Home' }">← Volver</RouterLink>

    <section class="row">
      <div class="col col-lg-8" id="lugar">
        <h1>El tiempo en: {{ clima.location?.name }}</h1>
        <!-- Contenido del lugar se mostrará dinámicamente -->
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-lg-4 d-flex justify-content-center align-items-center">
              <img :src="clima.current?.condition.icon" class="card-image-top">
            </div>
            <div class="col-lg-8">
              <div class="card-body">
                <h2 class="card-title">{{ clima.location?.name }}</h2>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">{{
                    clima.current?.condition.text
                  }}</li>
                  <li class="list-group-item">Temperatura: {{
                    clima.current?.temp_c
                  }}°C</li>
                </ul>
                <p class="card-text">
                  <small class="text-body-secondary">Última actualización hace 3 minutos</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col col-lg-4">
        <h3>Pronóstico semanal</h3>

        <!-- Card pronóstico -->
        <div class="card">
          <ul class="list-group list-group-flush" id="pronosticoSemanal">
            <TransitionGroup name="fade">
              <!-- Pronóstico de la ciudad se mostrará dinámicamente -->
              <li class="list-group-item" v-for="dia in clima.forecast?.forecastday" :key="dia.date">
                <img :src="dia.day.condition.icon" class="card-image-top"> {{ dia.day.condition.text }}: {{
                  dia.day.maxtemp_c
                }}°C
              </li>
            </TransitionGroup>
          </ul>
        </div>
      </div>
    </section>


    <section class="mt-5">
      <h3>Estadísticas de la semana</h3>
      <!-- Temperatura mínima, máxima y promedio de la semana -->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Temperatura Mínima</th>
            <th scope="col">Temperatura Máxima</th>
            <th scope="col">Promedio Semanal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <!-- Temperaturas de la ciudad se actualizarán dinámicamente -->
            <td id="minTemp">{{ estadisticas.minimaSemanal }}°C</td>
            <td id="maxTemp">{{ estadisticas.maximaSemanal }}°C</td>
            <td id="avTemp">{{ estadisticas.promedioSemanal }}°C</td>
          </tr>
        </tbody>
      </table>

      <!-- Mensaje de resumen -->
      <div class="border border-info rounded p-4" id="resumen">
        <p>Semana con clima mayormente {{ estadisticas.estadoPredominante }}. La temperatura máxima de la semana fue
          {{ estadisticas.maximaSemanal }}°C, la mínima de
          {{ estadisticas.minimaSemanal }}°C.</p>
      </div>

      <table class="table">
        <thead>
          <tr id="titulosEstadisticas">
            <!-- contenido se generará dinámicamente -->
            <th v-for="(conteo, estadistica) in estadisticas.conteoEstados" :key="estadistica">{{ estadistica }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr id="filaEstadistica">
            <!-- contenido se generará dinámicamente -->
            <td v-for="(conteo, estadistica) in estadisticas.conteoEstados" :key="estadistica">{{ conteo }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
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