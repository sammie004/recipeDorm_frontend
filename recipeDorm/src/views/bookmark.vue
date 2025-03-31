<template>
  <Navbar />
  <div class="bookmark-page">
    <h1>Saved Recipes</h1>

    <!-- Search Bar -->
    <input
      v-model="searchQuery"
      placeholder="Search bookmarks..."
      aria-label="Search Bookmarks"
      class="search-bar"
    />

    <!-- Bookmark List -->
    <div class="bookmark-list">
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
      <p v-if="filteredBookmarks.length === 0" class="no-results">
        No recipes found.
      </p>
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
      bookmarks: [] // This will be populated from the API
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

        // Adjust extraction based on API structure:
        if (result && result.data && Array.isArray(result.data.recipes)) {
          this.bookmarks = result.data.recipes
        } else {
          console.error('Unexpected response format', result)
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error)
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
/* Center the entire bookmarks page */
.bookmark-page {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Vertical centering */
  align-items: center; /* Horizontal centering */
  padding: 20px;
  min-height: 100vh;
  background-color: #ffffff;
  box-sizing: border-box;
}

/* Title */
h1 {
  color: #4c4242;
  margin-bottom: 30px;
  text-align: center;
}

/* Search Bar */
.search-bar {
  margin-bottom: 70px;
  padding: 12px;
  width: 100%;
  max-width: 500px;
  text-align: center;
  border: 1px solid #4c4242;
  border-radius: 8px;
  box-sizing: border-box;
}

/* Bookmark List: Centered grid */
.bookmark-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1400px;
  margin: 20px auto;
  box-sizing: border-box;
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
  .search-bar {
    width: 90%;
  }
}
</style>
