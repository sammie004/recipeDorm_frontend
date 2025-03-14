<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="logo">RecipeDorm</div>

    <!-- Search Bar -->
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search recipes..."
      />
      <button @click="searchRecipes"><i class="bx bx-search bx-xs"></i></button>
    </div>

    <!-- Add Recipe Button -->
    <button class="add-recipe-btn" @click="addRecipe">+ Add Recipe</button>

    <!-- Profile Icon -->
    <div class="profile" @click="logout">
      <img src="@/assets/lapo.jpg" alt="Profile" class="profile-pic" />
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const searchQuery = ref('')

const searchRecipes = () => {
  console.log('Searching for:', searchQuery.value)
}

const addRecipe = () => {
  console.log('Navigating to add recipe page')
  router.push('/addRecipes')
}

const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
/* Navbar Container */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    135deg,
    #ff7e5f,
    #feb47b
  ); /* Beautiful gradient */
  padding: 12px 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

/* Logo Styling */
.logo {
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Search Bar */
.search-bar {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.search-bar input {
  padding: 10px;
  border: none;
  background: transparent;
  outline: none;
  color: white;
  font-size: 1rem;
  width: 300px;
  height: 12px;
}

.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-bar button {
  background-color: transparent;
  border: none;
  color: white;
  /* Center the icon */
  display: flex;
  transition: 0.5s ease;
}

.search-bar button:hover {
  transform: scale(1.5);
  cursor: pointer;
}

/* Add Recipe Button */
.add-recipe-btn {
  background: white;
  padding: 10px 18px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: 0.3s ease-in-out;
  color: #ff7e5f;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.add-recipe-btn:hover {
  background: #ff7e5f;
  color: white;
  transform: scale(1.05);
}

/* Profile Picture */
.profile {
  width: 45px;
  height: 45px;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s ease-in-out;
}

.profile-pic:hover {
  transform: scale(1.1);
}
</style>
