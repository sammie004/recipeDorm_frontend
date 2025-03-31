<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: String,
  title: String,
  description: String,
  image: String,
  isLikedByUser: Boolean,
  likesCount: Number,
  isBookmarkedByUser: Boolean // You can pass the initial bookmarked state
})

const router = useRouter()

// Create reactive state based on backend-provided props
const isLiked = ref(props.isLikedByUser)
const likesCount = ref(props.likesCount)
const isBookmarked = ref(props.isBookmarkedByUser || false)

// Fetch recipe details from backend on mount to ensure UI is in sync
const fetchRecipeDetails = async () => {
  try {
    if (!props.id) {
      console.error('Recipe ID is missing. Cannot fetch details.')
      return
    }
    const token = localStorage.getItem('token')
    console.log('Fetching recipe details for ID:', props.id)

    const response = await fetch(
      `https://recipedormapi20250315070938.azurewebsites.net/api/Recipes/get-recipe-by-id?RecipeId=${props.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe details: ${response.status}`)
    }
    const result = await response.json()
    console.log('Full API Response:', result)

    if (result && result.data && result.data.recipeDetails) {
      const recipe = result.data.recipeDetails
      isLiked.value = recipe.isLikedByUser
      likesCount.value = recipe.likesCount
      isBookmarked.value = recipe.isBookmarkedByUser // update bookmark state from backend if available
    } else {
      console.error('Invalid recipe data format:', result)
    }
  } catch (error) {
    console.error('Error fetching recipe details:', error)
  }
}

onMounted(() => {
  fetchRecipeDetails()
})

// Toggle bookmark state and call the bookmark API
const toggleBookmark = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No auth token found. Please log in.')
      return
    }
    if (!props.id) {
      console.error('Invalid recipe ID:', props.id)
      return
    }

    console.log('Toggling bookmark for Recipe ID:', props.id)

    // Optimistically update UI
    isBookmarked.value = !isBookmarked.value

    // Send the bookmark/unbookmark request to the backend
    const response = await fetch(
      'https://recipedormapi20250315070938.azurewebsites.net/api/Recipes/bookmark-recipe',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ recipeId: props.id })
      }
    )
    if (!response.ok) {
      throw new Error(`Failed to bookmark recipe: ${response.status}`)
    }
    const result = await response.json()
    console.log('Bookmark API response:', result)
    // Optionally, update isBookmarked based on result if the API returns a specific field (e.g., result.bookmarked)
  } catch (error) {
    console.error('Error bookmarking the recipe:', error)
    // Revert optimistic update on error
    isBookmarked.value = !isBookmarked.value
  }
}

// Toggle like state (unchanged from your existing code)
const toggleLike = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No auth token found. Please log in.')
      return
    }
    if (!props.id) {
      console.error('Invalid recipe ID:', props.id)
      return
    }

    console.log('Toggling like for Recipe ID:', props.id)

    const newLikedState = !isLiked.value
    isLiked.value = newLikedState
    likesCount.value = newLikedState
      ? likesCount.value + 1
      : likesCount.value - 1

    const response = await fetch(
      `https://recipedormapi20250315070938.azurewebsites.net/api/Recipes/like`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ recipeId: props.id })
      }
    )
    if (!response.ok) {
      throw new Error(`Failed to like recipe: ${response.status}`)
    }
    const result = await response.json()
    console.log('Like API response:', result)
  } catch (error) {
    console.error('Error liking the recipe:', error)
    // Revert optimistic update on error
    isLiked.value = !isLiked.value
    likesCount.value = isLiked.value
      ? likesCount.value + 1
      : likesCount.value - 1
  }
}

// Navigate to details page
const goToDetails = id => {
  console.log('Navigating to RecipeDetails with ID:', id)
  router.push({ name: 'recipeDetails', params: { id } })
}

// Shorten description for preview
const shortDescription = computed(() => {
  if (!props.description) return ''
  const words = props.description.split(' ')
  return words.length <= 5
    ? props.description
    : words.slice(0, 5).join(' ') + '...'
})
</script>

<template>
  <div class="recipe-card" @click="goToDetails(id)">
    <img :src="image" :alt="title" class="recipe-image" />

    <div class="recipe-content">
      <h3 class="recipe-title">{{ title }}</h3>
      <p class="recipe-description">{{ shortDescription }}</p>
    </div>

    <div class="recipe-actions">
      <button class="icon-btn" @click.stop="toggleBookmark">
        <i :class="isBookmarked ? 'bx bxs-bookmark' : 'bx bx-bookmark-alt'"></i>
      </button>
      <button class="icon-btn" @click.stop="toggleLike">
        <i
          :class="isLiked ? 'bx bxs-heart' : 'bx bx-heart'"
          :style="{ color: isLiked ? 'red' : '#666' }"
        ></i>
        <span class="likes-count">{{ likesCount }}</span>
      </button>
      <button class="icon-btn" @click.stop="goToDetails(id)">
        <i class="bx bx-share-alt"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* CARD CONTAINER */
.recipe-card {
  position: relative;
  top: 40%;
  left: -14%;
  background: hsl(0, 17%, 90%);
  border-radius: 12px;
  overflow: hidden;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.3rem;
}

/* Hover Effect */
.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* IMAGE */
.recipe-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  transition: 0.5s;
}
.recipe-image:hover {
  transform: scale(1.2);
}

/* CONTENT */
.recipe-content {
  padding: 15px;
  text-align: center;
  flex-grow: 1;
}

/* TITLE */
.recipe-title {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

/* DESCRIPTION */
.recipe-description {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
}

/* ACTION ICONS */
.recipe-actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #eee;
  background: hsl(0, 11%, 25%);
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

/* New style for likes count: reduced size */
.likes-count {
  font-size: 0.8rem;
  margin-left: 0.25rem;
  vertical-align: middle;
}
</style>
