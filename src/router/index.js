import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import PostView from '../views/PostView.vue'
import LoginView from '../views/LoginView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, },
    { path: '/post/:id', name: 'post', component: PostView,},
    { path: '/profile/:id', name: 'profile', component: ProfileView,},
    { path: '/login', name: 'login', component: LoginView,}


  ],
})


export default router
