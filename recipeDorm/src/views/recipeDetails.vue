<template>
  <div class="recipe-details">
    <button @click="$router.back()" class="back-btn">← Back</button>
    <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />
    <h1>{{ recipe.title }}</h1>
    <p>{{ recipe.description }}</p>

    <h2>Ingredients</h2>
    <ul>
      <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
        {{ ingredient }}
      </li>
    </ul>

    <h2>Steps</h2>
    <ol>
      <li v-for="(step, index) in recipe.steps" :key="index">
        {{ step }}
      </li>
    </ol>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const recipes = ref([
  {
    title: 'Spaghetti Carbonara',
    description: 'A creamy Italian pasta dish with bacon and cheese.',
    image: '/recipeDorm/src/assets/spaghetti-carbonara.jpg',
    ingredients: [
      'Spaghetti',
      'Eggs',
      'Parmesan Cheese',
      'Bacon',
      'Black Pepper'
    ],
    steps: [
      'Boil pasta',
      'Fry bacon',
      'Mix eggs and cheese',
      'Combine everything'
    ]
  },
  {
    title: 'Classic Margherita Pizza',
    description: 'Tomato sauce, fresh basil, and mozzarella cheese.',
    image: 'https://source.unsplash.com/400x300/?pizza',
    ingredients: [
      'Pizza Dough',
      'Tomato Sauce',
      'Mozzarella',
      'Basil',
      'Olive Oil'
    ],
    steps: [
      'Roll dough',
      'Spread sauce',
      'Add cheese and basil',
      'Bake in oven'
    ]
  }
])

const recipe = computed(() => recipes.value[route.params.id])
</script>

<style scoped>
.recipe-details {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}

.recipe-image {
  width: 100%;
  border-radius: 10px;
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-bottom: 10px;
  color: #007bff;
}
</style>
