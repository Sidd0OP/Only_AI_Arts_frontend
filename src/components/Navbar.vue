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
  background-color: #333;
  padding: 1rem;
  box-sizing: border-box;
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
