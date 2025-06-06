<template>
  <div id="login-page">
    <div class="login-card">
      

      <div id = "vid-container">
        <video autoplay muted loop id="bgVideo">
        <source src="/video.mp4" type="video/mp4">
      </video>
      </div>
      

      <form id = "form-container" @submit.prevent="handleLogin">
        <p>Email</p>
        <input v-model="email" type="email" placeholder="Email" required />
        <p>Password</p>
        <input v-model="password" type="password" placeholder="Password" required />
        
        <label class="remember-me">
          <input type="checkbox" v-model="rememberMe" />
          Remember Me
        </label>

        <p class="or-text">Or</p>


        <button id = "google">Log in with Google</button>

        <div id = "option-container">
          <p>Forgot Password ?</p>
          <p>New Here ?</p>
        </div>
        
        <button type="submit">Login</button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axiosObj from '../axios-config';

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
    axiosObj.post('/login', formData)
    .then(() => {

      console.log("login sent");

    })

  } catch (err) {
    error.value = err || 'Login failed'
  }

  router.push('/')
}
</script>


<style scoped>
#login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: var(--bg-color);
  z-index: 10;

}

.login-card {
  background: #17100E;
  border-radius: 20px;
  width: 720px;
  height: 450px;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
}

#vid-container
{
  width: 60%;
  height: 100%;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}

#bgVideo{

  height: 100%;

}


#form-container{

  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  gap: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 12px;
  color: #888888;

}

#form-container > p.or-text {
  align-self: center;

}

input[type="email"],
input[type="password"] {

  width: 100%;
  background-color: rgba(187, 187, 187, 0.15);  
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(136, 136, 136, 0.1);
}

.remember-me {
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #888888;
  
}

.remember-me input {
  margin-right: 0.5rem;
  color: #888888;
}

#option-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; 
}


#google {
  width: 100%;
  background-color: rgba(187, 187, 187, 0.15);  
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(136, 136, 136, 0.1);
  cursor: pointer;
}

button {
  width: 100%;
  padding: 0.7rem;
  border: none;
  width: 100%;
  background-color: #333333;  
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(136, 136, 136, 0.1);
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: rgba(51, 51, 51, 0.85);

}

.error {
  color: red;
  margin-top: 0.5rem;
}
</style>