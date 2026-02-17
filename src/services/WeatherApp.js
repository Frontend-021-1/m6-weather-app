const API_KEY = 'a7eeff849cc84732968174325261401';

const formatFloatNumber = (num) => {
  return num.toLocaleString('es-CL');
};

export default class WeatherApp {
  weather = []; // clima de las ciudades
  cityForecast = []; // pronostico de 7 dias de UNA ciudad
  #url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&aqi=no&lang=es`;
  #urlForecast = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=7&aqi=no&alerts=no&lang=es`;

  // Obtener datos del clima actual de las 5 ciudades
  async fetchWeather(lugares) {
    try {
      const promises = lugares.map(async (lugar) => {
        const response = await fetch(`${this.#url}&q=${lugar}`);
        return await response.json();
      });

      this.weather = await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchWeatherByName(lugar) {
    try {
      const response = await fetch(`${this.#urlForecast}&q=${lugar}`);
      if (!response.ok) {
        throw new Error('No se pudo obtener el clima de la ciudad');
      }

      this.cityForecast = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  // Método que ejecuta petición a api y rellena el dom con respuesta de la api
  async renderWeather(lugares, container) {
    // Mostrar spinner de carga por cada lugar
    lugares.forEach((ciudad) => {
      container.innerHTML += `
        <div class="col">
          <div class="card h-100 text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      `;
    });
    try {
      await this.fetchWeather(lugares);
      container.innerHTML = '';

      // Mostrar lugares en el DOM
      this.weather.forEach((ciudad) => {
        // Funcion que inserta una card al DOM
        this.insertCardToDom(ciudad, container);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async renderForecast(lugar, container) {
    // Mostrar spinner de carga
    container.innerHTML = `
    <div class="d-flex justify-content-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
    `;
    try {
      await this.fetchWeatherByName(lugar);
      container.innerHTML = '';
      this.mostrarLugar(container, this.cityForecast);
    } catch (error) {
      console.error(error);
    }
  }

  definirEstadoPredominante = (conteoEstados) => {
    let estadoPredominante;
    // Definimos una variable para almacenar el maximo de dias (y poder comparar los otros estados)
    let maxDias = 0;

    // Recorremos el objeto de conteoEstados, devuelve un array de pares clave-valor
    Object.entries(conteoEstados).forEach(([estado, dias]) => {
      console.log(`Estado: ${estado}, Dias: ${dias}`);
      // Si el numero de dias es mayor que 'maximo', actualizamos el maximo y el estado predominante
      if (dias > maxDias) {
        maxDias = dias;
        estadoPredominante = estado;
      } else if (dias === maxDias) {
        // Si hay empate, el estado predominante es 'variado'
        estadoPredominante = 'variado';
      }
    });

    return estadoPredominante;
  };

  estadisticasPronostico = () => {
    // 5.2.1 Obtener temperatura mínima semanal
    const temperaturasMinimas = this.cityForecast.forecast.forecastday.map(
      (dia) => dia.day.mintemp_c,
    );
    // console.log(temperaturasMinimas);
    const minimaSemanal = Math.min(...temperaturasMinimas);
    console.log(minimaSemanal);

    // 5.2.2 Obtener temperatura máxima semanal
    const temperaturasMaximas = this.cityForecast.forecast.forecastday.map(
      (dia) => dia.day.maxtemp_c,
    );
    const maximaSemanal = Math.max(...temperaturasMaximas);

    // 5.2.3 Calcular promedio de temperaturas semanal
    const sumaTemperaturasMaximas = temperaturasMaximas.reduce(
      (acumulador, actual) => acumulador + actual,
      0,
    );

    // promedio = sumaElementos / cantidadElementos
    let promedioSemanal = parseFloat(
      (sumaTemperaturasMaximas / temperaturasMaximas.length).toFixed(2),
    );

    // 5.2.4 Calcular conteo de días por estado del clima
    const estadosSemanal = this.cityForecast.forecast.forecastday.map(
      (dia) => dia.day.condition.text,
    );

    const estadosUnicos = [...new Set(estadosSemanal)];

    const conteoEstados = {};

    estadosUnicos.forEach((estado) => {
      conteoEstados[estado] = this.cityForecast.forecast.forecastday.filter(
        (dia) => dia.day.condition.text === estado,
      ).length;
    });

    // 5.2.5 Determinar estado predominante (el más frecuente) de la semana
    const estadoPredominante = this.definirEstadoPredominante(conteoEstados);

    return {
      minimaSemanal,
      maximaSemanal,
      promedioSemanal: formatFloatNumber(promedioSemanal),
      conteoEstados,
      estadoPredominante,
    };
  };
}
