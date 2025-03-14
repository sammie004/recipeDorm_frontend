import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/homeView.vue';
import AboutView from '../views/aboutview.vue';
import loginpage from '../views/loginPage.vue';
import register from '../views/register.vue';
// import path from 'path';


const routes = [
  { path: '/home', component: HomeView, name: 'Home' },
  { path: '/about', component: AboutView, name: 'About' },
  {path: '/login', component: loginpage, name: 'login'},
  {path: '/register', component: register, name: 'register'},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
