<template>
  <div class="recipe-card" @click="goToDetails">
    <img :src="image" :alt="title" class="recipe-image" />

    <div class="recipe-content">
      <h3 class="recipe-title">{{ title }}</h3>
      <p class="recipe-description">{{ description }}</p>
    </div>

    <div class="recipe-actions">
      <button class="icon-btn" @click.stop="toggleBookmark">
        <i :class="isBookmarked ? 'bx bx-bookmark' : 'bx bx-bookmark-alt'"></i>
      </button>
      <button class="icon-btn" @click.stop="toggleLike">
        <i
          :class="isLiked ? 'bx bx-heart' : 'bx bx-heart'"
          :style="{ color: isLiked ? 'red' : '#666' }"
        ></i>
      </button>
      <button class="icon-btn" @click.stop="goToDetails">
        <i class="bx bx-dots-horizontal-rounded"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: Number,
  title: String,
  description: String,
  image: String
})

const router = useRouter()

const isBookmarked = ref(false)
const isLiked = ref(false)

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
}

const toggleLike = () => {
  isLiked.value = !isLiked.value
}

const goToDetails = () => {
  router.push({ name: 'RecipeDetails', params: { id: props.id } })
}
</script>

<style scoped>
/* CARD CONTAINER */
.recipe-card {
  position: relative;
  top: 40%;
  left: -14%;
  background: hsl(0, 17%, 90%);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 300px; /* Consistent width */
  height: 300px; /* Consistent height */
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 3px 3px rbga(0, 0, 0, 0.1);

  margin-bottom: 1.3rem; /* Adjust this to control spacing */
}

/* Hover Effect */
.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* IMAGE */
.recipe-image {
  width: 100%;
  height: 200px; /* Fixed image height */
  object-fit: cover;
}

/* CONTENT */
.recipe-content {
  padding: 15px;
  text-align: center;
  flex-grow: 1;
}

/* TITLE */
.recipe-title {
  font-size: 1.2rem;
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
