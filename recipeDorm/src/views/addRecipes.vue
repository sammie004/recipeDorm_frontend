<template>
  <div class="container">
    <!-- Progress Bar -->
    <div class="progress-container">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="['progress-step', { active: index === currentStep }]"
      >
        <span class="step-label">{{ step.label }}</span>
      </div>
    </div>

    <!-- Input Fields Section -->
    <div class="recipe-form">
      <input
        v-if="currentStep === 0"
        v-model="recipe.title"
        type="text"
        placeholder="Enter Recipe Title"
        class="title-input"
      />

      <div v-if="currentStep === 1" class="form-sections">
        <button @click="toggleSection('ingredients')" class="section-btn">
          Ingredients
        </button>
        <button @click="toggleSection('steps')" class="section-btn">
          Steps
        </button>
        <button @click="toggleSection('image')" class="section-btn">
          Image
        </button>
      </div>

      <textarea
        v-if="activeSection === 'ingredients'"
        v-model="recipe.ingredients"
        placeholder="List ingredients..."
        class="text-area"
      ></textarea>
      <textarea
        v-if="activeSection === 'steps'"
        v-model="recipe.steps"
        placeholder="Describe steps..."
        class="text-area"
      ></textarea>

      <div v-if="activeSection === 'image'" class="image-upload">
        <input type="file" @change="uploadImage" />
        <img
          v-if="recipe.image"
          :src="recipe.image"
          alt="Recipe Preview"
          class="preview-image"
        />
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="nav-buttons">
      <button @click="prevStep" v-if="currentStep > 0" class="nav-btn">
        Previous
      </button>
      <button
        @click="nextStep"
        v-if="currentStep < steps.length - 1"
        class="nav-btn"
      >
        Next
      </button>
      <button
        @click="previewRecipe"
        v-if="currentStep === steps.length - 1"
        class="nav-btn"
      >
        Preview
      </button>
    </div>

    <!-- Preview Modal -->
    <div v-if="previewMode" class="modal">
      <div class="modal-overlay" @click="previewMode = false"></div>
      <div class="modal-content">
        <span class="close-icon" @click="previewMode = false">&times;</span>
        <div class="card">
          <h2 class="recipe-title">{{ recipe.title }}</h2>
          <p class="recipe-section">
            <strong>Ingredients:</strong> {{ recipe.ingredients }}
          </p>
          <p class="recipe-section">
            <strong>Steps:</strong> {{ recipe.steps }}
          </p>
          <img
            v-if="recipe.image"
            :src="recipe.image"
            alt="Recipe Image"
            class="preview-image"
          />
          <button @click="postRecipe" class="post-btn">Post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const steps = ref([
  { label: 'Title' },
  { label: 'Details' },
  { label: 'Preview' }
])
const currentStep = ref(0)
const activeSection = ref('')
const previewMode = ref(false)

const recipe = ref({ title: '', ingredients: '', steps: '', image: '' })

const toggleSection = section => {
  activeSection.value = section
}

const uploadImage = event => {
  const file = event.target.files[0]
  if (file) {
    recipe.value.image = URL.createObjectURL(file)
  }
}

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--
}

const previewRecipe = () => {
  previewMode.value = true
}

const postRecipe = () => {
  alert('Recipe Posted!')
}
</script>

<style scoped>
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
  /* flex: 0.5; */
  text-align: center;
  padding: 14px;
  border-radius: 8px;
  background: orange;
  font-weight: bold;
  width: 80px;
  gap: 50px;
  color: white;
}

.progress-step.active {
  background: #4caf50;
}

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

.form-sections {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.section-btn {
  padding: 12px 16px;
  border: none;
  background: #4caf50;
  color: white;
  cursor: pointer;
  border-radius: 8px;
}

.text-area {
  width: 100%;
  height: 200px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #888;
  background: #333;
  color: white;
}

.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-image {
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  margin-top: 15px;
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.nav-btn {
  padding: 14px 20px;
  border: none;
  background: #4caf50;
  color: white;
  cursor: pointer;
  border-radius: 8px;
}

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
}

.modal-content {
  background: #222;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  height: 50%;
  width: 50%;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: white;
  transition: 0.5s ease;
}
.close-icon:hover {
  color: #ff5722;
  transform: scale(1.5);
  cursor: pointer;
}
.card {
  background: #333;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
  text-align: center;
  position: relative;
  top: 30%;
}

.post-btn {
  margin-top: 10px;
  padding: 14px 20px;
  background: #ff5722;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  right: 30px;
  bottom: 10px;
}
</style>
