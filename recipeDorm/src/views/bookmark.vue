<template>
  <Navbar />
  <div class="bookmark-page">
    <div class="content-wrapper">
      <h1>Saved Recipes</h1>

      <!-- Search Container with fixed height -->
      <div class="search-container">
        <input
          v-model="searchQuery"
          placeholder="Search bookmarks..."
          aria-label="Search Bookmarks"
          class="search-bar"
        />
      </div>

      <!-- Bookmark List -->
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
            :isBookmarked="true"
            @toggleBookmark="removeBookmark(recipe.recipeId)"
          />
        </div>
        <p v-if="!loading && filteredBookmarks.length === 0" class="no-results">
          No recipes found.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCard from '@/components/cards.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    RecipeCard,
    Navbar
  },
  data () {
    return {
      searchQuery: '',
      bookmarks: [], // Populated from the API
      loading: true
    }
  },
  computed: {
    filteredBookmarks () {
      return this.bookmarks.filter(recipe =>
        recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    async fetchBookmarks () {
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
          this.bookmarks = result.data.recipes
        } else {
          console.error('Unexpected response format', result)
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error)
      } finally {
        this.loading = false
      }
    },
    removeBookmark (id) {
      this.bookmarks = this.bookmarks.filter(recipe => recipe.recipeId !== id)
    }
  },
  mounted () {
    this.fetchBookmarks()
  }
}
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
  min-height: 700px; /* Reserve vertical space */
  display: flex;
  position: fixed;
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
  height: 60px; /* Fixed height so layout doesn't shift */
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

/* Search Bar */
.search-bar {
  width: 100%;
  height: 40px; /* Fixed height for input */
  padding: 12px;
  text-align: center;
  border: 1px solid #4c4242;
  border-radius: 8px;
  box-sizing: border-box;
}

/* Bookmark List: Force three columns */
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
