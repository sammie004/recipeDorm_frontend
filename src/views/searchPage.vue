<template>
  <navbar />

  <div class="search-container">
    <h1 class="title" ref="title"></h1>
    <div class="search-box">
      <input
        type="text"
        v-model="query"
        placeholder="Search for recipes..."
        @keyup.enter="search"
      />
      <button @click="search"><i class="bx bx-search"></i></button>
    </div>
  </div>

  <div class="results-container">
    <div v-if="loading" class="loading-container">
      <div class="loader"></div>
      <p class="loading-message">{{ loadingMessage }}</p>
    </div>
    <div v-if="error" class="error">{{ error }}</div>

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

    <!-- Only show no-results if a search has been performed and no recipes are found -->
    <p
      v-else-if="searched && recipes.length === 0 && !loading && !error"
      class="no-results"
    >
      Oops😔, Our chef just ran out of recipes! Try cooking up a different
      search.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import RecipeCard from '@/components/cards.vue'
import Typed from 'typed.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')
const recipes = ref([])
const loading = ref(false)
const error = ref(null)
const title = ref(null)
const loadingMessage = ref('🔄 Mixing ingredients...')
const searched = ref(false) // New state variable to indicate a search has been performed

const messages = [
  '🍳 Heating up the pan...',
  '🔪 Chopping up some ideas...',
  '🔥 Turning up the heat...',
  '🥄 Stirring the magic...',
  '🍽️ Plating up your dish...'
]

const fetchRecipes = async () => {
  if (!query.value.trim()) return

  loading.value = true
  error.value = null
  recipes.value = []
  searched.value = true // Mark that a search has been performed
  loadingMessage.value = messages[0]

  let index = 1
  const interval = setInterval(() => {
    loadingMessage.value = messages[index % messages.length]
    index++
  }, 1500)

  const token = localStorage.getItem('token')
  try {
    await new Promise(resolve => setTimeout(resolve, 4000)) // Extended loading effect
    const response = await fetch(
      `https://recipedormapi20250315070938.azurewebsites.net/api/Recipes/search?SearchQuery=${encodeURIComponent(
        query.value
      )}&page=1`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error ${response.status}: ${errorText}`)
    }
    const data = await response.json()
    recipes.value = data.data?.data || []
  } catch (err) {
    error.value = err.message
  } finally {
    clearInterval(interval)
    loading.value = false
  }
}

const search = () => {
  fetchRecipes()
}

const goToDetails = id => {
  console.log('Navigating to RecipeDetails with ID:', id)
  router.push({ name: 'recipeDetails', params: { id } })
}

onMounted(() => {
  new Typed(title.value, {
    strings: ['Find the best recipes...'],
    typeSpeed: 50,
    loop: false
  })
  fetchRecipes()
})
</script>

<style scoped>
.search-container {
  display: flex;
  position: absolute;
  top: 3%;
  left: 0;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background: white;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  color: black;
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 80%;
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  padding: 15px;
  font-size: 1.2rem;
  border-radius: 50px;
}

.search-box button {
  background: transparent;
  border: none;
  padding: 15px;
  cursor: pointer;
  color: black;
  font-size: 1.1rem;
  margin-left: 10px;
  transition: 0.5s;
}

.search-box button:hover {
  transform: scale(1.2);
}

.results-container {
  width: 100%;
  padding-top: 20px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 10%;
}

.no-results {
  margin-left: 11%;
  color: black;
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 200px 0px 0;
}

.loading {
  font-size: 1.2rem;
  color: black;
  position: relative;
}

.progress-bar {
  width: 200px;
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px auto;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -1%;
  margin-left: -1.5%;
}

.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-right-color: #705d5d;
  margin-left: -16%;
  animation: l15 1s infinite linear;
}
.loader::before,
.loader::after {
  content: '';
  grid-area: 1/1;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
  animation: l15 2s infinite;
}
.loader::after {
  margin: 8px;
  animation-duration: 3s;
}
@keyframes l15 {
  100% {
    transform: rotate(1turn);
  }
}
.loading-message {
  margin-top: 15px;
  font-size: 1.1rem;
  font-style: italic;
  color: #4c4242;
  margin-left: -17.5%;
}

.error {
  font-size: 1.5rem;
  color: black;
}
</style>

<style>
body {
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}
</style>
