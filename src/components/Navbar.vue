<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<style scoped>

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #000000;
  padding: 1rem;
  border-color: #4D4D4D;
  border-width: 0px 0px 2px 0px; 
  border-style: solid;
  box-sizing: border-box;
  z-index: 1000;
}
.navbar ul {
  list-style: none;
  display: flex;
  gap: 20px;
}
.navbar li a {
  color: white;
  text-decoration: none;
}
</style>
