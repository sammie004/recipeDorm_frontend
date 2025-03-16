<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="logo">RecipeDorm</div>
    <div class="userName">
      Welcome,<span class="username">{{ username }}</span>
    </div>
    <!-- Profile Icon -->
    <div class="profile" @click="logout">
      <img src="@/assets/lapo.jpg" alt="Profile" class="profile-pic" />
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const username = ref('Lapo')

onMounted(() => {
  const storedUser = localStorage.getItem('username')
  username.value = storedUser
})

const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
/* Navbar Container */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to right, #3b2f2f, #705d5d);
  /* Beautiful gradient */
  padding: 12px 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

/* Logo Styling */
.logo {
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Profile Picture */
.profile {
  width: 45px;
  height: 45px;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s ease-in-out;
}

.profile-pic:hover {
  transform: scale(1.1);
}

/* username */
.userName {
  position: relative;
  right: -10%;
  font-size: 20px;
}
</style>
