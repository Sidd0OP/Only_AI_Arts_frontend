<template>
  <div id="login-page">
    <div class="login-card">
      

      <div id = "vid-container">
        <video autoplay muted loop id="bgVideo">
        <source src="/video.mp4" type="video/mp4">
      </video>
      </div>
      

      <div id = "form-container">

        <p v-if="!showTokenBox" >Email</p>
        <input v-if="!showTokenBox" v-model="email" type="email" placeholder="Email" required />

        <p v-if="showTokenBox" >Secret Token</p>
        <input v-if="showTokenBox" v-model="token" type="text-container" placeholder="Secret Token" required />

        <p v-if="showTokenBox" >New Password</p>
        <input v-if="showTokenBox" v-model="password" type="password" placeholder="Password" required />
        <p v-if="showTokenBox" >Confirm New Password</p>
        <input v-if="showTokenBox" v-model="confirmPassword" type="password" placeholder="Confirm Password" required />

        
        
        <button v-if="!showTokenBox" @click = "getToken" >Submit</button>

        <button v-if="showTokenBox" @click = "submitNewDetails" >Change</button>

        <p v-if="error" class="error">{{ error }}</p>

      </div>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axiosObj from '../axios-config';

const email = ref('')
const token = ref('')

const password = ref('')
const confirmPassword = ref('')

const error = ref('')
const router = useRouter()
const showTokenBox = ref(false)

const getToken = async () => {
  error.value = ''

  try {
    

    await axiosObj.post('/token', {email: email.value})
    .then(() => {
      
      showTokenBox.value = true

    })

  } catch (err) {

    error.value = 'Email invalid or does not exist'
  }

  
}


const submitNewDetails = async () => {
  error.value = '';

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  try {
    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('token', token.value);
    formData.append('newPassword', password.value);

    await axiosObj.post('/reset', formData);

    router.push('/login');
  } catch (err) {
    error.value = err.response?.data?.message || 'Reset failed';
  }
};



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
input[type="text-container"],
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