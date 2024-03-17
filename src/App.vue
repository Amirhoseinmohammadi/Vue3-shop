<script setup>
import HeaderPage from "./components/main/HeaderPage.vue";
import FooterPage from "./components/main/FooterPage.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <HeaderPage />
    <main class="w-100 h-100">
      <router-view></router-view>
    </main>
    <FooterPage />
  </div>
</template>

<style scoped></style>
