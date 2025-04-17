<template>
  <p class="user">
    Welcome Back, <span class="username">{{ username }}</span>
  </p>

  <!-- Filter Section -->
  <div class="filter" @click.stop>
    <!-- Cuisine Filter -->
    <div class="filter-main" @click.stop="toggleDropdown('cuisine')">
      <p>Filter by Cuisine</p>
      <i class="bx bxs-down-arrow arrow"></i>
      <ul v-if="activeDropdown === 'cuisine'" class="dropdown">
        <li @click.stop="selectFilter('cuisine', 'French')">French</li>
        <li @click.stop="selectFilter('cuisine', 'Spanish')">Spanish</li>
        <li @click.stop="selectFilter('cuisine', 'Italian')">Italian</li>
        <li @click.stop="selectFilter('cuisine', 'Nigerian')">Nigerian</li>
      </ul>
    </div>

    <!-- Diet Filter -->
    <div class="filter-main" @click.stop="toggleDropdown('diet')">
      <p>Filter by Diet</p>
      <i class="bx bxs-down-arrow arrow"></i>
      <ul v-if="activeDropdown === 'diet'" class="dropdown">
        <li @click.stop="selectFilter('diet', 'Vegetarian')">Vegetarian</li>
        <li @click.stop="selectFilter('diet', 'Vegan')">Vegan</li>
        <li @click.stop="selectFilter('diet', 'Gluten-Free')">Gluten-Free</li>
      </ul>
    </div>
  </div>

  <!-- Recipe List -->
  <div class="recipe-container">
    <template v-if="loading" class="main-loading">
      <div class="loader"></div>
    </template>
    <template v-else-if="filteredRecipes.length > 0">
      <RecipeCard
        v-for="(recipe, index) in filteredRecipes"
        :key="index"
        :id="recipe.idMeal"
        :title="recipe.title"
        :description="recipe.description"
        :image="recipe.image"
        @click="goToDetails(recipe.idMeal)"
      />
    </template>
    <p v-else class="empty-message">
      No recipes found. Try adjusting the filters.
    </p>
  </div>
</template>

<script setup>
import RecipeCard from '@/components/cards.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const username = ref(localStorage.getItem('username') || 'Guest')
const recipes = ref([])
const filteredRecipes = ref([])
const activeDropdown = ref(null)
const selectedFilters = ref({
  cuisine: null,
  diet: null
})
const loading = ref(true) // Loader state

const fetchRecipes = async () => {
  try {
    const res = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    )
    const data = await res.json()
    recipes.value = data.meals.map(meal => ({
      idMeal: meal.idMeal,
      title: meal.strMeal,
      description: meal.strInstructions.substring(0, 100) + '...',
      image: meal.strMealThumb,
      cuisine: meal.strArea,
      diet: meal.strCategory
    }))
    filteredRecipes.value = [...recipes.value]
  } catch (error) {
    console.error('Error fetching recipes:', error)
  } finally {
    loading.value = false // Hide loader after fetching
  }
}

const toggleDropdown = dropdown => {
  activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown
}

const selectFilter = (type, value) => {
  selectedFilters.value[type] = value
  activeDropdown.value = null
  applyFilters()
}

const applyFilters = () => {
  filteredRecipes.value = recipes.value.filter(recipe => {
    return (
      (!selectedFilters.value.cuisine ||
        recipe.cuisine === selectedFilters.value.cuisine) &&
      (!selectedFilters.value.diet ||
        recipe.diet === selectedFilters.value.diet)
    )
  })
}

const goToDetails = id => {
  router.push({ name: 'RecipeDetails', params: { id } })
}

onMounted(() => {
  fetchRecipes()
})
</script>

<style scoped>
/* User Welcome Text */

.filter-main {
  display: flex;
  justify-content: space-between;
  padding: 5px;
}

.filter-main p {
  margin: 5px;
}

.arrow {
  margin-top: 10px;
  padding-right: 8px;
}

.user {
  text-align: left;
  font-size: 2rem;
  color: black;
  margin-top: 15px;
  position: absolute;
  top: 0;
  left: 13.5%;
}

.username {
  font-weight: 500;
  font-size: 2rem;
}

/* Filter Section */
.filter {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  position: absolute;
  left: 13.5%;
  top: 15%;
}

.filter-main {
  color: white;
  width: 180px;
  margin-right: 20px;
  border-radius: 10px;
  border: 2px solid hsl(0, 11%, 25%);
  transition: 0.5s ease;
  color: hsl(0, 11%, 25%);
  cursor: pointer;
  position: relative;
}

/* Dropdown Styles */
.dropdown {
  list-style: none;
  position: absolute;
  top: 110%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  z-index: 10;
  cursor: pointer;
  padding: 0;
  margin: 0;
}
.dropdown li {
  padding: 10px;
  text-align: left;
}
.dropdown li:hover {
  background: #f0f0f0;
}

/* Recipe Container: Fixed position & centered; forcing 3 cards per row on desktop */
.recipe-container {
  width: 60%;
  position: absolute;
  top: 200px; /* Adjust as needed for vertical positioning */
  left: 38%;
  transform: translateX(-40%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  min-height: 200px; /* Fixed minimum height */
  align-items: start;
}

/* Empty message when no recipes found */
.empty-message {
  grid-column: 1 / -1;
  text-align: center;
  font-size: 1.2rem;
  color: gray;
  margin-top: 20px;
}
/* Loader Styling */
.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #705d5d;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: auto;
  /* margin-left: 30%; */
  position: absolute;
  left: 60%;
  top: 55%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Adjust sidebar behavior on small screens */
@media (max-width: 600px) {
  .sidebar {
    margin-top: 30%;
    transform: translateX(-100%);
    width: 280px; /* Ensure it's wide enough when open */
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sec-toggle-btn {
    display: flex;
    top: 15px;
    right: 15px;
    font-size: 1.8rem;
    width: 45px;
    height: 45px;
  }
  .user {
    font-size: 1.5rem;
    top: 40px;
    margin-bottom: 30px;
    left: 5%;
  }
}

/* Adjust recipe grid layout */
@media (max-width: 900px) {
  .recipe-container {
    width: 80%;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    margin-left: 6%;
  }
  .filter {
    margin-top: 20px;
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    gap: 12px;
    width: 380px;
    left: 15%;
    font-size: 15px;
    top: 8%;
  }

  .filter-main {
    width: 90%;
    text-align: center;
    padding: 3px;
  }
}

@media (max-width: 600px) {
  .recipe-container {
    width: 90%;
    grid-template-columns: 1fr;
    gap: 30px;
    top: 220px; /* Move up slightly for better positioning */
    margin-left: 15%;
  }

  .user {
    font-size: 1.5rem;
    top: 40px;
    margin-bottom: 30px;
    left: 5%;
  }

  .filter {
    margin-top: 20px;
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    gap: 12px;
    width: 380px;
    left: 4%;
    font-size: 15px;
    top: 15%;
  }

  .filter-main {
    width: 90%;
    text-align: center;
    padding: 3px;
  }
  .empty-message {
    grid-column: 1 / -1;
    text-align: center;
    font-size: 1.2rem;
    color: gray;
    margin-top: 20px;
    margin-right: 30%;
  }
}

/* Adjust loader positioning */
@media (max-width: 600px) {
  .loader {
    left: 35%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

<style>
body {
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}
</style>
