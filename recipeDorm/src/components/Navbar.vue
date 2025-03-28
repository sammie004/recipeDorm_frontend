<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <!-- Toggle Button -->
    <button class="toggle-btn" @click="toggleSidebar">
      <i :class="isCollapsed ? 'bx bx-menu' : 'bx bx-x'"></i>
    </button>

    <!-- Logo -->
    <div class="logo" v-if="!isCollapsed">RecipeDorm</div>

    <!-- Search Bar -->
    <div class="search-bar" v-if="!isCollapsed">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search recipes..."
      />
      <button @click="searchRecipes"><i class="bx bx-search bx-xs"></i></button>
    </div>

    <!-- Navigation Buttons -->
    <div class="nav-buttons">
      <button class="add-recipe-btn" @click="addRecipe" v-if="!isCollapsed">
        + Add Recipe
      </button>

      <div class="nav-links">
        <button @click="bookmarkRecipes" :title="'Bookmark'">
          <i class="bx bxs-bookmark"></i>
          <span v-if="!isCollapsed">saved Recipes</span>
        </button>
        <button @click="myRecipes" :title="'myRecipes'">
          <i class='bx bxs-folder'></i> <span v-if="!isCollapsed">My recipes</span>
        </button>
        <button @click="settings" :title="'settings'">
          <i class="bx bxs-cog"></i> <span v-if="!isCollapsed">settings</span>
        </button>
        <button @click="logout" :title="'Logout'">
          <i class="bx bx-log-out"></i> <span v-if="!isCollapsed">Logout</span>
        </button>
      </div>

      <!-- Profile Section -->
      <!-- <div class="profile-wrapper">
        <div class="profile" @click="toggleDropdown">
           <img src="@/assets/lapo.jpg" alt="Profile" class="profile-pic" /> -->
      <!-- </div>  -->

      <!-- <div v-if="showDropdown" class="dropdown-menu">
          <ul>
            <li @click="bookmarkRecipes">📌 Bookmark</li>
            <li @click="likedRecipes">❤️ Liked</li>
            <li @click="logout">🚪 Logout</li>
          </ul>
        </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const showDropdown = ref(false)
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const searchRecipes = () => {
  console.log('Searching for:', searchQuery.value)
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
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  router.push('/login')
}

const toggleDropdown = event => {
  showDropdown.value = !showDropdown.value
  event.stopPropagation()
}

const closeDropdown = () => {
  showDropdown.value = false
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
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

.search-bar {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  width: 100%;
  margin-bottom: 50px;
}

.search-bar input {
  border: none;
  background: transparent;
  outline: none;
  color: white;
  width: 100%;
}

.nav-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  align-items: center;
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
  justify-content: center;
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
  font-weight: bold;
  color: #705d5d;
}

.profile-wrapper {
  position: relative;
  cursor: pointer;
  margin-top: auto;
}

.profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-menu {
  position: absolute;
  left: 100%;
  top: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 150px;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background: #705d5d;
  color: white;
}
</style>
