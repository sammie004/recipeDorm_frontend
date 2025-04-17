<template>
  <!-- navbar for smaller screens -->
  <button class="sec-toggle-btn" @click="toggleSidebar">
    <i :class="isCollapsed ? 'bx bx-menu' : 'bx bx-x'"></i>
  </button>

  <div :class="['sidebar', { collapsed: isCollapsed, open: !isCollapsed }]">
    <!-- Toggle Button -->
    <button class="toggle-btn" @click="toggleSidebar">
      <i :class="isCollapsed ? 'bx bx-menu' : 'bx bx-x'"></i>
    </button>
    <!-- Logo (optional, currently commented out) -->
    <!-- <div class="logo" v-if="!isCollapsed">RecipeDorm</div> -->

    <!-- Home Button -->
    <button @click="GoHome" :title="'home'" class="home">
      <i class="bx bxs-home"></i>
      <span v-if="!isCollapsed">Home</span>
    </button>

    <!-- Navigation Buttons -->
    <div class="nav-buttons">
      <div class="nav-links">
        <button class="search-btn" @click="goToSearch">
          <i class="bx bx-search"></i>
          <span v-if="!isCollapsed">Search Recipes</span>
        </button>

        <button @click="bookmarkRecipes" :title="'Bookmark'">
          <i class="bx bxs-bookmark"></i>
          <span v-if="!isCollapsed">Saved Recipes</span>
        </button>
        <button @click="myRecipes" :title="'myRecipes'">
          <i class="bx bxs-bowl-hot"></i>
          <span v-if="!isCollapsed">My Recipes</span>
        </button>
        <button @click="settings" :title="'settings'">
          <i class="bx bxs-cog"></i>
          <span v-if="!isCollapsed">Settings</span>
        </button>
        <button @click="logout" :title="'Logout'" class="logout">
          <i class="bx bx-log-out"></i>
          <span v-if="!isCollapsed">Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isCollapsed = ref(localStorage.getItem('sidebarCollapsed') === 'true')

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem('sidebarCollapsed', isCollapsed.value)
}

const goToSearch = () => {
  router.push('/search')
}

const bookmarkRecipes = () => {
  router.push('/bookmark')
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
  align-items: flex-start;
  transition: width 0.3s ease-in-out;
  z-index: 1;
  box-shadow: 0px 12px 20px black;
}

.sidebar.collapsed {
  width: 80px;
}

/* Always show the toggle button */
.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 20px;
}
.sec-toggle-btn {
  position: absolute;
  top: 1%;
  right: 1%;
  background: transparent;
  border: none;
  color: #3b2f2f;
  font-size: 1.5rem;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
}

/* Home Button */
.home {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  transition: 0.3s background;
  margin-bottom: 30px;
}

.home:hover {
  background: rgba(255, 255, 255, 0.2);
}

.home i {
  margin-right: 15px;
}

/* Navigation Buttons */
.nav-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
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
  align-items: center;
  transition: 0.3s background;
  margin-bottom: 30px;
}

.nav-links button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-links span {
  margin-left: 10px;
}

.logout {
  margin-top: 60px;
}

/* Hide sidebar on small screens */
@media (max-width: 600px) {
  .toggle-btn {
    display: none;
  }
  .sidebar {
    transform: translateX(-100%);
    width: 80%;
  }
  .sidebar.open {
    transform: translateX(0);
  }
}
@media (max-width: 600px) {
  .sec-toggle-btn {
    display: flex;
  }
}
</style>
