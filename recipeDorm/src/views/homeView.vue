<template>
  <p class="user">welcome, <span class="username"></span></p>
  <div class="recipe-container" @click="goToDetails">
    <RecipeCard
      v-for="(recipe, index) in recipes"
      :key="index"
      :id="index"
      :title="recipe.title"
      :description="recipe.description"
      :image="recipe.image"
    />
  </div>
</template>

<script setup>
import RecipeCard from '@/components/cards.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'
const router = useRouter()

// Sample Recipe Data – updated to use valid Unsplash source links
const recipes = ref([
  {
    title: 'Spaghetti Carbonara',
    description: 'A creamy Italian pasta dish with bacon and cheese.',
    image: '/recipeDorm/src/assets/spaghetti-carbonara.jpg'
  },
  {
    title: 'Classic Margherita Pizza',
    description: 'Tomato sauce, fresh basil, and mozzarella cheese.',
    image: 'hhttps://unsplash.com/photos/pizza-on-chopping-board-MqT0asuoIcU'
  },
  {
    title: 'Grilled Salmon',
    description: 'Fresh salmon fillet grilled to perfection.',
    image:
      'https://unsplash.com/photos/grilled-meat-with-green-vegetable-on-black-ceramic-plate-4WPcz_5RVMk'
  },
  {
    title: 'Chocolate Cake',
    description: 'Rich and moist chocolate cake with frosting.',
    image:
      'https://unsplash.com/photos/chocolate-cake-with-strawberry-on-white-ceramic-plate-6jHpcBPw7i8'
  },
  {
    title: 'Avocado Toast',
    description: 'Creamy avocado on crispy toast with toppings.',
    image: 'https://source.unsplash.com/400x300/?avocado-toast'
  },
  {
    title: 'Chicken Biryani',
    description: 'Aromatic rice dish with spices and chicken.',
    image: 'https://source.unsplash.com/400x300/?biryani'
  },
  {
    title: 'French Croissant',
    description: 'Flaky, buttery, and perfectly golden.',
    image: 'https://source.unsplash.com/400x300/?croissant'
  },
  {
    title: 'Caesar Salad',
    description: 'Crisp lettuce with creamy dressing and croutons.',
    image: 'https://source.unsplash.com/400x300/?salad'
  },
  {
    title: 'Strawberry Smoothie',
    description: 'A refreshing and healthy berry smoothie.',
    image: 'https://source.unsplash.com/400x300/?smoothie'
  },
  {
    title: 'Pancakes',
    description: 'Fluffy pancakes with maple syrup and butter.',
    image: 'https://source.unsplash.com/400x300/?pancakes'
  }
])
const goToDetails = () => {
  console.log('Navigating to recipe details')
  route
}
onMounted(() => {
  const username = document.querySelector('.username')
  const user = localStorage.getItem('username')
  username.innerHTML = user
})
</script>

<style scoped>
.recipe-container {
  width: 100%;
  height: auto; /* Prevents excessive height */
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Responsive columns */
  gap: 15px; /* Controls spacing between cards */
  justify-content: center;
  position: relative;
  top: -5%;
  left: 22%;
}
.user {
  position: relative;
  left: 19%;
  font-size: 1.5rem;
  color: black;
}
.header {
  position: absolute;
  top: 20%;
  left: 35%;
  font-size: 30px;
}
/* Responsive adjustments */
@media (max-width: 1200px) {
  .recipe-container {
    grid-template-columns: repeat(3, 300px);
  }
}

@media (max-width: 900px) {
  .recipe-container {
    grid-template-columns: repeat(2, 300px);
    position: relative;
    left: 5%;
  }
}

@media (max-width: 600px) {
  .recipe-container {
    grid-template-columns: 300px;
    position: relative;
    left: 14%;
    top: 20%;
  }
}
</style>

<!-- Global style (in Home.vue or your global CSS file) -->
<style>
body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
</style>
