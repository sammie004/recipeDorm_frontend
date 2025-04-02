<template>
  <navbar />
  <div class="settings-fullscreen">
    <div class="settings-container">
      <h2>Settings</h2>

      <!-- Display Section -->
      <div class="setting-section">
        <h3>Display</h3>
        <div class="setting-item">
          <label for="darkMode">Dark Mode</label>
          <input
            id="darkMode"
            type="checkbox"
            v-model="darkMode"
            @change="toggleDarkMode"
          />
        </div>
      </div>

      <!-- Notifications Section -->
      <div class="setting-section">
        <h3>Notifications</h3>
        <div class="setting-item">
          <label for="notifications">Enable Notifications</label>
          <input
            id="notifications"
            type="checkbox"
            v-model="notifications"
            @change="toggleNotifications"
          />
        </div>
        <div class="setting-item">
          <label for="sound">Notification Sound</label>
          <input
            id="sound"
            type="checkbox"
            v-model="notificationSound"
            @change="toggleNotificationSound"
          />
        </div>
      </div>

      <!-- Preferences Section -->
      <div class="setting-section">
        <h3>Preferences</h3>
        <div class="setting-item">
          <label for="language">Language</label>
          <select id="language" v-model="language">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div class="setting-item">
          <label>Measurement Units</label>
          <div class="radio-group">
            <label
              ><input type="radio" value="imperial" v-model="units" />
              Imperial</label
            >
            <label
              ><input type="radio" value="metric" v-model="units" />
              Metric</label
            >
          </div>
        </div>
        <div class="setting-item">
          <label>Diet Preferences</label>
          <div class="checkbox-group">
            <label
              ><input
                type="checkbox"
                value="Vegetarian"
                v-model="dietPreferences"
              />
              Vegetarian</label
            >
            <label
              ><input type="checkbox" value="Vegan" v-model="dietPreferences" />
              Vegan</label
            >
            <label
              ><input
                type="checkbox"
                value="Gluten-Free"
                v-model="dietPreferences"
              />
              Gluten-Free</label
            >
            <label
              ><input
                type="checkbox"
                value="Dairy-Free"
                v-model="dietPreferences"
              />
              Dairy-Free</label
            >
          </div>
        </div>
        <div class="setting-item">
          <label for="sorting">Recipe Sorting</label>
          <select id="sorting" v-model="recipeSorting">
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="recommended">Recommended</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'

const darkMode = ref(false)
const notifications = ref(true)
const notificationSound = ref(true)
const language = ref('en')
const units = ref('imperial')
const dietPreferences = ref([])
const recipeSorting = ref('newest')

const toggleDarkMode = () => {
  console.log('Dark mode:', darkMode.value)
}

const toggleNotifications = () => {
  console.log('Notifications:', notifications.value)
}

const toggleNotificationSound = () => {
  console.log('Notification Sound:', notificationSound.value)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  box-sizing: border-box;
}

.settings-fullscreen {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* Background image with overlay - update URL as needed */
  background: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    /* url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1950&q=80'); */;
  background-size: cover;
  background-position: center;
  padding: 20px;
}

.settings-container {
  background-color: #ffffff;
  padding: 40px 50px;
  border-radius: 20px;
  position: absolute;
  top: 13%;
  /* left: 35%; */
  width: 100%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  font-family: 'Poppins', sans-serif;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.settings-container h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.2rem;
  color: #3b2f2f;
}

.setting-section {
  margin-bottom: 30px;
  border-bottom: 1px solid #f0e6dd;
  padding-bottom: 20px;
}

.setting-section h3 {
  margin-bottom: 15px;
  font-size: 1.3rem;
  color: #3b2f2f;
  font-weight: 600;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.setting-item label {
  font-size: 1.1rem;
  color: #3b2f2f;
  flex: 1;
}

.setting-item input[type='checkbox'],
.setting-item select,
.setting-item input[type='radio'] {
  margin-left: 15px;
  transform: scale(1.1);
  cursor: pointer;
}

.radio-group,
.checkbox-group {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.radio-group label,
.checkbox-group label {
  font-size: 0.95rem;
  color: #3b2f2f;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

select {
  padding: 8px 12px;
  border: 1px solid #e0d4c8;
  border-radius: 8px;
  font-size: 1rem;
  color: #3b2f2f;
  background-color: #faf7f2;
  transition: border-color 0.3s ease;
}

select:focus {
  outline: none;
  border-color: #d4a373;
}
</style>
