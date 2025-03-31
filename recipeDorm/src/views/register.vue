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
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Reactive form data
const formData = ref({
  email: '',
  userName: '',
  password: '',
  confirmPassword: ''
})
const nameError = ref(false)
const showModal = ref(false)
const modalMessage = ref('')

// Regex for password validation
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const handleRegister = async () => {
  nameError.value = false

  if (formData.value.userName.includes(' ')) {
    nameError.value = true
    return
  }

  if (!passwordRegex.test(formData.value.password)) {
    showModal.value = true
    modalMessage.value =
      'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.'
    return
  }
  if (formData.value.password !== formData.value.confirmPassword) {
    showModal.value = true
    modalMessage.value = "The passwords don't match."
    return
  }

  try {
    const payload = {
      email: formData.value.email.trim(), // using trim() to remove extra spaces
      userName: formData.value.userName.trim(), // exact key as expected
      password: formData.value.password
    }
    console.log('Registration Payload:', payload)

    const response = await fetch(
      'https://recipedormapi20250315070938.azurewebsites.net/api/Auth/register',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    )
    const data = await response.json()
    if (!response.ok) {
      showModal.value = true
      modalMessage.value =
        data.message || 'Registration failed. Account may already exist.'
      return
    }
    showModal.value = true
    modalMessage.value = 'Registration successful! Please log in.'
  } catch (error) {
    showModal.value = true
    modalMessage.value = 'Network error. Please try again.'
  }
}

const handleGoogleRegister = () => {
  window.location.href =
    'https://recipedormapi20250315070938.azurewebsites.net/api/auth/google-sign-in'
}

const closeModal = () => {
  showModal.value = false
  if (modalMessage.value.includes('successful')) {
    router.push('/login')
  }
}

onMounted(async () => {
  const token = route.query.token // Get token from URL if any
  if (token) {
    try {
      const response = await fetch(
        'https://recipedormapi20250315070938.azurewebsites.net/api/auth/user',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      if (!response.ok) throw new Error('Failed to fetch user data')
      const userData = await response.json()
      console.log('User Info:', userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }
})
</script>

<style scoped>
.register-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  position: relative;
  top: 15%;
  padding: 20px;
}

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

.error-msg {
  color: red;
  font-size: 0.85rem;
  margin-top: 5px;
}

.input-error {
  border-color: red !important;
}

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
  padding: 25px 20px;
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

.modal-content p {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.modal-content button {
  margin-top: 15px;
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
  .register-box {
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
  .register-btn,
  .google-btn {
    padding: 10px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .register-box {
    padding: 1rem;
  }
  h2 {
    font-size: 1.3rem;
  }
  .input-group input {
    padding: 8px;
    font-size: 0.8rem;
  }
  .register-btn,
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
