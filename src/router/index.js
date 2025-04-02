import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/homeView.vue';
import AboutView from '../views/aboutview.vue';
import loginpage from '../views/loginPage.vue';
import register from '../views/register.vue';
import addRecipes from '../views/addRecipes.vue';
import recipeDetails from '../views/recipeDetails.vue';
import home from '../views/home.vue';
// import landingPage from '../views/landing.vue';
import settings from '../views/settings.vue';
import SearchPage from '../views/searchPage.vue';
import myRecipes from '../views/myRecipe.vue'
import bookmark from '../views/bookmark.vue'

const routes = [
  { path: '/', component: home, name: 'homePage' },
  { path: '/about', component: AboutView, name: 'About' },
  { path: '/login', component: loginpage, name: 'login' },
  { path: '/register', component: register, name: 'register' },
  // 🔒 Protected Routes (Require Authentication)
  { path: '/home', component: HomeView, name: 'Home', meta: { requiresAuth: true } },
  { path: '/search', component: SearchPage, name: 'search', meta: { requiresAuth: true } },
  { path: '/addRecipes', component: addRecipes, name: 'addRecipes', meta: { requiresAuth: true } },
  { path: '/settings', component: settings, name: 'settings', meta: { requiresAuth: true } },
  { path: '/recipeDetails/:id', component: recipeDetails, name: 'recipeDetails', meta: { requiresAuth: true } },
  { path: '/myRecipes', component: myRecipes, name: 'myRecipes', meta: { requiresAuth: true } },
  { path: '/bookmark', component: bookmark, name: 'bookmark', meta: { requiresAuth: true } }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
