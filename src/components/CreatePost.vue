<template>
	<button id="post-button" @click="handlePost">
      
      
        <img src="@/assets/plus.svg" id="upload-icon" alt="Upload">
    
  </button>
</template>


<script>
	
import axiosObj from '../axios-config';



export default {

  name: 'CreatePost',


  data() {
    return {
 
      userLoggedIn: false,
      
    }
  },

  

  methods: {

    


    async checkLoginStatus() {
        try {

          
          const response = await axiosObj.get('/user');

          if(response.data.userId === null){

            this.userLoggedIn = false;

          }else{

            
            this.userLoggedIn = true;
          }

        } catch (error) {
          this.userLoggedIn = false;
          console.error('Error fetching user Data:', error)

        }
    },

    

    async handlePost(){

      await this.checkLoginStatus();

      if(this.userLoggedIn){
        this.$router.push('/create');
      }else{
        this.$router.push('/login');
      }
    }

  }


}
</script>

<style scoped>

  #post-button{
    background-color: var(--secondary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 10px;
    transition: 0.4s ease;
    border: none;
    cursor: pointer;
  }

  #post-button:hover{

    border-radius: 15px;
    background-color: var(--tertiary-color);

  }

  #upload-icon{
    height: 40px;
    width: 40px;
  }
	
</style>