<template>
  <footer class="footer">
    <div class="footer-content">
      <p>© 2025 OnlyAiArts. All rights reserved.</p>

      <div class="footer-links">
          <img src="@/assets/github-circle.svg" id="Github-icon" alt="github">
          <img src="@/assets/youtube.svg" id="Youtube-icon" alt="youtube">
          <img src="@/assets/x.svg" id="X-icon" alt="x">
      </div>
      
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    goTo(route) {
      this.$router.push(`/${route}`);
    }
  }
}
</script>

<style scoped>

.footer {

  
  position: relative;
  background-color: var(--bg-color);
  width: 100%;
  color: #ccc;
  padding: 20px 40px;
  text-align: center;
  bottom: 0;
  z-index: 1000;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.footer-links {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
  
}

.footer-links img {
  opacity: 0.5;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.footer-links a:hover {
  color: white;
}
</style>
