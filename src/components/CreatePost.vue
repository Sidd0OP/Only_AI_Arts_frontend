<template>
	<button id="post-button" @click="handlePost">
      
      <div id = "icon-container">
        <div id = "inner">
          <img src="@/assets/upload-svg.svg" id="upload-icon" alt="Upload">
        </div>
        
      </div>
        
        <div id = "text-container">
          <p id = "big">Create Post</p>
          <p id = "small">Upload Images or Gifs</p>
        </div>
        

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

	#post-button
  {
    position: fixed;
    top: 100px; 
    left: 50%;
    transform: translateX(28vw); 
    width: 18vw;
    border-radius: 17px;
    border: 1px solid #222222;
    color: white;
    height: 80px;
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 10px;
    padding-right: 20px;
    background: var(--secondary-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    
  }


  #icon-container{
    width: 80px;
    height: 60px;
    background: #833AB4;
    background: linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, 
      rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);
    border: 1px solid #222222;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
  }

  #icon-container:hover{
    padding: 2px;
  }

  #inner{
    background-color: var(--bg-color);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 1px;
  }

  #text-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 10px;
    padding-left: 20px;
  }

  #big{

    font-family: 'Inter', sans-serif;
    font-weight: bold;
    font-size: 1.3rem;
  }

  #small{
    opacity: 60%;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 0.6rem;
  }

  #upload-icon{
    height: 25px;
    width: 25px;
  }
	
</style>