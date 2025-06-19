<template>

  <Navbar @login-status-checked="onNavbarReady" />
  <main>
    <div id = "container">
      <div id="heading-container">
        <p>Top Images Today</p>
      </div>
      
      <PostSnippetSkeleton v-if = "show"/>
      <PostSnippetSkeleton v-if = "show"/>
      <PostSnippetSkeleton v-if = "show"/>
      <PostSnippetSkeleton v-if = "show"/>

      <PostSnippet  v-for= "post in posts" :post = post />
    </div>

    <CreatePost />

    <div id = "latest-container">
      <p>Recent Posts</p>
      
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
import PostSnippetSkeleton from '../components/PostSnippetSkeleton.vue'
import Footer from '../components/Footer.vue'
import CreatePost from '../components/CreatePost.vue'


export default {
  components: {
    Navbar,
    PostSnippet,
    PostSnippetSkeleton,
    Footer,
    CreatePost
  },


  data() {
    return {
      posts: [],
      page: 1,         
      usingSnippetsApi: false,
      userLoggedIn: false,
      show: true

    }
  },

  async mounted() {

    
    
  },

  


  methods: {

    async onNavbarReady()
    {
      await this.checkLoginStatus()
      await this.fetchPosts()
    },

    async fetchPosts() {
      try {

        
        const response = await axiosObj.get('/home');

        this.posts = response.data.postSnippets;

        this.show = false;

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

            this.userLoggedIn = false;

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
    padding-left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    z-index: 10;
    

  }

  #heading-container p
  {
    -webkit-text-stroke: 2px #FF2160;
    color: var(--bg-color);
    font-family: 'Inter', sans-serif;
    font-size: 48px;
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 1px 1px 1px 1px;

  }


  #load-more-button{

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

  

</style>
