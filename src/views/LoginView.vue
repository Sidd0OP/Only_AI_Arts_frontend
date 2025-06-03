<template>
  <div id="login-page">
    <div class="login-card">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        
        <label class="remember-me">
          <input type="checkbox" v-model="rememberMe" />
          Remember Me
        </label>

        <button type="submit">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  const formData = new URLSearchParams()
  formData.append('username', email.value)
  formData.append('password', password.value)
  formData.append('remember-me', rememberMe.value)

  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })


   

    console.log(response);
    
    router.push('/')

  } catch (err) {
    error.value = err || 'Login failed'
  }
}
</script>


<style scoped>
#login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #111;
  z-index: 10;
}

.login-card {
  background: #222;
  padding: 2rem;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  color: #fff;
}

input[type="email"],
input[type="password"] {
  display: block;
  width: 100%;
  margin: 1rem 0;
  padding: 0.7rem;
  border: none;
  border-radius: 5px;
}

.remember-me {
  display: flex;
  align-items: center;
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.remember-me input {
  margin-right: 0.5rem;
}

button {
  width: 100%;
  padding: 0.7rem;
  border: none;
  background-color: #3498db;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.error {
  color: red;
  margin-top: 0.5rem;
}
</style>