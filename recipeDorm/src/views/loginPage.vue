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

        <button class="google-btn" @click="handleGoogleLogin">
          <i class="bx bxl-google"></i> Continue with Google
        </button>
      </form>

      <p class="signup-text">
        Don't have an account?
        <router-link to="/register" class="signup-link">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = () => {
  if (!email.value || !password.value) {
    alert('Please enter both email and password.')
    return
  }
  console.log('Logging in with:', email.value, password.value)
  router.push('/home')
}

const handleGoogleLogin = () => {
  console.log('Redirecting to Google Authentication...')
  alert('Google Authentication is not implemented yet.')
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  position: relative;
  left: 36%;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
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
  background: white;
  color: #333;
  font-size: 1rem;
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
  background: #705d5d;
  transform: scale(1.05);
  box-shadow: 0 8px 15px #3b2f2f;
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
</style>
