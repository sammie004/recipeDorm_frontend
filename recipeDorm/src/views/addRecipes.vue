<template>
  <AddrecipesNav :username="username" />
  <div class="container">
    <!-- Progress Bar -->
    <div class="progress-container">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="['progress-step', { active: index === currentStep }]"
        @click="goToStep(index)"
      >
        <span class="step-label">{{ index + 1 }}</span>
      </div>
    </div>

    <!-- Recipe Form -->
    <div class="recipe-form">
      <!-- Title Input (Step 1) -->
      <input
        v-if="currentStep === 0"
        v-model="recipe.title"
        type="text"
        placeholder="Enter Recipe Title"
        class="title-input"
      />

      <!-- Details Form Layout (Step 2) -->
      <div v-if="currentStep === 1" class="details-form">
        <div class="text-fields">
          <label>Ingredients:</label>
          <textarea
            v-model="recipe.ingredients"
            placeholder="List ingredients..."
            class="text-area"
          ></textarea>

          <label>Steps:</label>
          <textarea
            v-model="recipe.steps"
            placeholder="Describe steps..."
            class="text-area"
          ></textarea>
        </div>

        <div class="image-section">
          <label>Upload Image:</label>
          <input type="file" @change="uploadImage" class="image-input" />
          <div v-if="recipe.image" class="image-preview">
            <img
              :src="recipe.image"
              alt="Recipe Preview"
              class="preview-image"
            />
          </div>
        </div>
      </div>

      <!-- Recipe Preview (Step 3 - Single Card) -->
      <div v-if="currentStep === 2" class="recipe-preview">
        <div class="recipe-card">
          <h2 class="recipe-title">{{ recipe.title || 'Recipe Title' }}</h2>
          <div class="recipe-section">
            <strong>Ingredients:</strong>
            <p>{{ recipe.ingredients || 'No ingredients listed.' }}</p>
          </div>
          <div class="recipe-section">
            <strong>Steps:</strong>
            <p>{{ recipe.steps || 'No steps provided.' }}</p>
          </div>
          <div v-if="recipe.image" class="image-preview">
            <img
              :src="recipe.image"
              alt="Recipe Preview"
              class="preview-image"
            />
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div :class="['nav-buttons', { 'first-step': currentStep === 0 }]">
        <button @click="prevStep" v-if="currentStep > 0" class="nav-btn">
          Previous
        </button>
        <button
          @click="nextStep"
          v-if="currentStep < steps.length - 1"
          class="nav-btn next-btn"
        >
          {{ currentStep === 0 ? 'Details' : 'Preview' }}
        </button>
        <button
          @click="postRecipe"
          v-if="currentStep === steps.length - 1"
          class="nav-btn post-btn"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AddrecipesNav from '@/components/addrecipesNav.vue'
import { ref } from 'vue'

const steps = ref(['Title', 'Details', 'Preview'])
const currentStep = ref(0)

const recipe = ref({
  title: '',
  ingredients: '',
  steps: '',
  image: ''
})

const uploadImage = event => {
  const file = event.target.files[0]
  if (file) {
    recipe.value.image = URL.createObjectURL(file)
  }
}

const nextStep = () => {
  if (currentStep.value === 1) {
    // Skip preview modal and directly go to Step 3
    currentStep.value = 2
  } else if (currentStep.value < steps.value.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--
}

const postRecipe = () => {
  alert('Recipe Posted!')
}

// ✅ Function to Jump to Any Step
const goToStep = index => {
  currentStep.value = index
}
</script>
<style scoped>
/* General Container */
.container {
  position: relative;
  left: 3%;
  width: 1600px;
  margin: auto;
  padding: 40px;
  background: #1e1e1e;
  color: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
}

/* Progress Bar */
.progress-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 10px;
  margin-bottom: 25px;
}

