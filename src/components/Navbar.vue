<template>
  <nav class="navbar">
    <ul>
      
      <img id = "logo" src= "/OnlyAiArtsLogo.png" @click="goToHomePage">

      <div id = "search-bar-container">
        <input id = "search-box" type="text" placeholder="Search">

        <div id = "icon-container">
          <img src="@/assets/search.svg" id="search-icon" alt="Search">
        </div>
      </div>


      
      <div id = "left-container">
        
        <div id = "profile-image-container" @click="goToProfilePage" v-if="userLoggedIn">
          <img :src = "getProfileUrl()">
        </div>
        
        <button id = "login-button" type="button" @click="goToLoginPage" v-if="!userLoggedIn">
        <img src="@/assets/log-in.svg" id="login-icon" alt="Login">
         <p>Log in</p>
        </button>
        <button id = "register-button" type="button" @click="goToRegisterPage" v-if="!userLoggedIn">
        <img src="@/assets/peace-hand.svg" id="login-icon" alt="Login">
         <p>Sign up</p>
        </button>
      </div>


    </ul>
  </nav>
</template>

<script>
  import axiosObj from '../axios-config';



  export default {

    name: 'Navbar',

    data() {
      return {
        userLoggedIn: true,
        userId: null,
        profileUrl: null

      }
    },

    async mounted() {
      await this.checkLoginStatus()
      this.$emit('login-status-checked')
    },

    computed: {

   

    },


    methods: {


      async checkLoginStatus() {
        try {

          
          const response = await axiosObj.get('/user');
          
          if(response.data.userId === null){

            this.userLoggedIn = false;

            console.log(false)

          }else{

            this.userId = response.data.userId;
            this.profileUrl = response.data.profilePhotoUrl
            this.userLoggedIn = true;
          }

        } catch (error) {
          this.userLoggedIn = false;
          console.error('Error fetching posts:', error)
        }
      },

      getProfileUrl(){

        return this.profileUrl ?? "/DefaultProfilePic.png"
      },

      goToProfilePage() {
        this.$router.push(`/profile/${this.userId}`);
      },

      goToHomePage() {
        this.$router.push('/');
      },

      goToLoginPage() {
        this.$router.push('/login');
      },

      goToRegisterPage() {
        this.$router.push('/register');
      }
    }

  }
</script>

<style scoped>

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #000000;
  padding: 0.5rem;
  border-color: #4D4D4D;
  border-width: 0px 0px 2px 0px; 
  border-style: solid;
  box-sizing: border-box;
  z-index: 1000;

}
.navbar ul {
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  padding-right: 36px;
}

#logo {

  scale: 0.7;
  cursor: pointer;
}

#profile-image-container{
  width: 45px;
  height: 45px;
  border-radius: 100px;
  background-color: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  background: contain;
}

#profile-image-container img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;

}

#left-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}


#post-button {

  background-color: #0F0F0F;
  color: white;
  border-radius: 100px;
  border: 1px solid rgba(107, 107, 107, 0.3);
  width: 125px;
  height: 45px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 22px;
  
}

#login-button{

  background-color: var(--bg-color);
  color: white;
  border-radius: 10px;
  border: 2px solid rgba(107, 107, 107, 0.3);
  width: 125px;
  height: 45px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 15px;
  transition: background-color 0.2s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

#login-button img{

  width: 20px;
  height: 20px;
}


#login-button:hover{
   background-color: var(--secondary-color);
}

#register-button{

  background-color: var(--bg-color);
  color: white;
  border-radius: 10px;
  border: 2px solid var(--tertiary-color);
  width: 125px;
  height: 45px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 15px;
  transition: background-color 0.2s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
}


#register-button img{

  width: 20px;
  height: 20px;
}

#register-button:hover{
   background-color: var(--tertiary-color);
}

#search-bar-container{

  position: fixed;
  width: 40%;
  height: 45px;
  overflow: hidden;
  background-color: var(--tertiary-color);
  border-radius: 10px;
  border: 1px solid #222222;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;

}

#icon-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-left: 10px;

}

#search-icon{
  height: 30px;
  width: 30px;
}

#search-box{
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  color: white;
  border: none;
  padding-left: 15px;
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 22px;
  border-left: 1px solid #222222;
}

input:focus {
  outline: none;
  box-shadow: none;
}


.navbar li a {
  color: white;
  text-decoration: none;
}
</style>
