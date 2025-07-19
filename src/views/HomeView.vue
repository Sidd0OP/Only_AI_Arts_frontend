<template>
  <div>
  <Navbar ref="navbar" @login-status-checked="onNavbarReady" />
  <div id="tag-container">
    <TrendingTagPill
      tag="All Topics"
      :isActive="activeTag === 'All'"
      @click="setActiveTag('All')"
    />

    <TrendingTagPill
    v-for="tag in trendingTags"
    :tag="tag"
    :isActive="activeTag === tag"
    @click="setActiveTag(tag)"
    />
  </div>
  <SidePanel />
  <main>
    <div id = "container">
  

      <div id="heading-container">
        <p>Top 5 Art Tools Everyone’s Loving Right Now</p> 
      </div>
      <div id="heading-container">    
        
        <div id="model-container">
          <ModelDisplay
          v-for="(tool, index) in trendingTools"
          :key="tool"
          :number="index + 1"
          :iconName="tool"
        />
        </div>
        
        
      </div>
      
      <PostSnippetSkeleton v-if = "show"/>
      <PostSnippetSkeleton v-if = "show"/>
      <PostSnippetSkeleton v-if = "show"/>
      <PostSnippetSkeleton v-if = "show"/>

      <PostSnippet  v-for= "post in posts" :post = post :hearts="hearts" :page="page"/>
    </div>

    

    <!-- <div id = "latest-container">
      <p>Recent Posts</p>
    </div> -->

    <div id = "button_container">
      <button id = "load-more-button" @click="loadMorePosts">load More</button>
    </div>
    
  </main>

  
</div>
</template>


<script>
import axiosObj from '../axios-config';
import Navbar from '../components/Navbar.vue'
import ModelDisplay from '../components/ModelDisplay.vue'
import PostSnippet from '../components/PostSnippet.vue'
import PostSnippetSkeleton from '../components/PostSnippetSkeleton.vue'
import Footer from '../components/Footer.vue'
import CreatePost from '../components/CreatePost.vue'
import SidePanel from '../components/SidePanel.vue'
import TrendingTagPill from '../components/TrendingTagPill.vue'
import throttle from 'lodash/throttle';
import homeState from '../state/homeState.js';


export default {
  components: {
    Navbar,
    PostSnippet,
    PostSnippetSkeleton,
    Footer,
    CreatePost,
    SidePanel,
    TrendingTagPill,
    ModelDisplay
  },


  data() {
    return {
      posts: [],
      page: 1,         
      usingSnippetsApi: false,
      userLoggedIn: false,
      show: true,
      isLoading: false,
      hearts: [],
      trendingTags: [],
      trendingTools: [],
      activeTag: 'All',
      hasMore: true,
      throttledScroll: null
    }
  },

  
  mounted() {

    // window.removeEventListener('scroll', this.handleScroll);

  },

  
  beforeUnmount() {
    console.log("brefore unmount called");
    window.removeEventListener('scroll', this.handleScroll);
  },


  methods: {

    setActiveTag(tag) {
      if (this.activeTag === tag) return;

      this.activeTag = tag;
      
      this.page = 0;
      this.posts = [];
      this.show = true;
      this.hasMore = true

      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });

      this.page = tag === 'All' ? 1 : 0;

      if (tag === 'All') {
        this.fetchPosts();  
      } else {
        this.fetchPostsByTag(this.activeTag, this.page);
      }

    },

    async onNavbarReady()
    {

      this.userLoggedIn = this.$refs.navbar.userLoggedIn;
      await this.fetchPosts()

      


    },

    async fetchPosts() {
      try {

        
        const response = await axiosObj.get('/home');

        this.posts = response.data.postSnippets;
        this.show = false;

        this.hearts = response.data.heartedPost;
        this.trendingTags = response.data.trendingTags;
        this.trendingTools = response.data.trendingTools;

        window.scrollTo({ top: 0, behavior: 'instant' });
      
        if (this.$route.name === 'home') {
          window.addEventListener("scroll", this.handleScroll)
        }

      } catch (error) {
        console.error('Error fetching posts:', error)
      }


      
    },


    async fetchPostsByTag(tag, page = 1) {
      try {
          const response = await axiosObj.get(`/tags/${tag}/${page}`);

          const newPosts = response.data; 

          

          this.posts = newPosts;
          this.page = page;
          this.show = false;
          this.hasMore = newPosts.length > 0;

        } catch (error) {
          console.error(`Error fetching posts for tag "${tag}" at page ${page}:`, error);
        }
    },


    async loadMorePosts() {
      if (this.isLoading || !this.hasMore) return;

      this.isLoading = true;
      try {
        const response = await axiosObj.get(`/snippets/${this.page}`);
        const newPosts = response.data;

        this.posts.push(...newPosts);
        this.page++;
        this.hasMore = newPosts.length > 0;

        

      } catch (error) {
        console.error('Error loading more posts:', error);
      } finally {
        this.isLoading = false;
      }
    },


    async loadMoreTagPosts() {
      if (this.isLoading || !this.hasMore) return;

      this.isLoading = true;
      try {
        const response = await axiosObj.get(`/tags/${this.activeTag}/${this.page}`);
        const newPosts = response.data;

        this.posts.push(...newPosts);
        this.page++;
        this.hasMore = newPosts.length > 0;
      } catch (error) {
        console.error('Error loading more tag posts:', error);
      } finally {
        this.isLoading = false;
      }
    },



    handlePost(){

      if(this.userLoggedIn){
        this.$router.push('/create');
      }else{
        this.$router.push('/login');
      }
    },

    handleScroll() {
      if (this.$route.name !== 'home') return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (!this.hasMore || this.show || this.isLoading) return;

      const scrolledPercentage = (scrollTop + windowHeight) / fullHeight;


      if (scrollTop + windowHeight >= fullHeight - 100) {
        if (this.activeTag === "All") {
          console.log(this.page , scrollTop + windowHeight)
          this.loadMorePosts();
        }
      }



    }


  }


}
</script>


