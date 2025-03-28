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
    <div v-if="loading" class="loading">Loading recipes...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="recipes.length" class="recipe-list">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :id="recipe.id"
        :title="recipe.name"
        :description="recipe.description"
        :image="recipe.imageUrl"
      />
    </div>

    <p v-else-if="!loading && !error">No recipes found.</p>
  </div>
</template>

<script setup>
import AddrecipesNav from '@/components/addrecipesNav.vue'
import cards from '@/components/cards.vue'
import { ref, onMounted } from 'vue'
import Typed from 'typed.js'

const query = ref('')
const recipes = ref([])
const loading = ref(false)
const error = ref(null)
const title = ref(null)

const fetchRecipes = async () => {
  if (!query.value.trim()) return

  loading.value = true
  error.value = null
  recipes.value = []
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(
      `https://recipedormapi20250315070938.azurewebsites.net/api/Recipes/search?SearchQuery=${query.value}&page=1`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch recipes')
    }

    const data = await response.json()
    recipes.value = data || []
    console.log(data)
  } catch (err) {
    error.value = err.message
  } finally {
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
  left: 0;
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
}

.error {
  font-size: 1.2rem;
  color: red;
}
</style>
