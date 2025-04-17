<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Welcome Back 🍽️</h2>
      <p>Sign in to explore delicious recipes!</p>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="!loading">Sign In</span>
          <span v-else class="spinner"></span>
        </button>
      </form>

      <p class="signup-text">
        Don't have an account?
        <router-link to="/register" class="signup-link">Sign Up</router-link>
      </p>
    </div>

    <!-- Modal Popup -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <p>{{ modalMessage }}</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const showModal = ref(false)
const modalMessage = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  const formData = { email: email.value, password: password.value }
  try {
    const response = await fetch(
      'https://recipedormapi20250315070938.azurewebsites.net/api/Auth/sign-in',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }
    )
    console.log('Response Status:', response.status)

    let data
    try {
      data = await response.json()
    } catch (jsonError) {
      throw new Error('Invalid JSON response')
    }
    console.log(data)
    console.log('API Response:', data)
    if (response.ok) {
      modalMessage.value = 'Login successful! Welcome to RecipeDorm...'
      showModal.value = true
      localStorage.setItem('username', data.data.username)
      localStorage.setItem('token', data.data.token)
      setTimeout(() => {
        router.push('/home')
      }, 2000)
    } else if (data.message === 'User with email not found.') {
      modalMessage.value =
        data.message || 'Invalid email or password. Please try again.'
      showModal.value = true
    }
  } catch (error) {
    console.error('Error during login:', error)
    modalMessage.value = 'Network error. Please try again.'
    showModal.value = true
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped>
/* Container: Full viewport and centered content */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height of viewport */
  width: 100vw; /* Full width */
  margin: 0;
  padding: 0;
  background: white;
  margin-left: -7%;
}
/* Login Box */
.login-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  height: 70vh;
  text-align: center;
  border: 1px solid black;
}

/* Typography and spacing */
h2 {
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

p {
  color: #666;
  margin-bottom: 20px;
}

/* Input Groups */
.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  color: #333;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: 0.3s;
}

.input-group input:focus {
  border-color: #ff7e5f;
  box-shadow: 0 0 5px rgba(255, 126, 95, 0.5);
}

/* Button Styles */
.login-btn {
  width: 100%;
  padding: 12px;
  background: #705d5d;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-btn:hover {
  box-shadow: 0 8px 15px #3b2f2f;
  transform: scale(1.05);
}

.signup-text {
  margin-top: 15px;
  color: #333;
}

.signup-link {
  color: #3b2f2f;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}

/* Modal Popup */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 300px;
  margin-left: -7%;
  background: linear-gradient(135deg, #ffffff, #f7f7f7);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-content button {
  margin-top: 10px;
  padding: 8px 16px;
  border: none;
  background: #705d5d;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.modal-content button:hover {
  background: #ab9090;
}

/* Loader (spinner) styles */
.spinner {
  width: 35px;
  height: 25px;
  aspect-ratio: 1;
  --c: no-repeat linear-gradient(#fff 0 0);
  background: var(--c) 0% 50%, var(--c) 50% 50%, var(--c) 100% 50%;
  background-size: 20% 100%;
  animation: l1 1s infinite linear;
}

@keyframes l1 {
  0% {
    background-size: 20% 100%, 20% 100%, 20% 100%;
  }
  33% {
    background-size: 20% 10%, 20% 100%, 20% 100%;
  }
  50% {
    background-size: 20% 100%, 20% 10%, 20% 100%;
  }
  66% {
    background-size: 20% 100%, 20% 100%, 20% 10%;
  }
  100% {
    background-size: 20% 100%, 20% 100%, 20% 100%;
  }
}

/* Responsive Media Queries */

/* Responsive Design */

/* Adjust for medium screens (tablets, small laptops) */
@media (max-width: 1024px) {
  .login-box {
    max-width: 90%;
    padding: 1.8rem;
  }
}

/* Adjust for tablets and larger mobile screens */
@media (max-width: 768px) {
  .login-container {
    margin-left: -7%;
  }
  .login-box {
    max-width: 74%;
    padding: 1.5rem;
  }
}

/* Adjust for very small screens */
@media (max-width: 480px) {
  .modal-content {
    margin-left: 1%;
  }
  .signup-text {
    font-size: 0.9rem;
    /* padding-bottom: 15px; */
    margin-top: 1.5%;
  }
  .login-box {
    width: 90%;
    padding: 1rem;
  }
}

/* Fix body to prevent overflow issues */
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}
</style>

<style>
body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
</style>
