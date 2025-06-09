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
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" 
        :class="{ 'input-error': passwordMismatch }" required />


        <p class="or-text">Or</p>


        <button id = "google" @click = "googleSignUp">Log in with Google</button>

        <div id = "option-container">
          <p>Already Registered ?</p>
        </div>
        
        <button type="submit">Register</button>

        <div id = "error-container">
          <p v-if="error" class="error">{{ error }}</p>
        </div>
        

      </form>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { googleSdkLoaded } from "vue3-google-login";
import axiosObj from '../axios-config';


const confirmPassword = ref('')
const passwordMatch = ref(false)

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const rememberMe = ref(false)

const router = useRouter()

const handleLogin = async () => {
  error.value = ''

  const formData = new URLSearchParams()
  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('password', password.value)

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    passwordMatch.value = false
    return
  }
 

  try {
    const response = await axiosObj.post('/register' , formData);
    
    
    router.push('/login')

  } catch (err) {
    error.value = err || 'Login failed'
  }



}


const googleSignUp = () => {
  googleSdkLoaded((google) => {
    const client = google.accounts.oauth2.initCodeClient({
      client_id: "595331401098-ivrdldf0i9mtas5tpf6gq0flph3kj1on.apps.googleusercontent.com",
      scope: "email",
      callback: async (response) => {
        if (response.code) {

          console.log(response);
          
          const backResponse = await axiosObj.post('/auth/google' , {
            code: response.code,
          });

          
          
        } else {
          console.error("Google auth failed:", response  , backResponse)
        }
      },
    })

    client.requestCode()
  })
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

  color: white;
  width: 100%;
  background-color: rgba(187, 187, 187, 0.15);  
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(136, 136, 136, 0.1);
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 12px;
}

input:focus {
  outline: none;
  box-shadow: none;
}

input[type="password"].input-error {
  border: 1px solid red !important;
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

#error-container{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error {
  color: red;
  margin-top: 0.5rem;
}


</style>