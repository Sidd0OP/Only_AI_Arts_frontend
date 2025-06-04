<template>

  <Navbar />
  <main>

    <div id = "container">
      <PostSnippet  v-for= "post in posts" :post = post />
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
      usingSnippetsApi: false 
    }
  },

  mounted() {
    this.fetchPosts()
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

        console.log(response);

        this.posts.push(...newPosts);
        this.page++;

        
        if (newPosts.length === 0) {
          this.hasMore = false;
        }
      } catch (error) {
        console.error('Error loading more posts:', error);
      }
    }

  }


}
</script>


<style scoped>
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
