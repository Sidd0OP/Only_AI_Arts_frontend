<template>
  <div id="register-page">

    <div id = "logo-containre">
      <img id = "logo" src= "/OnlyAiArtsLogo.png">
    </div>

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

        <small>
          *  At least 8 characters long<br>
          *  At least one uppercase & lowercase English letter<br>
          *  At least one digit<br>
          *  At least one special character (e.g., !@#$%^&*)
        </small>

        <input 
        v-model="password" 
        type="password" 
        placeholder="Password" 
        required 
        @focus="isPasswordFocused = true"
        @blur="isPasswordFocused = false"
        :class="{ 'input-error': passwordMismatch }"/>



        <p>Confirm Password</p>

        <input 
        v-model="confirmPassword" 
        type="password" 
        placeholder="Confirm Password" 
        required
        @focus="isConfirmFocused = true"
        @blur="isConfirmFocused = false"
        :class="{ 'input-error': passwordMismatch }"  />

        <button type="submit">Register</button>

        <p class="or-text">Or</p>


        <button id = "google" @click.prevent = "googleSignUp">
          <img src="@/assets/google.svg" id="google-icon" alt="google">
          <p>
            Register with Google
          </p>
        </button>

        <div id = "option-container">
          <p id = "login-redirect" @click.prevent = "login">Already Registered ?</p>
        </div>
        
        

        <div id = "error-container">
          <p v-if="error" class="error">{{ error }}</p>
        </div>
        

      </form>

    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
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

const isPasswordFocused = ref(false)
const isConfirmFocused = ref(false)

const router = useRouter()



const passwordMismatch = computed(() =>
  password.value &&
  confirmPassword.value &&
  password.value !== confirmPassword.value &&
  !isPasswordFocused.value &&
  !isConfirmFocused.value
)

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
    
    console.log(response)

    if(response.data === "Created")
    {
      router.push('/login')
    }
    
    

  } catch (err) {
    error.value = 'Invalid Data'
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
                
                console.log("redirecting");
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


const login = () => {

  router.push('/login')

}
</script>


<style scoped>
#register-page {
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

.register-card {
  background: #17100E;
  border-radius: 20px;
  height: 600px;
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
  height: 100%;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}

#bgVideo{

  height: 800px;
  object-fit: cover;

}


#form-container{

  
  width: 40%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  gap: 10px;
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

small {
  font-size: 9px;        
  color: #888888;         
  line-height: 1.3;
  display: block;
  margin-top: 2px;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  background-color: rgba(187, 187, 187, 0.15);  
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(136, 136, 136, 0.1);
  cursor: pointer;
}

#google img {

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

#login-redirect{
  cursor: pointer;
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


@media (max-width: 767px) {

    #vid-container{
      display: none;
    }

    #register-page {
      padding-top: 50px;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      height: auto;
      width: 100%;
      background: var(--bg-color);
      z-index: 10;
      gap: 50px;
      padding-bottom: 30px;
    }








    .register-card {
      background: #17100E;
      border-radius: 20px;
      padding-top: 40px;
      width: 340px;
      height: 640px;
      color: #fff;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }


    #form-container{

      width: 100%;
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

  }

</style>