.progress-step {
  text-align: center;
  padding: 14px;
  border-radius: 50%;
  background: gray;
  font-weight: bold;
  width: 50px;
  height: 50px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out, background 0.3s ease-in-out;
}

.progress-step:hover {
  opacity: 0.8;
  background: #333;
}

.progress-step.active {
  background: hsl(0, 11%, 25%);
  opacity: 1;
}

/* Recipe Form */
.recipe-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-input {
  width: 100%;
  padding: 15px;
  font-size: 22px;
  border-radius: 8px;
  border: 1px solid #888;
  background: #333;
  color: white;
}

/* Details Step Layout */
.details-form {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
}

.text-fields {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.text-fields label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.text-area {
  width: 100%;
  height: 120px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #888;
  background: #333;
  color: white;
  margin-bottom: 20px;
}

/* Image Upload */
.image-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-section label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.image-input {
  padding: 10px;
  background: #222;
  color: white;
  border: 1px solid #666;
  border-radius: 8px;
  cursor: pointer;
}

.image-preview {
  margin-top: 15px;
  padding: 10px;
  background: #333;
  border-radius: 8px;
  width: 100%;
  text-align: center;
}

.preview-image {
  width: 100%;
  max-width: 350px;
  border-radius: 8px;
}

/* Navigation Buttons */
/* Navigation Buttons */
.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
}

/* First Step: Align "Details" button to the bottom-right */
.first-step {
  justify-content: flex-end;
}

/* Navigation Buttons General */
.nav-btn {
  padding: 12px 30px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  background: hsl(0, 11%, 25%);
  /* Vibrant Orange */
  color: white;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
}

/* Hover Effect */
.nav-btn:hover {
  /* Darker Orange */
  transform: scale(1.05);
}

/* "Previous" Button */
.nav-btn:first-child {
  background: hsl(0, 11%, 25%);
}

/* "Previous" Button Hover */
.nav-btn:first-child:hover {
  background: hsl(0, 11%, 25%);
}

/* "Post" Button */
.post-btn {
  background: #4caf50; /* Green for Post */
}

/* "Post" Button Hover */
.post-btn:hover {
  background: #388e3c;
}
/* Modal */
/* Modal */
/* Modal Background */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* Modal Content (Card Layout) */
.modal-content {
  background: #222;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  width: 45%;
  max-width: 500px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Close Button */
.close-icon {
  position: absolute;
  top: -2%;
  right: 2%;
  font-size: 24px;
  cursor: pointer;
  color: white;
  transition: 0.3s ease;
}
.close-icon:hover {
  color: #ff7e5f;
  transform: scale(1.5);
}

/* Card Layout */
.card {
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
}

/* Recipe Title */
.recipe-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #f1f1f1;
}

/* Recipe Sections */
.recipe-section {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: left;
  font-size: 16px;
  color: #ddd;
}
/* Recipe Preview Grid */
.recipe-preview-grid {
  display: grid;
  /* grid-template-columns: repeat(3, 1fr); 3 Cards in a Row */
  gap: 20px;
  width: 100%;
  margin-top: 20px;
}

/* Recipe Card */
.recipe-card {
  background: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  text-align: center;
  color: #fff;
}

.recipe-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #f1f1f1;
}

.recipe-section {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #ddd;
  text-align: left;
}

.preview-image {
  width: 100%;
  max-width: 250px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 3px 6px rgba(255, 255, 255, 0.2);
}

/* Recipe Image (Smaller & Centered) */
.preview-image {
  width: 100%;
  max-width: 250px; /* Smaller size */
  border-radius: 10px;
  margin-top: 10px;
  object-fit: cover;
  position: relative;
  left: 0;
  box-shadow: 0 3px 6px rgba(255, 255, 255, 0.2);
}

/* Post Button */
.post-btn {
  margin-top: 15px;
  padding: 7px 25px;
  background: #ff5722;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.post-btn:hover {
  background: #e64a19;
}
</style>
