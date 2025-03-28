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
        <button type="submit" class="register-btn" @click="handleRegister">
          Sign Up
        </button>

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
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Reactive form data
const formData = ref({
  email: '',
  userName: '',
  password: '',
  confirmPassword: ''
})

// Error state for name validation
const nameError = ref(false)

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const handleRegister = async () => {
  nameError.value = false

  if (formData.value.userName.includes(' ')) {
    nameError.value = true
    return
  }

  if (!passwordRegex.test(formData.value.password)) {
    alert(
      'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.'
    )
    return
  }
  if (formData.value.password !== formData.value.confirmPassword) {
    alert(`the passwords dont match`)
    return
  }

  try {
    const response = await fetch(
      'https://recipedormapi20250315070938.azurewebsites.net/api/Auth/register',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData.value)
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Registration failed:', data)
      alert(`Error: ${data.message} \n${data.errors?.join('\n') || ''}`)
      return
    }

    console.log('Registration successful:', data)
    alert('Registration successful!')
  } catch (error) {
    console.error('Network error:', error)
    alert('Network error. Please try again.')
  }
}

onMounted(async () => {
  const token = route.query.token // Get token from URL

  if (token) {
    try {
      const response = await fetch(
        'https://recipedormapi20250315070938.azurewebsites.net/api/auth/user',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (!response.ok) throw new Error('Failed to fetch user data')

      user.value = await response.json()
      console.log('User Info:', user.value)

      localStorage.setItem('user', JSON.stringify(user.value)) // Save user data
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  } else {
    console.warn('No token found in URL')
  }
})
</script>

<style scoped>
/* Ensure container is centered and scales well */
.register-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 10%;
  /* left: 35%; */
  background: white;
  padding: 20px;
}

/* Register Box */
.register-box {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
  border: 1px solid black;
}

/* Header Text */
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

/* Error Message */
.error-msg {
  color: red;
  font-size: 0.85rem;
  margin-top: 5px;
}

.input-error {
  border-color: red !important;
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
  transition: 0.3s;
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
  transition: 0.3s;
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

/* RESPONSIVE DESIGN */
@media (max-width: 600px) {
  .register-box {
    padding: 1.5rem;
    width: 100%;
  }

  h2 {
    font-size: 1.5rem;
  }

  .input-group input {
    padding: 10px;
    font-size: 0.9rem;
  }

  .register-btn,
  .google-btn {
    padding: 10px;
    font-size: 0.9rem;
  }
}
</style>
