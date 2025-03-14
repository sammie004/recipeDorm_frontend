<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Create an Account 🎉</h2>
      <p>Join us and explore delicious recipes!</p>

      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="name"
            v-model="name"
            :class="{ 'input-error': error }"
            placeholder="Enter your full name"
            required
          />
          <p class="error-msg" v-if="error">
            Your username should not contain spaces
          </p>
        </div>

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

        <div class="input-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            placeholder="Confirm your password"
            required
          />
        </div>

        <button type="submit" class="register-btn">Sign Up</button>
        <p class="continue">or</p>

        <button class="google-btn" @click="handleGoogleRegister">
          Continue with Google <i class="bx bxl-google"></i>
        </button>
      </form>

      <p class="login-text">
        Already have an account?
        <router-link to="/login" class="login-link">Sign In</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref(false)

const handleRegister = () => {
  error.value = false
  if (
    !name.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    alert('Please fill in all fields.')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }
  if (name.value.includes(' ')) {
    error.value = true
    return
  }
  console.log('Registering:', name.value, email.value)
  // Add registration logic here
}

const handleGoogleRegister = () => {
  console.log('Redirecting to Google Authentication...')
  // Implement Google OAuth authentication logic
}
</script>

<style scoped>
/* Background Styling */
.register-container {
  height: 100vh;
  position: absolute;
  left: 35%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/food-bg.jpg') no-repeat center center/cover;
}

/* Glassmorphism Register Box */
.register-box {
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
  margin-bottom: 3px;
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

/* Error Styling */
.input-error {
  border: 2px solid rgba(255, 55, 55, 0.771) !important;
  /* background: rgb(255, 52, 52) !important; */
}

.error-msg {
  color: rgb(255, 15, 15);
  font-size: 0.8rem;
  display: block;
}

/* Register Button */
.register-btn {
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

.register-btn:hover {
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

/* Login Redirect */
.login-text {
  margin-top: 15px;
  color: #fff;
}

.login-link {
  color: #ffb84d;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
