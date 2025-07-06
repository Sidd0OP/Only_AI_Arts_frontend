<template>
  <nav class="navbar" :class="{ 'search-active': isSearchActive }">
    <ul>
      
      <img id = "logo" src= "/OnlyAiArtsLogo.png" @click="goToHomePage">

      <div id = "search-bar-container">

        <input id = "search-box" type="text" placeholder="Search" 
        @focus="isSearchActive = true"
        @input="handleInput"
        @keydown.enter="handleEnter"
        v-model="searchText">

        <div id = "icon-container">
          <img v-if="!isSearchActive" src="@/assets/search.svg" id="search-icon" alt="Search">
          <img v-if="isSearchActive" src="@/assets/xmark.svg" id="search-icon" alt="Search" @click="closeSearchBar">
        </div>

      </div>

      <teleport to="body">
        <div
          v-if="isSearchActive"
          id="search-result-container"
        >
          <div v-if="searchResults.length === 0" id = "icon-container">
            <img src="@/assets/lamp.svg" id="lamp-icon" alt="Empty">
          </div>
          <SearchResult
            v-for="result in searchResults"
            :key="result.postId"
            :postId="result.postId"
            :title="result.title"
            :imageUrl="result.imageUrl"
          />
        </div>
      </teleport>

      
      
      
      <div id = "left-container">
        


        <div id = "left-icon-container">
          <img v-if="!isSearchActive" src="@/assets/search.svg" id="search-icon" alt="Search" @click="isSearchActive = true">
          <img v-if="isSearchActive" src="@/assets/xmark.svg" id="search-icon" alt="Search" @click="closeSearchBar">
        </div>

        <div id = "profile-image-container" @click="goToProfilePage" v-if="userLoggedIn">
          <img :src = "getProfileUrl()">
        </div>

        <button id = "register-button" type="button" @click="goToRegisterPage" v-if="!userLoggedIn">
          <img src="@/assets/peace-hand.svg" id="login-icon" alt="Login">
          <p>Sign up</p>
        </button>
        
        <button id = "login-button" type="button" @click="goToLoginPage" v-if="!userLoggedIn">
          <img src="@/assets/log-in.svg" id="login-icon" alt="Login">
          <p>Log in</p>
        </button>

        

      </div>


    </ul>
  </nav>
</template>

<script>
  import axiosObj from '../axios-config';
  import SearchResult from './SearchResult.vue'


  export default {

    name: 'Navbar',

    components: {
      SearchResult,
    },

    data() {
      return {
        userLoggedIn: true,
        userId: null,
        profileUrl: null,
        isSearchActive: false,
        searchText: '',
        searchResults: []

      }
    },

    async mounted() {
      await this.checkLoginStatus()
      this.$emit('login-status-checked')
    },

    methods: {

      closeSearchBar(){
        this.isSearchActive = false;
        this.searchText = '';
        this.searchResults = [];
      },


      async handleEnter() {
        const trimmed = this.searchText.trim();
        if (trimmed.length > 0) {
          await this.searchQuery(trimmed);
        }
      },
      async handleInput() {
        const trimmed = this.searchText.trim();
        if (this.searchText.slice(-1) === ' ' && trimmed.length > 0) {
          await this.searchQuery(trimmed);
        }
      },

      async searchQuery(query) {
        try {
          const response = await axiosObj.get(`/search/${encodeURIComponent(query)}`);
          this.searchResults = response.data;


        } catch (error) {
          console.error('Search Error', error);
        }
      },




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

#left-icon-container{
  display: none;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /*background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);*/
  padding: 0.5rem;
  box-sizing: border-box;
  padding-left: 30px;
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

  width: 30px;
  height: 30px;
  cursor: pointer;
}

#profile-image-container{
  width: 45px;
  height: 45px;
  border-radius: 100px;
  background-color: var(--bg-color);
  border: 1px solid #4D4D4D;
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
   background-color: var(--bg-color);
}

#register-button{

  background-color: white;
  color: white;
  border-radius: 10px;
  border: 2px solid var(--bg-color);
  width: 125px;
  height: 45px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 15px;
  color: black;
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


#search-bar-container{

  position: fixed;
  width: 40%;
  height: 45px;
  overflow: hidden;
  background-color: var(--bg-color);
  border-radius: 10px;
  border: 1px solid #222222;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  transition: all 0.3s ease-in-out;

}

#search-result-container{
  position: fixed;
  top: 80px;
  width: 40%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5); 
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid #222222;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  z-index: 1001;
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
  height: 25px;
  width: 25px;
}

#lamp-icon{
  height: 45px;
  width: 45px;
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


@media (min-width: 768px) and (max-width: 1124px){
    
      #left-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
      }


      #search-result-container{
        position: fixed;
        top: 60px;
        width: 100%;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.5); 
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 10px;
        border: 1px solid #222222;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        z-index: 1001;
      }

      #login-button{

        background-color: var(--bg-color);
        color: white;
        border-radius: 10px;
        border: 2px solid rgba(107, 107, 107, 0.3);
        width: 86px;
        height: 45px;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        font-weight: 800;
        font-size: 16px;
        transition: background-color 0.2s ease;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5px;

      }

      #login-button img{

        display: none;
      }


      #login-button:hover{
         background-color: var(--bg-color);
      }

    #register-button{

      background-color: white;
      color: white;
      border-radius: 10px;
      border: 2px solid var(--bg-color);
      width: 86px;
      height: 45px;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 15px;
      color: black;
      transition: background-color 0.2s ease;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }


    #register-button img{

      display: none;
    }


     
     
    
  }

  @media (max-width: 767px) {







    #left-icon-container{
      display: flex;
      padding: 10px;
    }


    #search-result-container{
      position: fixed;
      top: 60px;
      width: 100%;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.5); 
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 0px;
      border: 1px solid #222222;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      z-index: 1001;
    }


    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: var(--bg-color);
      padding: 0.5rem;
      box-sizing: border-box;
      padding-left: 15px;
      z-index: 1000;
    }

    .navbar ul {
  
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      padding-right: 10px;

    }

    #left-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
      }


    #login-button{

        background-color: var(--bg-color);
        color: white;
        border-radius: 10px;
        border: 2px solid rgba(107, 107, 107, 0.3);
        width: 80px;
        height: 45px;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        font-weight: 800;
        font-size: 12px;
        transition: background-color 0.2s ease;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5px;

      }

      #login-button img{

        display: none;
      }


    #login-button:hover{
      background-color: var(--bg-color);
    }

    #register-button{

      background-color: white;
      color: white;
      border-radius: 10px;
      border: 2px solid var(--bg-color);
      width: 80px;
      height: 45px;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 12px;
      color: black;
      transition: background-color 0.2s ease;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }


    #register-button img{

      display: none;
    }


    #search-bar-container{

      display: none;

    }

    .navbar.search-active #search-bar-container {



      width: 60%;
      border-radius: 100px;
      border: none;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;
      transition: all 0.3s ease-in-out;
      background-color: var(--secondary-color);
      display: flex;
      width: 90%;
      margin: 0 auto;
      position: relative;
      justify-content: center;
    }

    .navbar.search-active #login-button,
    .navbar.search-active #register-button,
    .navbar.search-active #profile-image-container {
      display: none;
    }


    .navbar.search-active ul {
  
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;
      gap: 0px;
      padding-right: 0px;

    }

    #search-box{
      width: 100%;
      height: 100%;
      background-color: var(--secondary-color);
      color: white;
      border: none;
      padding-left: 15px;
      text-align: left;
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 16px;
      border-left: none;
    }


  }
</style>
