<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

  <div id = "left-text">
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
  </div>

  <div id = "center-text">
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
  </div>

  <div id = "right-text">
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
    <h1>Ai</h1>
  </div>

  <RouterView />

</template>

<style scoped>

  header {
    line-height: 1.5;
    max-height: 100vh;
  }

  

  #left-text
  {
    position: fixed;
    top: 0;
    left: 0;
    width: 33vw;
    height: 100vh;
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    overflow: hidden;
    
  }

  #center-text {
    position: fixed;
    margin-left: 33vw; 
    top: 0;
    left: 0;
    width: 33vw;
    height: 100vh;
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    overflow: hidden;
  }

  #right-text {
    position: fixed;
    margin-left: 66vw; 
    top: 0;
    left: 0;
    width: 33vw;
    height: 100vh;
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    overflow: hidden;
  }

  #left-text h1,
  #center-text h1,
  #right-text h1 {


  transform: rotate(var(--text-rotation));
  font-size: 13vw; 
  color: var(--text-color);
  opacity: var(--text-opacity);
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  user-select: none;
}

</style>
