import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import PostView from '../views/PostView.vue'
import LoginView from '../views/LoginView.vue'
import NewView from '../views/NewView.vue'
import RegisterView from '../views/RegisterView.vue'
import ResetView from '../views/ResetView.vue'
import ArtGallery from '../views/ArtGallery.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, },
    { path: '/post/:id/:title', name: 'post', component: PostView,},
    { path: '/profile/:id', name: 'profile', component: ProfileView,},
    { path: '/login', name: 'login', component: LoginView,},
    { path: '/create', name: 'create', component: NewView,},
    { path: '/register', name: 'register', component: RegisterView,},
    { path: '/forgot', name: 'forgot', component: ResetView,},
    { path: '/gallery', name: 'gallery', component: ArtGallery,}



  ],
})


export default router
