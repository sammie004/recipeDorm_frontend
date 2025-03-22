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

    <!-- Navigation Buttons -->
    <div class="nav-buttons">
      <button class="add-recipe-btn" @click="addRecipe">+ Add Recipe</button>
      <div class="profile" @click="logout">
        <img src="@/assets/lapo.jpg" alt="Profile" class="profile-pic" />
      </div>
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
  background: linear-gradient(to right, #3b2f2f, #705d5d);
  padding: 12px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  flex-wrap: wrap;
}

/* Logo Styling */
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'poppins', Courier, monospace;
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
  flex-grow: 1;
  max-width: 400px;
}

.search-bar input {
  padding: 10px;
  border: none;
  background: transparent;
  outline: none;
  color: white;
  font-size: 1rem;
  width: 100%;
}

.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-bar button {
  background-color: transparent;
  border: none;
  color: white;
  display: flex;
  transition: 0.5s ease;
  cursor: pointer;
}

.search-bar button:hover {
  transform: scale(1.2);
}

/* Navigation Buttons */
.nav-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Add Recipe Button */
.add-recipe-btn {
  background: white;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: 0.3s ease-in-out;
  color: #705d5d;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.add-recipe-btn:hover {
  background: #ab9090;
  color: white;
  transform: scale(1.05);
}

/* Profile Picture */
.profile {
  width: 40px;
  height: 40px;
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

/* Responsive Design */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: center;
    padding: 8px;
  }

  .search-bar {
    width: 100%;
    margin: 10px 0;
  }

  .nav-buttons {
    flex-direction: column;
    width: 100%;
  }

  .add-recipe-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
