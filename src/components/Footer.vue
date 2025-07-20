<template>
  <footer class="footer">
    <div class="footer-content">
      <p>© 2025 OnlyAiArts. All rights reserved.</p>

      <div class="footer-links">
      <a href="https://github.com/Sidd0OP" target="_blank" rel="noopener">
          GitHub
      </a>

      <a href="https://x.com/Sidd0p" target="_blank" rel="noopener">
        X (Twitter)
      </a>


      <a href="" target="_blank" rel="noopener">
        Policy
      </a>

      <a href="" target="_blank" rel="noopener">
        Terms and Condition
      </a>



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
  padding: 20px 30px;
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


.footer-content p 
{
  font-family: var(--font-family-poppins);
  font-weight: var(--font-weight-regular);
  font-size: 12px;
  opacity: 0.3;
  color: white;
}

.footer-links {
  width: 100%;
  padding: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 30px;
  
}

.footer-links a {
  font-family: var(--font-family-poppins);
  font-weight: var(--font-weight-regular);
  font-size: 10px;
  opacity: 0.4;
  color: white;
  text-decoration: none;
}

.footer-links a:hover {
  opacity: 1.0;
}


</style>
