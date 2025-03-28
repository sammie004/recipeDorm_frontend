<template>
  <div>
    <Navbar v-if="$route.path === '/home'" />
    <!-- <Navbar /> create new nav components -->
    <RouterView />
    <addrecipesNav v-if="$route.path === '/addRecipes'" />
    <!-- <cards v-if="$route.path === '/home'" /> -->
  </div>
</template>

<script setup>
import cards from '@/components/cards.vue'
import Navbar from '@/components/Navbar.vue'
import addrecipesNav from './components/addrecipesNav.vue'
import { RouterView } from 'vue-router' // Ensure this import
</script>
<style>
body {
  background-color: white;
}
</style>
