<template>
  <footer class="footer">
    <div class="footer-content">
      <p>© 2025 OnlyAiArts. All rights reserved.</p>
      <p><strong>About</strong></p>

      <p>Hello fellow human , so.... I decided to make this for a simulator about trains lol (it's good tooke 8 months to make) . But then I realised nobody likes my simulator (cry) then somehow idk how I got the idea of making a website to make Humans and AI fight art . I used to do CGI and make renders in Blender 3D (Best Open Source Software ever!) and also do programming so this looked like the perfect summer project . I made this in a month , codes are opensource . Hope you like it , and choose your side AI or Human 😎</p>

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
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  color: #ccc;
  padding: 20px 40px;
  text-align: center;
  border: 1px solid #333;
  bottom: 0;
  z-index: 1000;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  width: 30px;
  height: 30px;
}

.footer-links a:hover {
  color: white;
}
</style>
