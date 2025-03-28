<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <!-- Toggle Button -->
    <button class="toggle-btn" @click="toggleSidebar">
      <i :class="isCollapsed ? 'bx bx-menu' : 'bx bx-x'"></i>
    </button>

    <!-- Logo -->
    <!-- <div class="logo" v-if="!isCollapsed">RecipeDorm</div> -->

    <!-- Search Button -->
    <button class="search-btn" @click="goToSearch">
      <i class="bx bx-search"></i>
      <span v-if="!isCollapsed">Search Recipes</span>
    </button>

    <!-- Navigation Buttons -->
    <div class="nav-buttons">
      <button class="add-recipe-btn" @click="addRecipe" v-if="!isCollapsed">
        + Add Recipe
      </button>

      <div class="nav-links">
        <button @click="GoHome" :title="'home'">
          <i class="bx bxs-home"></i>
          <span v-if="!isCollapsed">Home</span>
        </button>
        <button @click="bookmarkRecipes" :title="'Bookmark'">
          <i class="bx bxs-bookmark"></i>
          <span v-if="!isCollapsed">Saved Recipes</span>
        </button>
        <button @click="myRecipes" :title="'myRecipes'">
          <i class="bx bxs-folder"></i>
          <span v-if="!isCollapsed">My Recipes</span>
        </button>
        <button @click="settings" :title="'settings'">
          <i class="bx bxs-cog"></i> <span v-if="!isCollapsed">Settings</span>
        </button>
        <button @click="logout" :title="'Logout'">
          <i class="bx bx-log-out"></i> <span v-if="!isCollapsed">Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const goToSearch = () => {
  router.push('/search')
}

const addRecipe = () => {
  router.push('/addRecipes')
}

const bookmarkRecipes = () => {
  router.push('/bookmarks')
}

const myRecipes = () => {
  router.push('/myRecipes')
}

const settings = () => {
  router.push('/settings')
}
const GoHome = () => {
  router.push('/home')
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 250px;
  background: linear-gradient(to bottom, #3b2f2f, #705d5d);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease-in-out;
  z-index: 1;
  box-shadow: 0px 12px 20px black;
}

.sidebar.collapsed {
  width: 80px;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.search-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  float: left;
  padding: 10px;
  width: 100%;
  transition: 0.3s background;
  margin-bottom: 30px;
}

.search-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.search-btn i {
  margin-right: 10px;
}

.nav-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  align-items: center;
  float: left;
}

.nav-links button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px;
  text-align: left;
  width: 100%;
  display: flex;
  align-items: left;
  justify-content: left;
  float: left;
  margin-bottom: 30px;
  transition: 0.3s background;
}

.nav-links button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-links span {
  margin-left: 10px;
}

.add-recipe-btn {
  background: white;
  padding: 10px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  float: left;
  font-weight: bold;
  color: #705d5d;
}
</style>
