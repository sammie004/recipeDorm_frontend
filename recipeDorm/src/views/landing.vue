<template>
  <div class="landing-page">
    <nav class="navbar">
      <div class="nav-links">
        <button class="register-btn">Register</button>
        <button class="login-btn">Login</button>
      </div>
    </nav>
    <div class="content">
      <h1>Just For Two Cuisine Of High Quality<br />Full Of Exotic Tastes</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div class="image-container">
        <!-- <img src="/meal.png" alt="Delicious meal" class="meal-image" /> -->
        <!-- <div class="play-button">▶</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  left: 0;
  width: 130vw;
  background: white;
  color: white;
  text-align: center;
  position: relative;
}

.navbar {
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  gap: 15px;
}

.register-btn,
.login-btn {
  background: #ff6b6b;
  border: none;
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 20px;
}

.content {
  max-width: 600px;
}

.image-container {
  position: relative;
  display: inline-block;
  margin-top: 20px;
}

.meal-image {
  width: 300px;
  border-radius: 50%;
}
h1 {
  color: black;
}
.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 24px;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
