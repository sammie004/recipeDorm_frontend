import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/homeView.vue';
import AboutView from '../views/aboutview.vue';
import loginpage from '../views/loginPage.vue';
import register from '../views/register.vue';
import addRecipes from '../views/addRecipes.vue'
import recipeDetails from '../views/recipeDetails.vue'
import home from '../views/home.vue'
// import home from '../views/home.vue'
// import path from 'path';
import landingPage from '../views/landing.vue'
// import path from 'path';
// import path from 'path';


const routes = [
  {path: '/', component: home, name: 'homePage'},
  { path: '/home', component: HomeView, name: 'Home' },
  { path: '/about', component: AboutView, name: 'About' },
  {path: '/login', component: loginpage, name: 'login'},
  {path: '/register', component: register, name: 'register'},
  {path: '/addRecipes', component: addRecipes, name: 'addRecipes'},
  {path: '/landingPage', component: landingPage, name: 'landingPage'},
  {path: '/recipeDetails', component: recipeDetails, name: 'recipeDetails'}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
