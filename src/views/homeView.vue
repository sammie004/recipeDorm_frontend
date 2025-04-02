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
  left: 12.5%;
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
  left: 12.5%;
  top: 20%;
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
  left: 37%;
  transform: translateX(-40%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 65px;
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

/* Responsive adjustments */
@media (max-width: 900px) {
  .recipe-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .recipe-container {
    grid-template-columns: 1fr;
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
