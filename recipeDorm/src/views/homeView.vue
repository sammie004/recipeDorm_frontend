<template>
  <p class="user">
    Welcome, <span class="username">{{ username }}</span>
  </p>

  <!-- Filter Section -->
  <div class="filter" @click.stop>
    <!-- Cuisine Filter -->
    <div class="filter-main" @click.stop="toggleDropdown('cuisine')">
      Filter by Cuisine <i class="bx bxs-down-arrow"></i>
      <ul v-if="activeDropdown === 'cuisine'" class="dropdown">
        <li @click.stop="selectFilter('cuisine', 'French')">French</li>
        <li @click.stop="selectFilter('cuisine', 'Spanish')">Spanish</li>
        <li @click.stop="selectFilter('cuisine', 'Italian')">Italian</li>
        <li @click.stop="selectFilter('cuisine', 'Nigerian')">Nigerian</li>
      </ul>
    </div>

    <!-- Diet Filter -->
    <div class="filter-main" @click.stop="toggleDropdown('diet')">
      Filter by Diet <i class="bx bxs-down-arrow"></i>
      <ul v-if="activeDropdown === 'diet'" class="dropdown">
        <li @click.stop="selectFilter('diet', 'Vegetarian')">Vegetarian</li>
        <li @click.stop="selectFilter('diet', 'Vegan')">Vegan</li>
        <li @click.stop="selectFilter('diet', 'Gluten-Free')">Gluten-Free</li>
      </ul>
    </div>

    <!-- Trending Filter -->
    <div class="filter-main" @click.stop="toggleDropdown('trending')">
      Trending <i class="bx bxs-down-arrow"></i>
      <ul v-if="activeDropdown === 'trending'" class="dropdown">
        <li @click.stop="selectFilter('trending', 'Most Popular')">
          Most Popular
        </li>
        <li @click.stop="selectFilter('trending', 'Top Rated')">Top Rated</li>
      </ul>
    </div>

    <!-- Interacted With Filter -->
    <div class="filter-main" @click.stop="toggleDropdown('interacted')">
      Interacted With <i class="bx bxs-down-arrow"></i>
      <ul v-if="activeDropdown === 'interacted'" class="dropdown">
        <li @click.stop="selectFilter('interacted', 'Saved')">Saved</li>
        <li @click.stop="selectFilter('interacted', 'Recently Viewed')">
          Recently Viewed
        </li>
      </ul>
    </div>
  </div>

  <!-- Recipe List -->
  <div class="recipe-container">
    <template v-if="filteredRecipes.length > 0">
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
import { ref, onMounted, onUnmounted } from 'vue'

const router = useRouter()
const username = ref(localStorage.getItem('username') || 'Guest')
const recipes = ref([])
const filteredRecipes = ref([])
const activeDropdown = ref(null)
const selectedFilters = ref({
  cuisine: null,
  diet: null,
  trending: null,
  interacted: null
})

// Fetch recipes from TheMealDB API
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
      diet: meal.strCategory, // using category as a placeholder for diet
      trending: Math.random() > 0.5 ? 'Most Popular' : 'Top Rated', // mock data
      interacted: Math.random() > 0.5 ? 'Saved' : 'Recently Viewed' // mock data
    }))
    filteredRecipes.value = [...recipes.value]
  } catch (error) {
    console.error('Error fetching recipes:', error)
  }
}

// Toggle dropdowns
const toggleDropdown = dropdown => {
  activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown
}

// Select filter and apply filters
const selectFilter = (type, value) => {
  selectedFilters.value[type] = value
  activeDropdown.value = null // Close dropdown after selection
  applyFilters()
}

// Apply filters based on selected criteria
const applyFilters = () => {
  filteredRecipes.value = recipes.value.filter(recipe => {
    return (
      (!selectedFilters.value.cuisine ||
        recipe.cuisine === selectedFilters.value.cuisine) &&
      (!selectedFilters.value.diet ||
        recipe.diet === selectedFilters.value.diet) &&
      (!selectedFilters.value.trending ||
        recipe.trending === selectedFilters.value.trending) &&
      (!selectedFilters.value.interacted ||
        recipe.interacted === selectedFilters.value.interacted)
    )
  })
}

// Navigate to details page
const goToDetails = id => {
  router.push({ name: 'RecipeDetails', params: { id } })
}

// Close dropdown if clicking outside the filter area
const closeDropdown = event => {
  if (!event.target.closest('.filter')) {
    activeDropdown.value = null
  }
}
document.addEventListener('click', closeDropdown)

onMounted(() => {
  fetchRecipes()
})
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
/* User Welcome Text */
.user {
  text-align: center;
  font-size: 1.5rem;
  color: black;
  margin-top: 25px;
  margin-bottom: 60px;
  position: absolute;
  top: 0;
  left: 15%;
}

/* Filter Section */
.filter {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  position: absolute;
  left: 15%;
  top: 15%;
}

.filter-main {
  color: white;
  padding: 10px;
  width: 180px;
  margin-right: 20px;
  border-radius: 28px;
  transition: 0.5s ease;
  background: hsl(0, 11%, 25%);
  cursor: pointer;
  text-align: center;
  position: relative;
}
.filter-main:hover {
  border: 1px solid black;
  color: black;
  background-color: white;
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
  left: 40%;
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
