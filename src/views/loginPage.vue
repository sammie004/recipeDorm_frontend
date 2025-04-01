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

        <button type="submit" class="login-btn">Sign In</button>
        <p class="continue">or</p>

        <button type="button" class="google-btn" @click="handleGoogleLogin">
          <i class="bx bxl-google"></i> Continue with Google
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

const handleLogin = async () => {
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
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      modalMessage.value = 'Login successful! Redirecting to home page...'
      showModal.value = true
      localStorage.setItem('username', data.data.username)
      localStorage.setItem('token', data.data.token)
      setTimeout(() => {
        router.push('/home')
      }, 2000)
    } else {
      modalMessage.value = data.message || 'Login failed: Invalid credentials'
      showModal.value = true
    }
  } catch (error) {
    console.error('Error during login:', error)
    modalMessage.value = 'Network error. Please try again.'
    showModal.value = true
  }
}

const handleGoogleLogin = () => {
  window.location.href =
    'https://recipedormapi20250315070938.azurewebsites.net/api/auth/google-sign-in'
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 20px;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
  border: 1px solid black;
}

h2 {
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

p {
  color: #666;
  margin-bottom: 20px;
}

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
}

.login-btn:hover {
  box-shadow: 0 8px 15px #3b2f2f;
  transform: scale(1.05);
}

.continue {
  color: #666;
  margin: 20px 0;
}

.google-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  background: white;
  color: #333;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.google-btn:hover {
  background: #f0f0f0;
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

/* Modal Popup Styles */
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

/* Responsive Design for Mobile */
@media (max-width: 768px) {
  .login-box {
    max-width: 90%;
    padding: 1.5rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  .input-group input {
    padding: 10px;
    font-size: 0.9rem;
  }
  .login-btn,
  .google-btn {
    padding: 10px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .login-box {
    padding: 1rem;
  }
  h2 {
    font-size: 1.3rem;
  }
  .input-group input {
    padding: 8px;
    font-size: 0.8rem;
  }
  .login-btn,
  .google-btn {
    padding: 8px;
    font-size: 0.8rem;
  }
}
</style>

<style>
body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
</style>
