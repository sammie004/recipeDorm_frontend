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
      </button>
      <button class="icon-btn" @click.stop="goToDetails(id)">
        <i class="bx bx-share-alt"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: String,
  title: String,
  description: String,
  image: String
})

const router = useRouter()
const isBookmarked = ref(false)
const isLiked = ref(false)

// Load like state from localStorage on mount
onMounted(() => {
  const likedRecipes = JSON.parse(localStorage.getItem('likedRecipes')) || {}
  isLiked.value = likedRecipes[props.id] || false
})

// Toggle bookmark state
const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
}

// API call to like/unlike recipe and store in localStorage
const toggleLike = async () => {
  try {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
      console.error('No auth token found. Please log in.')
      return
    }

    if (!props.id) {
      console.error('Invalid recipe ID:', props.id)
      return
    }

    console.log('Sending like request for Recipe ID:', props.id)

    const response = await fetch(
      `https://recipedormapi20250315070938.azurewebsites.net/api/Recipes/like`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`
        },
        body: JSON.stringify({ recipeId: props.id })
      }
    )

    const responseText = await response.text()
    console.log('Raw Response:', responseText)

    if (!response.ok) {
      throw new Error(
        `Failed to like recipe: ${response.status} - ${responseText}`
      )
    }

    const data = JSON.parse(responseText)
    if (typeof data.liked === 'boolean') {
      isLiked.value = data.liked
    } else {
      isLiked.value = !isLiked.value
    }

    // Store like state in localStorage
    const likedRecipes = JSON.parse(localStorage.getItem('likedRecipes')) || {}
    likedRecipes[props.id] = isLiked.value
    localStorage.setItem('likedRecipes', JSON.stringify(likedRecipes))

    console.log('Like state updated:', isLiked.value)
  } catch (error) {
    console.error('Error liking the recipe:', error)
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
</style>
