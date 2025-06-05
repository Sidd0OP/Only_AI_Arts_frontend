<template>

  <Navbar />
  <main>
    <div id = "container">
      <div id="heading-container">
        <p>Top Images Today</p>
      </div>
      <PostSnippet  v-for= "post in posts" :post = post />
    </div>

    <button id="post-button" @click="handlePost">Post</button>

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
    z-index: 10;

  }

  #heading-container p
  {
    color: white;
    font-family: 'Inter', sans-serif;
    font-weight: 1000;
    font-size: 36px;
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
    background-color: var(--bg-color);  
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border: 1px solid #222222;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    height: 80px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  #latest-container
  {
    position: fixed;
    top: 180px; 
    left: 50%;
    transform: translateX(28vw); 
    
    width: 18vw;
    background-color: var(--bg-color);  
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
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
