<template>
  <div class="landing-container">
    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="logo">RecipeDorm</div>
      <div class="nav-links">
        <button class="nav-button" @click="login()">Login</button>
        <button class="nav-button signup" @click="signUp()">Sign Up</button>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <header class="hero">
      <div class="hero-content">
        <h1>🍽️ Explore Flavors, Elevate Your Cooking.</h1>
        <p>Master recipes with our curated collection of delicious dishes.</p>
      </div>
    </header>

    <!-- ABOUT SECTION -->
    <!-- ABOUT SECTION -->
    <section class="about-section">
      <div class="about-content">
        <h2>About RecipeDorm</h2>
        <p>
          Welcome to <strong>RecipeDorm</strong>, your go-to platform for
          discovering and sharing amazing food recipes. Whether you're a
          beginner or a seasoned chef, we provide a collection of recipes to
          help you cook delicious meals with ease.
        </p>
      </div>
    </section>

    <!-- FEATURED SECTIONS -->
    <section class="info-section">
      <h2>Discover Our Categories</h2>
      <div class="info-box" v-for="(section, index) in sections" :key="index">
        <span class="info-emoji">{{ section.emoji }}</span>
        <h3>{{ section.title }}</h3>
        <p>{{ section.description }}</p>
      </div>
    </section>

    <!-- CALL TO ACTION -->
    <div class="cta-container">
      <h2>Join the Community</h2>
      <p>
        Start exploring recipes and share your culinary creativity with the
        world!
      </p>
      <button class="cta-button" @click="signUp()">Start Cooking</button>
    </div>

    <!-- FOOTER -->
    <footer class="footer">
      <p>&copy; 2025 RecipeDorm | Taste the Best</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
function login () {
  window.location.href = '/login'
}
function signUp () {
  window.location.href = '/register'
}
const sections = ref([
  {
    title: 'Savory Breakfasts',
    emoji: '🥞',
    description: 'Start your day with rich, flavorful breakfast ideas.'
  },
  {
    title: 'Dinner Indulgence',
    emoji: '🍲',
    description: 'Craft hearty meals for cozy, unforgettable dinners.'
  },
  {
    title: 'Decadent Desserts',
    emoji: '🍰',
    description: 'Treat yourself to indulgent, mouth-watering sweets.'
  }
])
</script>

<style scoped>
/* 🎨 GENERAL STYLES */
.landing-container {
  font-family: 'Poppins', sans-serif;
  text-align: center;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background: linear-gradient(to bottom, #2a1f1f, #3b2f2f);
  color: #ededed;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 🌍 NAVBAR */
.navbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #201717;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
}

.nav-links {
  display: flex;
  gap: 15px;
}

.nav-button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: 0.3s ease;
}

.nav-button:hover {
  color: #8a6e6e;
}

.signup {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border-radius: 5px;
  padding: 10px 25px;
}

.signup:hover {
  background: #8a6e6e;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
}

/* 🌟 HERO SECTION */
.hero {
  margin-top: 80px;
  padding: 50px 20px;
  max-width: 85%;
  margin-bottom: 100px;
}

.hero-content {
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #ededed;
}

.hero p {
  font-size: 1.3rem;
  max-width: 600px;
  margin: 15px auto;
  color: #c2b6b6;
  opacity: 0.9;
}

/* 📌 ABOUT SECTION */
/* 📌 ABOUT SECTION */
.about-section {
  width: 100%;
  height: 40%;
  padding: 50px 20px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1); /* Keep the previous background */
  margin-bottom: 100px;
}

.about-content {
  position: relative;
  top: 10%;
  width: 60%;
  margin: auto;
}

.about-section h2 {
  font-size: 2.5rem;
  /* font-weight: bold; */
  margin-bottom: 20px;
  color: #ededed;
}

.about-section p {
  font-size: 1.2rem;
  color: #c2b6b6;
  /* max-width: 600px; */
  width: 80%;
  margin: auto;
}

/* 🔥 FEATURED SECTIONS */
.info-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 50px 20px;
  text-align: center;
}

.info-section h2 {
  width: 100%;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #ededed;
}

.info-box {
  width: 300px;
  background: rgba(255, 255, 255, 0.15);
  padding: 30px;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.info-box:hover {
  transform: scale(1.06);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.info-emoji {
  font-size: 3.5rem;
  display: block;
  margin-bottom: 12px;
  color: #ededed;
}

/* ✅ CALL TO ACTION */
.cta-container {
  margin: 40px 0;
  text-align: center;
}

.cta-container h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.cta-button {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  padding: 18px 45px;
  font-size: 1.4rem;
  color: white;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.cta-button:hover {
  background: #8a6e6e;
  transform: scale(1.1);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
}

/* 🌙 FOOTER */
.footer {
  background: #1f1a1a;
  color: white;
  padding: 20px 0;
  font-size: 1rem;
  width: 100%;
  text-transform: uppercase;
}
</style>
