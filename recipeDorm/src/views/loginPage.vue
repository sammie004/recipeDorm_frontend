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

        <button type="submit" class="login-btn" @click="handleLogin">
          Sign In
        </button>
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

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  const formData = {
    email: email.value,
    password: password.value
  }

  try {
    const response = await fetch(
      'https://recipedormapi20250315070938.azurewebsites.net/api/Auth/sign-in',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    )

    const data = await response.json()

    if (response.ok) {
      console.log('Login successful')
      localStorage.setItem('username', data.username)
      localStorage.setItem('token', data.token)
      router.push('/home')
    } else {
      console.error('Login failed:', data.message || 'Invalid credentials')
    }
  } catch (error) {
    console.error('Error during login:', error)
  }
}
</script>
<style scoped>
/* Center the login box */
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 20px;
}

/* Make login box flexible */
.login-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px; /* Responsive width */
  width: 100%;
  text-align: center;
  border: 1px solid black;
}

/* Title & paragraph */
h2 {
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

p {
  color: #666;
  margin-bottom: 20px;
}

/* Input group styling */
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

/* Buttons */
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

/* Signup text */
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

/* 🔹 Responsive Design for Mobile */
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
