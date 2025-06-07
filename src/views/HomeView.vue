<template>

  <Navbar />
  <main>
    <div id = "container">
      <div id="heading-container">
        <p>Top Images Today</p>
      </div>
      <PostSnippet  v-for= "post in posts" :post = post />
    </div>

    <button id="post-button" @click="handlePost">
      
      <div id = "icon-container">
        <div id = "inner">
          <img src="@/assets/upload-svg.svg" id="upload-icon" alt="Upload">
        </div>
        
      </div>
        
        <div id = "text-container">
          <p id = "big">Create Post</p>
          <p id = "small">Use your favourite AI model</p>
        </div>
        

    </button>

    <div id = "latest-container">
      
    </div>

    <div id = "button_container">
      <button id = "load-more-button" @click="loadMorePosts">load More</button>
    </div>
  </main>

</template>


<script>
import axiosObj from '../axios-config';
import Navbar from '../components/Navbar.vue'
import PostSnippet from '../components/PostSnippet.vue'

export default {
  components: {
    Navbar,
    PostSnippet
  },


  data() {
    return {
      posts: [],
      page: 1,         
      usingSnippetsApi: false,
      userLoggedIn: false
    }
  },

  mounted() {
    this.fetchPosts()
    this.checkLoginStatus()
  },

  methods: {
    async fetchPosts() {
      try {

        
        const response = await axiosObj.get('/home');

        
        this.posts = response.data.postSnippets;

      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    },


    async loadMorePosts() {
      try {
        this.usingSnippetsApi = true;
        const response = await axiosObj.get(`/snippets/${this.page}`);
        const newPosts = response.data;


        this.posts.push(...newPosts);
        this.page++;

        
        if (newPosts.length === 0) {
          this.hasMore = false;
        }
      } catch (error) {
        console.error('Error loading more posts:', error);
      }
    },


    async checkLoginStatus() {
        try {

          
          const response = await axiosObj.get('/user');

          if(response.data.userId === null){

            userLoggedIn = false;

          }else{

            
            this.userLoggedIn = true;
          }

        } catch (error) {
          console.error('Error fetching user Data:', error)
        }
    },

    

    handlePost(){

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

  #heading-container{
    background-color: var(--bg-color);
    border-radius: 15px;
    border: 1px solid #222222;
    padding: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    z-index: 10;
    text-stroke: 2px red;

  }

  #heading-container p
  {
    -webkit-text-stroke: 1px #FF2160;
    color: var(--bg-color);
    font-family: 'Inter', sans-serif;
    font-size: 32px;
  }

  #container
  {
    padding-top: 100px;
    width: 60vw;
    max-width: 700px;
    background-color: #000000;
    text-align: center;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 30px;

  }

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
    background: var(--bg-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    
  }


  #icon-container{
    width: 80px;
    height: 60px;
    background: #833AB4;
    background: linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);
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
  

  #image-reference{
    width:100px;
    height: 50px;
    border-radius: 5px;
    background-image: url('../assets/upload-background.png'); 
    border: 2px solid #222222;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  #upload-icon{
    height: 25px;
    width: 25px;
  }

  #latest-container
  {
    position: fixed;
    top: 210px; 
    left: 50%;
    transform: translateX(28vw); 
    
    width: 18vw;
    background-color: var(--bg-color);  
    border-radius: 15px;
    
    border: 1px solid #222222;
    color: white;
    height: 60%;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
  }


  #button_container
  {
    position: relative;
    width: 100%;
    height: 79px;
    background: var(--bg-color);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 1px 1px 1px 1px;

  }

</style>
