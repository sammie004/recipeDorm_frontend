<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Create an Account 🎉</h2>
      <p>Join us and explore delicious recipes!</p>

      <form @submit.prevent="handleRegister">
        <!-- Name Field -->
        <div class="input-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="userName"
            v-model="formData.userName"
            :class="{ 'input-error': nameError }"
            placeholder="Enter your full name"
            required
          />
          <p class="error-msg" v-if="nameError">
            Your username should not contain spaces
          </p>
        </div>

        <!-- Email Field -->
        <div class="input-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password Field -->
        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- Confirm Password Field -->
        <div class="input-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="formData.confirmPassword"
            placeholder="Confirm your password"
            required
          />
        </div>

        <!-- Sign Up Button -->
        <button type="submit" class="register-btn">Sign Up</button>

        <p class="continue">or</p>

        <!-- Google Register Button -->
        <button type="button" class="google-btn" @click="handleGoogleRegister">
          <i class="bx bxl-google"></i> Continue with Google
        </button>
      </form>

      <!-- Redirect to Login -->
      <p class="login-text">
        Already have an account?
        <router-link to="/login" class="login-link">Sign In</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive form data
const formData = ref({
  email: '',
  userName: '',
  password: ''
})

// Error state for name validation
const nameError = ref(false)

// Handle user registration
const handleRegister = () => {
  nameError.value = false

  if (formData.value.userName.includes(' ')) {
    nameError.value = true
    return
  }
}

// Handle Google authentication
const handleGoogleRegister = () => {
  console.log('Redirecting to Google Authentication...')
}
</script>

<style scoped>
/* Background Styling */
.register-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 10%;
  left: 35%;
  background: #f9f9f9;
}

/* Register Box */
.register-box {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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

/* Input Fields */
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

/* Register Button */
.register-btn {
  width: 100%;
  padding: 12px;
  background: #705d5d;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.register-btn:hover {
  box-shadow: 0 8px 15px #3b2f2f;
  transform: scale(1.05);
}

/* Google Button */
.google-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  background: #fff;
  color: #333;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.google-btn:hover {
  background: #f1f1f1;
  transform: scale(1.05);
}

/* Login Redirect */
.login-text {
  margin-top: 15px;
  color: #333;
}

.login-link {
  color: #3b2f2f;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
