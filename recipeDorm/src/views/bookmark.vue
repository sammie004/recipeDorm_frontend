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
        <p v-if="loading" class="loading-message">Loading bookmarks...</p>
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
          Authorization: token ? `Bearer ${token}` : ''
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
        method: 'DELETE', // DELETE is expected
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) {
        const errData = await response.json()
        console.error(`Failed to remove bookmark: ${response.status}`, errData)
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
        console.error(`Failed to bookmark recipe: ${response.status}`, errData)
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

onMounted(() => {
  fetchBookmarks()
})
</script>

<style scoped>
/* Bookmark Page container */
.bookmark-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;
  box-sizing: border-box;
  margin-left: 30px;
}

/* Content wrapper reserves space for the entire section */
.content-wrapper {
  width: 100%;
  max-width: 1400px;
  padding: 20px;
  box-sizing: border-box;
  min-height: 700px;
  position: absolute;
  top: 10%;
  flex-direction: column;
  align-items: center;
}

/* Title */
h1 {
  color: #4c4242;
  margin-bottom: 30px;
  text-align: center;
}

/* Search Container with fixed height */
.search-container {
  width: 100%;
  max-width: 500px;
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

/* Search Bar */
.search-bar {
  width: 100%;
  height: 40px;
  padding: 12px;
  text-align: center;
  border: 1px solid #4c4242;
  border-radius: 8px;
  box-sizing: border-box;
}

/* Bookmark List: Force four columns */
.bookmark-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  width: 100%;
  max-width: 1400px;
  margin-left: 30px;
  position: relative;
  left: 7%;
  margin: 20px auto 0 auto;
  box-sizing: border-box;
  min-height: 300px;
}

/* Loading Message */
.loading-message {
  grid-column: 1 / -1;
  text-align: center;
  color: #777;
}

/* Bookmark Item */
.bookmark-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Hover Effect */
.bookmark-item:hover {
  transform: translateY(-8px);
}

/* No Results */
.no-results {
  color: #777;
  font-style: italic;
  text-align: center;
  margin-top: 20px;
}

/* Responsive Design */

/* Medium screens */
@media (max-width: 1024px) {
  .bookmark-list {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

/* Small screens */
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
