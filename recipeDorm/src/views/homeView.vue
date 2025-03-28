<template>
  <p class="user">Welcome, <span class="username"></span></p>

  <div class="recipe-container">
    <RecipeCard
      v-for="(recipe, index) in recipes"
      :key="index"
      :id="recipe.idMeal"
      :title="recipe.title"
      :description="recipe.description"
      :image="recipe.image"
      @click="goToDetails(recipe.idMeal)"
    />
  </div>
</template>

<script setup>
import RecipeCard from '@/components/cards.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const recipes = ref([])

// Fetch recipes from TheMealDB API
const fetchRecipes = async () => {
  try {
    const res = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    )
    const data = await res.json()

    // Map response to match component props
    recipes.value = data.meals.map(meal => ({
      idMeal: meal.idMeal,
      title: meal.strMeal,
      description: meal.strInstructions.substring(0, 100) + '...', // Short description
      image: meal.strMealThumb
    }))
  } catch (error) {
    console.error('Error fetching recipes:', error)
  }
}

// Navigate to details page (modify route as needed)
const goToDetails = id => {
  router.push({ name: 'RecipeDetails', params: { id } })
}

onMounted(() => {
  fetchRecipes()

  const username = document.querySelector('.username')
  const user = localStorage.getItem('username') || 'Guest'
  username.innerHTML = user
})
</script>

<style scoped>
.recipe-container {
  width: 100%;
  height: auto; /* Prevents excessive height */
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Responsive columns */
  gap: 15px; /* Controls spacing between cards */
  justify-content: center;
  position: relative;
  top: -5%;
  left: 22%;
}
.user {
  position: relative;
  left: 19%;
  font-size: 1.5rem;
  color: black;
  margin-bottom: 60px;
}
.header {
  position: absolute;
  top: 20%;
  left: 35%;
  font-size: 30px;
}
/* Responsive adjustments */
@media (max-width: 1200px) {
  .recipe-container {
    grid-template-columns: repeat(3, 300px);
  }
}

@media (max-width: 900px) {
  .recipe-container {
    grid-template-columns: repeat(2, 300px);
    position: relative;
    left: 10%;
  }
}

@media (max-width: 600px) {
  .recipe-container {
    grid-template-columns: 300px;
    position: relative;
    left: 14%;
    top: 20%;
  }
}
</style>

<!-- Global style (in Home.vue or your global CSS file) -->
<style>
body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
</style>
