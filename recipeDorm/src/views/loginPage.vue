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

        <button type="submit" class="login-btn" @click="redirect">
          Sign In
        </button>
        <p class="continue">or</p>

        <button class="google-btn" @click="handleGoogleLogin">
          Continue with Google <i class="bx bxl-google"></i>
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
  // Add authentication logic here
}

const handleGoogleLogin = () => {
  console.log('Redirecting to Google Authentication...')
  alert('Google Authentication is not implemented yet.')
}
const redirect = () => {
  console.log('Redirecting to Home Page')
  // Navigation logic here
  router.push('/home')
}
</script>

<style scoped>
/* Background Styling */
.login-container {
  height: 100vh;
  display: flex;
  position: absolute;
  left: 35%;
  top: 0;
  align-items: center;
  justify-content: center;
  background: url('@/assets/food-bg.jpg') no-repeat center center/cover;
}

/* Glassmorphism Login Box */
.login-box {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
}

/* Text Styling */
h2 {
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

p {
  color: #ddd;
  margin-bottom: 20px;
}

/* Input Fields */
.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  color: #fff;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  outline: none;
  font-size: 1rem;
  transition: 0.3s;
}

.input-group input:focus {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

/* Sign-in Button */
.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}

.login-btn:hover {
  background: linear-gradient(to right, #feb47b, #ff7e5f);
  transform: scale(1.05);
  box-shadow: 0 8px 15px rgba(255, 126, 95, 0.3);
}

/* Continue Text */
.continue {
  color: #fff;
  margin: 20px 0;
}

/* Google Button */
.google-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid white;
  background: transparent;
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}

.google-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
  box-shadow: 0 8px 15px rgba(255, 255, 255, 0.3);
}

/* Signup Text */
.signup-text {
  margin-top: 15px;
  color: #fff;
}

.signup-link {
  color: #ffb84d;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>
