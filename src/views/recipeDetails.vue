<template>
  <div class="recipe-details">
    <div v-if="loading" class="loading">Loading recipe details...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="recipeData" class="content">
      <h1 class="title">{{ recipeData.recipeDetails.title }}</h1>
      <img
        :src="recipeData.recipeDetails.imageUrl"
        alt="Recipe Image"
        class="recipe-image"
      />
      <p class="description">{{ recipeData.recipeDetails.description }}</p>

      <div class="section">
        <h2>Ingredients</h2>
        <ul class="ingredients">
          <li
            v-for="ingredient in recipeData.ingredients"
            :key="ingredient.name"
          >
            <span class="quantity">{{ ingredient.quantity }}</span>
            <span class="name">{{ ingredient.name }}</span>
          </li>
        </ul>
      </div>

      <div class="section">
        <h2>Instructions</h2>
        <ol class="steps">
          <li v-for="step in recipeData.steps" :key="step.stepNumber">
            <strong>Step {{ step.stepNumber }}:</strong> {{ step.description }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const recipeData = ref(null)
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  try {
    const id = route.params.id
    loading.value = true
    console.log('Fetching recipe with ID:', id)

    const token = localStorage.getItem('token')
    const response = await fetch(
      `https://recipedormapi20250315070938.azurewebsites.net/api/Recipes/get-recipe-by-id?RecipeId=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`Error ${response.status}: ${errText}`)
    }
    const data = await response.json()
    recipeData.value = data.data
  } catch (err) {
    error.value = err.message
    console.error('Failed to fetch recipe:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.recipe-details {
  width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
  color: #3b2f2f;
}

.recipe-image {
  width: 55vw;
  height: 60vh;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: 0.5s;
  position: relative;
  left: 20%;
  margin-bottom: 80px;
}
.recipe-image:hover {
  transform: scale(1.15);
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  text-align: justify;
}

.section {
  margin-bottom: 30px;
}

.section h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #705d5d;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
}

.ingredients,
.steps {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredients li,
.steps li {
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.ingredients li .quantity {
  font-weight: bold;
  margin-right: 5px;
}

.loading,
.error {
  text-align: center;
  font-size: 1.3rem;
  margin-top: 40px;
}
/* Responsive Design */
/* For tablets and mobile (max-width 768px) */
@media (max-width: 768px) {
  .title {
    font-size: 1.8rem; /* Make title slightly smaller */
  }

  .recipe-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  .description {
    font-size: 1rem;
    padding: 0 10px; /* More padding on mobile */
  }

  .section h2 {
    font-size: 1.5rem;
  }

  .ingredients li,
  .steps li {
    font-size: 1rem; /* Adjust step and ingredient text for better readability */
  }

  /* Disable hover effect on smaller screens */
  .recipe-image:hover {
    transform: none;
  }

  .ingredients,
  .steps {
    padding-left: 20px;
    padding-right: 20px;
  }
}

/* For smaller screens (max-width 480px) */
@media (max-width: 480px) {
  .title {
    font-size: 1.5rem; /* Further reduce title font size */
  }

  .recipe-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 15px;
  }

  .description {
    font-size: 0.95rem;
    padding: 0 15px; /* Add more padding */
  }

  .section h2 {
    font-size: 1.3rem;
  }

  .ingredients li,
  .steps li {
    font-size: 0.95rem; /* Smaller text size */
  }

  .loading,
  .error {
    font-size: 1.2rem;
    margin-top: 30px;
  }
}
</style>
