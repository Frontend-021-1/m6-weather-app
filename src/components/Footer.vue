<script setup>

</script>

<template>
  <footer class="py-3 my-4 footer text-center">
    <ul class="nav border-bottom pb-3 mb-3 navigation">
      <li class="nav-item navigation__item">
        <RouterLink :to="{ name: 'Home' }" class="px-2">Inicio</RouterLink>
      </li>
    </ul>
    <p class="text-center text-body-secondary">© 2025 Bootcamp Front End</p>
  </footer>
</template>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.footer {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.footer .navigation {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer .navigation__item {
  color: #001d3d;
}
</style>