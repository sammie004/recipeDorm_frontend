<template>
  <Navbar />

  <div class="bookmark-page">
    <div class="content-wrapper">
      <!-- Fixed Header -->
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

      <!-- Bookmark List -->
      <div class="bookmark-list">
        <!-- Loading Indicator -->
        <div v-if="loading" class="loading-container">
          <div class="loader"></div>
          <p class="loading-message">{{ funnyMessage }}</p>
        </div>

        <!-- Bookmark Cards -->
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

        <!-- No Results Message -->
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
const bookmarks = ref([])
const loading = ref(true)

// Funny messages
const funnyMessages = [
  'Fetching deliciousness... 🍲 Hold tight!',
  'Cooking up your saved recipes... 👨‍🍳 Almost there!',
  'Good things take time... like slow-cooked ribs! 🍖',
  'Loading... (Granny always said patience is a virtue! 😂)',
  'Finding your bookmarked recipes... Did someone say snacks? 🍿',
  'Hang tight! Your recipes are being freshly served! 😋'
]
const funnyMessage = ref(funnyMessages[0])

// Change loading message every 2 seconds
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
          Authorization: `Bearer ${token} `
        }
      }
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch bookmarks: ${response.status}`)
    }
    const result = await response.json()
    if (result && result.data && Array.isArray(result.data.recipes)) {
      bookmarks.value = result.data.recipes.map(recipe => ({
        ...recipe,
        isBookmarkedByUser: true
      }))
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
    if (recipe.isBookmarkedByUser) {
      const url = `https://recipedormapi20250315070938.azurewebsites.net/api/Recipes/remove-bookmark?RecipeId=${recipe.recipeId}`
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) {
        throw new Error(`Failed to remove bookmark: ${response.status}`)
      }
      bookmarks.value = bookmarks.value.filter(
        r => r.recipeId !== recipe.recipeId
      )
    } else {
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
        throw new Error(`Failed to bookmark recipe: ${response.status}`)
      }
      recipe.isBookmarkedByUser = true
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error)
  }
}
</script>
<style scoped>
.bookmark-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Exactly 3 cards per row */
  gap: 10px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-top: 10px;
}
.bookmark-item {
  display: flex;
  justify-content: center;
}

.content-wrapper {
  width: 100%;
  max-width: 1000px;
  position: absolute;
  top: 0;
  left: 12%; /* Moves everything 35% from the left */
  /* transform: translateX(-35%); Ensures proper centering */
  padding: 20px;
  text-align: center; /* Centers text content */
}

/* Fixed Header */
.fixed-header {
  width: 100%;
  background-color: transparent;
  padding: 10px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
  text-align: center;
}

h1 {
  color: #4c4242;
  margin-bottom: 10px;
}

/* Search Bar */
.search-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.search-bar {
  width: 50%;
  padding: 10px;
  border: 1px solid #4c4242;
  border-radius: 8px;
  text-align: center;
}
/* loader */
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-right-color: #705d5d;
  margin-left: -11%;
  animation: l15 1s infinite linear;
  margin-bottom: 15px;
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

/* Grid layout for bookmark cards */
.bookmark-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-content: center;
  width: 100%;
  margin-top: 50px; /* Adjusted spacing */
}

/* Center each card */
.bookmark-item {
  display: flex;
  justify-content: center;
}

/* Loading state */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  position: absolute;
  left: 5%;
  /* margin-left: 99%; */
}
.loading-message {
  color: black;
  margin-right: 90px;
}
/* No results message */
.no-results {
  color: #777;
  font-style: italic;
  margin-top: 20px;
  margin-left: 110%;
  width: 100%;
}

/* Responsive Design */
@media (max-width: 900px) {
  .content-wrapper {
    left: 50%;
    transform: translateX(-50%); /* Centers content on smaller screens */
  }

  .bookmark-list {
    grid-template-columns: repeat(2, 1fr);
  }
  .no-results{
    margin-left: 53%;
  }
}

@media (max-width: 600px) {
  .bookmark-list {
    grid-template-columns: 1fr;
  }

  .search-bar {
    width: 80%;
  }
  .no-results{
    margin-left: 0;
  }
}
</style>
