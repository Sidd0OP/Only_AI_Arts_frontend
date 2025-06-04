<template>
  <div id="register-page">
    <div class="register-card">
      

      <div id = "vid-container">
        <video autoplay muted loop id="bgVideo">
        <source src="/video.mp4" type="video/mp4">
      </video>
      </div>
      

      <form id = "form-container" @submit.prevent="handleLogin">
        <p>Name</p>
        <input v-model="name" type="name" placeholder="Name" required />
        <p>Email</p>
        <input v-model="email" type="email" placeholder="Email" required />
        <p>Password</p>
        <input v-model="password" type="password" placeholder="Password" required />
        <p>Confirm Password</p>
        <input v-model="password" type="password" placeholder="********" required />


        <p class="or-text">Or</p>


        <button id = "google">Log in with Google</button>

        <div id = "option-container">
          <p>Already Registered ?</p>
        </div>
        
        <button type="submit">Register</button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  const formData = new URLSearchParams()
  formData.append('name', name.value)
  formData.append('username', email.value)
  formData.append('password', password.value)
 

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
#register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: var(--bg-color);
  z-index: 10;

}

.register-card {
  background: #17100E;
  border-radius: 20px;
  width: 720px;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
}

#vid-container
{
  
  width: 60%;
  height: 80%;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}

#bgVideo{

  height: 600px;
  object-fit: contain;

}


#form-container{

  
  width: 40%;
  height: fit-content;
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
input[type="name"],
input[type="password"] {

  width: 100%;
  background-color: rgba(187, 187, 187, 0.15);  
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(136, 136, 136, 0.1);
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