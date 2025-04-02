<template>
  <Navbar />

  <div class="bookmark-page">
    <div class="content-wrapper">
      <div class="fixed-header">
        <h1>Saved Recipes</h1>
        <div class="search-container">
          <input
            v-model="searchQuery"
            placeholder="Search bookmarks..."
            aria-label="Search Bookmarks"
            class="search-bar"
          />
        </div>
      </div>
      <div class="bookmark-list">
        <div v-if="loading" class="loading-container">
          <div class="loader"></div>
          <p class="loading-message">{{ funnyMessage }}</p>
        </div>
        <div
          class="bookmark-item"
          v-for="recipe in filteredBookmarks"
          :key="recipe.recipeId"
        >
          <RecipeCard
            :id="recipe.recipeId"
            :title="recipe.title"
            :description="recipe.description"
            :image="recipe.imageUrl"
            :isBookmarked="recipe.isBookmarkedByUser"
            @toggleBookmark="toggleBookmark(recipe)"
          />
        </div>
        <p v-if="!loading && filteredBookmarks.length === 0" class="no-results">
          No recipes found.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import RecipeCard from '@/components/cards.vue'
import Navbar from '@/components/Navbar.vue'

const searchQuery = ref('')
const bookmarks = ref([]) // Fetched from API
const loading = ref(true)

// Humorous messages with emojis
const funnyMessages = [
  'Fetching deliciousness... 🍲 Hold tight!',
  'Cooking up your saved recipes... 👨‍🍳 Almost there!',
  'Good things take time... like slow-cooked ribs! 🍖',
  'Loading... (Granny always said patience is a virtue! 😂)',
  'Finding your bookmarked recipes... Did someone say snacks? 🍿',
  'Hang tight! Your recipes are being freshly served! 😋'
]
const funnyMessage = ref(funnyMessages[0])

// Change the message every 2 seconds
let messageInterval
onMounted(() => {
  let index = 0
  messageInterval = setInterval(() => {
    index = (index + 1) % funnyMessages.length
    funnyMessage.value = funnyMessages[index]
  }, 2000)
  fetchBookmarks()
})

const filteredBookmarks = computed(() => {
  return bookmarks.value.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const fetchBookmarks = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(
      'https://recipedormapi20250315070938.azurewebsites.net/api/Recipes/get-my-bookmarked-recipes?PageNumber=1',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ? Bearer ${token} : ''`
        }
      }
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch bookmarks: ${response.status}`)
    }
    const result = await response.json()
    console.log('Bookmarks API Response:', result)
    if (result && result.data && Array.isArray(result.data.recipes)) {
      bookmarks.value = result.data.recipes.map(recipe => ({
        ...recipe,
        isBookmarkedByUser: true // Force bookmarked state
      }))
      console.log('Mapped bookmarks:', bookmarks.value)
    } else {
      console.error('Unexpected response format', result)
    }
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
  } finally {
    clearInterval(messageInterval)
    loading.value = false
  }
}

const toggleBookmark = async recipe => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No auth token found. Please log in.')
      return
    }
    if (!recipe.recipeId) {
      console.error('Invalid recipe ID:', recipe.recipeId)
      return
    }
    console.log(
      'Toggling bookmark for recipe:',
      recipe.recipeId,
      'isBookmarkedByUser:',
      recipe.isBookmarkedByUser
    )
    if (recipe.isBookmarkedByUser) {
      // Call remove bookmark API
      const url = `https://recipedormapi20250315070938.azurewebsites.net/api/Recipes/remove-bookmark?RecipeId=${recipe.recipeId}`
      console.log('Calling remove bookmark API:', url)
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) {
        const errData = await response.json()
        console.error(`Failed to remove bookmark: ${response.status}, errData`)
        throw new Error(`Failed to remove bookmark: ${response.status}`)
      }
      const result = await response.json()
      console.log('Remove Bookmark API Response:', result)
      if (
        result.message &&
        result.message.toLowerCase().includes('unbookmarked')
      ) {
        bookmarks.value = bookmarks.value.filter(
          r => r.recipeId !== recipe.recipeId
        )
        console.log('Bookmark removed for recipe:', recipe.recipeId)
      } else {
        console.error('Unexpected remove bookmark response', result)
      }
    } else {
      // Otherwise, call add bookmark API.
      const response = await fetch(
        'https://recipedormapi20250315070938.azurewebsites.net/api/Recipes/bookmark-recipe',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ recipeId: recipe.recipeId })
        }
      )
      if (!response.ok) {
        const errData = await response.json()
        console.error(`Failed to bookmark recipe: ${response.status}, errData`)
        throw new Error(`Failed to bookmark recipe: ${response.status}`)
      }
      const result = await response.json()
      console.log('Bookmark API Response:', result)
      if (
        result.message &&
        result.message.toLowerCase().includes('bookmarked successfully')
      ) {
        recipe.isBookmarkedByUser = true
        console.log('Bookmark added for recipe:', recipe.recipeId)
      } else {
        console.error('Unexpected bookmark API response', result)
      }
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error)
  }
}
</script>

<style scoped>
.bookmark-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;
  /* Sidebar is assumed to be 80px, so adding left padding to accommodate it */
  padding-left: 80px;
}

.content-wrapper {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 auto;
}

.fixed-header {
  width: 100%;
}

h1 {
  color: #4c4242;
  margin-bottom: 20px;
}

.search-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar {
  width: 100%;
  padding: 10px;
  border: 1px solid #4c4242;
  border-radius: 8px;
  text-align: center;
}

.bookmark-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  margin-top: 20px;
}

.bookmark-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
}

.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-right-color: #705d5d;
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
}

.no-results {
  color: #777;
  font-style: italic;
  margin-top: 20px;
  width: 100%;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .bookmark-list {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 600px) {
  .fixed-header {
    padding: 10px;
  }
  h1 {
    font-size: 1.8rem;
  }
  .bookmark-list {
    grid-template-columns: 1fr;
  }
  .search-container {
    width: 90%;
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
