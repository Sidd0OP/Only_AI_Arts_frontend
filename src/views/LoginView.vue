<template>
  <div id="login-page">
    <div id = "logo-containre">
      <img id = "logo" src= "/OnlyAiArtsLogo.png">
    </div>
    
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


        <button id = "google" @click.prevent = "googleSignUp">
          <img src="@/assets/google.svg" id="google-icon" alt="google">
          <p>
            Log in with Google
          </p>
        </button>

        <div id = "option-container">
          <p id = "forgot" @click = "forgot" >Forgot Password ?</p>
          <p id = "new" @click = "register">New Here ?</p>
        </div>
        
        <button type="submit">Login</button>

        <button id = "skip" @click.prevent = "goToHome">
          
          <p>
            Skip
          </p>
          <img src="@/assets/arrow-right-circle.svg" id="google-icon" alt="google">
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>

    </div>

  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { googleSdkLoaded } from "vue3-google-login";
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
    
    const backResponse = await axiosObj.post('/login', formData);
         
    const response = await axiosObj.get('/user');
          
    if(response.data.userId === null){

      throw new Error("Validation Failed , wrong Password or Email");

      }else{

        router.push('/');
          
    }

        


    // if(!backResponse.data.userId && backResponse.data.userId == null)
    // {
    //   throw new Error("Validation Failed , wrong Password or Email");
      
    // }else{

    //   router.push('/');

    // }

    

  } catch (err) {

    console.log(err)
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

          try {

            const backResponse = await axiosObj.post('/auth/google' , {

                code: response.code,

            });

            

            const newFormData = new URLSearchParams()
            newFormData.append('username', backResponse.data.email)
            newFormData.append('password', backResponse.data.token)
            newFormData.append('remember-me', "true")

            try {
    
              const backResponse = await axiosObj.post('/login', newFormData);
              router.push('/');


              } catch (err) {

                error.value = err || 'Login failed'
                
          }
            

          } catch (err) {

            error.value = err || 'Login failed'

          }
          
          

          
          
        } else {
          error.value = "Google auth failed"
          console.error(response)
        }
      },
    })

    client.requestCode()
  })

}

const forgot = () => {
  router.push('/forgot')
}

const register = () => {

  router.push('/register')

}

const goToHome = () => {

  router.push('/')

}
</script>


<style scoped>
#login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: var(--bg-color);
  z-index: 10;
  gap: 20px;
}

#logo-container{
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#logo {

  width: 100px;
  height: 100px;
  
}

.login-card {
  background: #17100E;
  border-radius: 20px;
  width: 720px;
  height: 500px;
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

  height: 125%;

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
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 12px;
}

input:focus {
  outline: none;
  box-shadow: none;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 15px;
}

#google img {

  width: 20px;
  height: 20px;
}

#skip{

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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

#skip img{
  width: 20px;
  height: 20px;
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

#skip:hover{
  background-color: rgba(51, 51, 51, 0.85);
}

#forgot{
  cursor: pointer;
  color: #6495ED;
}

#new{
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 0.5rem;
}
</style>