<template>
  <div>
    <navbar />
    <RouterView />
  </div>
</template>

<script setup>
import navbar from '@/components/navbar.vue'
import { RouterView } from 'vue-router' // Ensure this import
</script>
<style></style>
