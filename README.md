# m6-proyecto-weather-app

- La app pasa a ser una SPA con Vue.js
- La navegación entre Home y Detalle debe hacerse sin recargar la página -> Usar Vue Router
- Incluir al menos una interacción con formularios usando v-model (por ejemplo, buscar un lugar por nombre o cambiar de unidad)

## Requisitos funcionales mínimos

- [x] Home:
  - [x] Mostrar un listado de lugares con su información básica de clima
  - [x] Permitir seleccionar un lugar (click en card, botón o enlace) para ver su detalle
- [x] Detalle:
  - [x] Mostrar información del lugar seleccionado (nombre, clima actual)
  - [x] Mostrar el pronóstico de varios días
  - [x] Mostrar las estadísticas de la semana calculadas en módulos anteriores (min, max, promedio, etc.)
- [x] Interacción:
  - [x] Incluir al menos una interacción con formularios usando v-model (por ejemplo, buscar un lugar por nombre o cambiar de unidad)
- [x] Navegación:
  - [x] La app debe tener rutas diferenciadas para Home y Detalle, manejadas por Vue Router
  - [x] Debe ser posible volver desde el Detalle al Home (link, botón, etc.)

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```
