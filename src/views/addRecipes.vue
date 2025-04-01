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
      <p v-if="currentStep === 0 && !recipe.title" class="error">
        Title is required.
      </p>

      <!-- Details Form Layout (Step 2) -->
      <div v-if="currentStep === 1" class="details-form">
        <div class="text-fields">
          <label><h2>Ingredients:</h2></label><br /><br />
          <div
            v-for="(ingredient, index) in recipe.ingredients"
            :key="index"
            class="ingredient-container"
          >
            <input
              v-model="recipe.ingredients[index].name"
              :placeholder="'Ingredient ' + (index + 1)"
              class="text-input"
            />
            <input
              v-model="recipe.ingredients[index].quantity"
              :placeholder="'Quantity ' + (index + 1)"
              class="text-input quantity"
            />
            <button @click="removeIngredient(index)" class="delete-step-btn">
              ❌
            </button>
          </div>
          <button @click="addIngredient" class="add-step-btn">
            + Add Ingredient
          </button>
          <p v-if="currentStep === 1 && !isIngredientsValid" class="error">
            All ingredient fields are required.
          </p>

          <br /><label><h2>Steps:</h2></label><br /><br />
          <div
            v-for="(step, index) in recipe.steps"
            :key="index"
            class="step-container"
          >
            <textarea
              v-model="recipe.steps[index].description"
              :placeholder="'Step ' + (index + 1)"
              class="text-Area"
            ></textarea>
            <button @click="removeStep(index)" class="delete-step-btn">
              ❌
            </button>
          </div>
          <button @click="addStep" class="add-step-btn">+ Add Step</button>
          <p v-if="currentStep === 1 && !isStepsValid" class="error">
            All step descriptions are required.
          </p>
        </div>

        <div class="image-section">
          <h2>Image:</h2>
          <br />
          <label class="custom-file-upload">
            <input
              type="file"
              @change="uploadImage"
              class="image-input"
              hidden
            />
            📸 Upload Image
          </label>
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
            <p v-for="(ingredient, index) in recipe.ingredients" :key="index">
              {{ ingredient.name }} - {{ ingredient.quantity }}
            </p>
          </div>
          <div class="recipe-section">
            <strong>Steps:</strong>
            <p v-for="(step, index) in recipe.steps" :key="index">
              Step {{ index + 1 }}:
              {{ step.description || 'No step provided.' }}
            </p>
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
          Title
        </button>
        <button
          @click="nextStep"
          v-if="currentStep < steps.length - 1"
          class="nav-btn next-btn"
          :disabled="!canProceed"
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const steps = ref(['Title', 'Details', 'Preview'])
const currentStep = ref(0)

const recipe = ref({
  title: '',
  ingredients: [{ name: '', quantity: '' }],
  // Each step here only stores a description; step numbers are calculated during submission.
  steps: [{ description: '' }],
  image: null
})

// Validation computed properties
const isIngredientsValid = computed(() =>
  recipe.value.ingredients.every(ing => ing.name.trim() && ing.quantity.trim())
)
const isStepsValid = computed(() =>
  recipe.value.steps.every(step => step.description.trim())
)
const canProceed = computed(() => {
  if (currentStep.value === 0) return recipe.value.title.trim() !== ''
  if (currentStep.value === 1)
    return isIngredientsValid.value && isStepsValid.value
  return true
})

const uploadImage = event => {
  const file = event.target.files[0]
  if (file) {
    recipe.value.image = URL.createObjectURL(file)
  }
}

const nextStep = () => {
  if (canProceed.value) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--
}

const postRecipe = async () => {
  const token = localStorage.getItem('token')
  console.log('Retrieved Token:', token)
  if (!token) {
    alert('Error: No token found. Please log in again.')
    return
  }

  // Log raw recipe object for debugging
  console.log('Raw Recipe Object:', recipe.value)

  // Build the steps array with sequential step numbers.
  const formattedSteps = (recipe.value.steps || [])
    .map((step, index) => ({
      stepNumber: index + 1,
      description: step.description.trim()
    }))
    .filter(step => step.description !== '')

  // Build the ingredients array.
  const formattedIngredients = (recipe.value.ingredients || [])
    .map(ing => ({
      name: ing.name.trim(),
      quantity: ing.quantity.trim()
    }))
    .filter(ing => ing.name !== '' && ing.quantity !== '')

  // Validate required fields.
  if (!recipe.value.title.trim()) {
    alert('Error: Title is required.')
    return
  }
  if (formattedSteps.length === 0) {
    alert('Error: At least one valid step is required.')
    return
  }
  if (formattedIngredients.length === 0) {
    alert('Error: At least one valid ingredient is required.')
    return
  }

  // Create a FormData object and append fields.
  const formData = new FormData()
  formData.append('Title', recipe.value.title.trim())
  // Assuming you have a description field; if not, you can send an empty string.
  formData.append(
    'Description',
    recipe.value.description ? recipe.value.description.trim() : ''
  )

  // Append ingredients and steps as JSON strings exactly as the API expects.
  formData.append('ingredients', JSON.stringify(formattedIngredients))
  formData.append('steps', JSON.stringify(formattedSteps))

  // If an image file was selected, append it. (Ensure you store the file in recipe.value.imageFile.)
  if (recipe.value.imageFile) {
    formData.append('Image', recipe.value.imageFile)
  }

  // For debugging: log FormData entries.
  console.log('Final FormData entries:')
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1])
  }

  try {
    const response = await fetch(
      'https://recipedormapi20250315070938.azurewebsites.net/api/Recipes/add-new-recipe',
      {
        method: 'POST',
        // Do not manually set 'Content-Type'; let the browser set it with the proper boundary.
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    )

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Failed to post recipe: ${errorMessage}`)
    }

    alert('Recipe posted successfully!')
    router.push('/myrecipe')
  } catch (error) {
    console.error('Error:', error)
    alert(error.message)
  }
}

const addIngredient = () =>
  recipe.value.ingredients.push({ name: '', quantity: '' })
const removeIngredient = index => recipe.value.ingredients.splice(index, 1)
const addStep = () => recipe.value.steps.push({ description: '' })
const removeStep = index => recipe.value.steps.splice(index, 1)
const goToStep = index => {
  if (canProceed.value) {
    currentStep.value = index
  }
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

.progress-step.active {
  background: #473939;
  opacity: 1;
}

/* Inputs & Buttons */
.title-input {
  width: 100%;
  padding: 10px;
  height: 50px;
  border-radius: 10px;
}

.step-container {
  display: flex;
}

.text-input {
  width: 40%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #888;
  background: #333;
  color: white;
  margin-bottom: 10px;
}

.text-Area {
  width: 40%;
  padding: 10px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #888;
  background: #333;
  color: white;
  margin-bottom: 10px;
}

.quantity {
  width: 30%;
}

.ingredient-container {
  display: flex;
  gap: 15px;
}

.add-step-btn {
  background: #473939;
  padding: 5px 5px;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  color: white;
}

.delete-step-btn {
  margin-top: -20px;
  background: none;
  color: white;
  border: none;
  margin-left: 40px;
  margin-top: -8px;
  font-size: 16px;
  cursor: pointer;
  transition: ease-in;
}

.delete-step-btn:hover {
  transform: scale(1.05);
}

.image-section {
  margin-top: 10px;
  flex-direction: flex-start;
}

.custom-file-upload {
  display: inline-block;
  padding: 12px 15px;
  background: #473939;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
}

.custom-file-upload:hover {
  background: rgb(96, 65, 65);
}

.image-preview {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}

.preview-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
}

.nav-btn {
  background: rgb(96, 65, 65);
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  color: white;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
