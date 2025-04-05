<template>
  <AddrecipesNav :username="username" />
  <Navbar />
  <div class="my-recipes-page">
    <!-- Header Section -->
    <header class="header">
      <h1 class="title">My Recipes</h1>
      <button @click="goToAddRecipe" class="add-button">+ Add Recipe</button>
    </header>

    <!-- Loader -->
    <div v-if="loading" class="loader"></div>

    <!-- Recipe List -->
    <div v-if="recipes.length" class="recipe-list">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.recipeId"
        :id="recipe.recipeId"
        :title="
          recipe.title.length > 30
            ? recipe.title.substring(0, 30) + '...'
            : recipe.title
        "
        :description="recipe.description"
        :image="recipe.imageUrl"
        @click="goToDetails(recipe.recipeId)"
      />
    </div>
    <!-- Empty State -->
    <p v-else class="empty-message">You haven't added any recipes yet.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import RecipeCard from '@/components/cards.vue'

const recipes = ref([])
const loading = ref(true)
const router = useRouter()

const goToAddRecipe = () => {
  router.push('/addRecipes')
}

const goToDetails = id => {
  router.push({ name: 'RecipeDetails', params: { id } })
}

const fetchRecipes = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(
      'https://recipedormapi20250315070938.azurewebsites.net/api/Recipes/get-my-recipes?page=1',
      {
        headers: {
          Authorization: ` Bearer ${token}`
        }
      }
    )
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    recipes.value = data.data?.recipes || []
    recipes.value = recipes.value.map(r => ({
      ...r,
      isLiked: false,
      isBookmarked: false
    }))
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

// const toggleBookmark = recipe => {
//   recipe.isBookmarked = !recipe.isBookmarked
// }

// const toggleLike = recipe => {
//   recipe.isLiked = !recipe.isLiked
// }

// const shortDescription = description => {
//   if (!description) return ''
//   const words = description.split(' ')
//   return words.length <= 5 ? description : words.slice(0, 5).join(' ') + '...'
// }

onMounted(() => {
  fetchRecipes()
})
</script>

<style scoped>
/* Page Layout */
.my-recipes-page {
  padding: 20px;
}

/* Header */
.header {
  display: flex;
  text-align: center;
  margin-left: 150px;
  justify-content: space-between; /* Pushes items to opposite sides */
  align-items: center; /* Vertically aligns items */
  margin-bottom: 40px;
  margin-top: -250px; /* Space between header and recipe list */
  width: 100%;
  padding: auto;
  gap: 400px;
}

/* Title (Left Side) */
.title {
  font-size: 2rem;
  color: #4c4242;
  margin: 0;
  min-width: 150px; /* Ensures title does not shrink too much */
}

/* Add Recipe Button (Right Side) */
.add-button {
  padding: 10px 20px;
  background-color: #4c4242;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  min-width: 120px; /* Ensures button does not shrink too much */
}

.add-button:hover {
  background-color: #6d5c5c;
}
/* Recipe List */
.recipe-list {
  width: 60%;
  position: absolute;
  top: 200px; /* Adjust as needed for vertical positioning */
  left: 40%;
  top: 50%;
  transform: translateX(-40%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 65px;
  min-height: 200px; /* Fixed minimum height */
  align-items: start;
}

/* Recipe Card (using provided card style) */
.recipe-card {
  position: relative;
  background: hsl(0, 17%, 90%);
  border-radius: 12px;
  overflow: hidden;
  width: 300px; /* Consistent width */
  height: 300px; /* Consistent height */
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.3rem;
  cursor: pointer;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Recipe Image */
.recipe-image {
  width: 100%;
  height: 100px; /* Fixed image height */
  object-fit: cover;
  transition: transform 0.5s;
}

.recipe-image:hover {
  transform: scale(1.2);
}

/* Recipe Content */
.recipe-content {
  padding: 15px;
  text-align: center;
  flex-grow: 1;
}

/* Recipe Title */
.recipe-title {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

/* Recipe Description */
.recipe-description {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
}

/* Recipe Actions */
.recipe-actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #eee;
  background: hsl(0, 11%, 25%);
}

.empty-message {
  margin-left: 300px;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
  color: white;
  transition: color 0.3s ease, transform 0.2s ease;
}

.icon-btn:hover {
  color: #ff6f61;
  transform: scale(1.1);
}

/* Empty Message */
.empty-message {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
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
  left: 45%;
  top: 48%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    margin-top: -50px;
    gap: 10px;
  }
}
</style>
