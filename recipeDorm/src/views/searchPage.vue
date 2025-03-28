<template>
  <AddrecipesNav :username="username" />

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
    <div v-if="loading" class="loading">
      <div class="progress-bar">
        <div class="progress"></div>
      </div>
      <p>{{ loadingMessage }}</p>
    </div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="recipes.length" class="recipe-list">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.recipeId"
        :id="recipe.recipeId"
        :title="recipe.title"
        :description="recipe.description"
        :image="recipe.imageUrl"
      />
    </div>

    <p v-else-if="!loading && !error" class="no-results">
      Oops! Our chef just ran out of recipes! Try cooking up a different search.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AddrecipesNav from '@/components/addrecipesNav.vue'
import RecipeCard from '@/components/cards.vue'
import Typed from 'typed.js'

const query = ref('rice')
const recipes = ref([])
const loading = ref(false)
const error = ref(null)
const title = ref(null)
const username = ref('')
const loadingMessage = ref('🔄 Mixing ingredients...')

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
  margin: auto;
  padding-top: 20px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 15%;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.loading {
  font-size: 1.2rem;
  color: blue;
  position: relative;
  left: -15%;
}

.progress-bar {
  width: 200px;
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px auto;
}

.progress {
  width: 0;
  height: 100%;
  background: blue;
  animation: load 4s ease-in-out forwards;
}

@keyframes load {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

.no-results {
  position: relative;
  left: -15%;
  color: red;
}
.error {
  font-size: 1.2rem;
  color: red;
}
</style>
