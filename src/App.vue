<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="left-text">
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
  </div>

  <div id="center-text">
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
  </div>

  <div id="right-text">
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
  </div>

  <!-- <Navbar /> -->

  <RouterView v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </RouterView>

  <Footer />
</template>

<script>
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'
</script>

<style scoped>
#left-text,
#center-text,
#right-text {
  position: fixed;
  top: 0;
  height: 100vh;
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  overflow: hidden;
}

#left-text {
  left: 0;
  width: 33vw;
}

#center-text {
  left: 33vw;
  width: 33vw;
}

#right-text {
  left: 66vw;
  width: 33vw;
}

#left-text h1,
#center-text h1,
#right-text h1 {
  transform: rotate(var(--text-rotation));
  font-size: 13vw;
  color: var(--secondary-color);
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  user-select: none;
}

/* Simple fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