<style scoped>

  #tag-container{
    position: fixed;
    height: 120px;
    width: 100%;
    top: 0px;
    left: 100px;
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: start;
    padding-bottom: 15px;
    z-index: 100;
    background-color: var(--bg-color);
    gap: 16px;

    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
  }


  #tag-container::-webkit-scrollbar {
    display: none; /* Chrome/Safari/Edge */
  }
    
  

  #heading-container{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    background-color: var(--bg-color);
    border-radius: 15px;
    /*border: 1px solid #222222;*/
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    width: 100%;
    z-index: 10;
    overflow-x: auto;   
    overflow-y: hidden;     
    white-space: nowrap;
    -ms-overflow-style: none;  
    scrollbar-width: none;

  }


  #heading-container p{

    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-bold);
    font-size: 20px;
    color: white;

  }


  

  #sub-container p{

    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-medium);
    font-size: 24px;
    color: white;
  }

  

  #model-container{
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 40px;
  }

  

  #container
  {
    padding-top: 150px;
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
    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 16px;
    transition: background-color 0.2s ease;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;

  }


  @media (min-width: 768px) and (max-width: 1024px){
    
     
     
    
  }

  @media (max-width: 767px) {
  
    #heading-container p
    {
      font-size: 32px;
    }
  

    #heading-container {
      background-color: var(--bg-color);
      border-radius: 0px;
      border: none;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      max-width: 100vw;
      height: auto;
      z-index: 10;
      gap: 2px;
      overflow-x: auto;        
      white-space: nowrap;
    }

    #container
    {
      padding-top: 120px;
      width:100%;
      max-width: 100%;
      background-color: #000000;
      text-align: center;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 0px;

    }

    #sub-container p{

    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-medium);
    font-size: 16px;
    color: white;
  }


    #tag-container{
      position: fixed;
      height: 120px;
      width: 100%;
      top: 0px;
      left: 0px;
      display: flex;
      flex-direction: row;
      align-items: end;
      justify-content: start;
      padding-bottom: 15px;
      padding-left: 16px;
      padding-right: 16px;
      z-index: 100;
      background-color: var(--bg-color);
      gap: 14px;

      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;
  }


     #heading-container p{

      font-family: var(--font-family-poppins);
      font-weight: var(--font-weight-bold);
      font-size: 14px;
      color: white;
      padding-left: 20px;

    }


  }


  

  

</style>
