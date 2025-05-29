<template>

  <Navbar />
  <main>
    <div id = "container">
    <PostSnippet
      v-for= "post in posts" :title = post.title :body = post.body :name = post.userName
    />
    </div>
    <div id = "button_container">
      <button>load More</button>
    </div>
  </main>

</template>


<script>
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
import PostSnippet from '../components/PostSnippet.vue'

export default {
  components: {
    Navbar,
    PostSnippet
  },


  data() {
    return {
      posts: []
    }
  },

  mounted() {
    this.fetchPosts()
  },

  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:8080/home')
        this.posts = response.data.postSnippets




      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    },

  }


}
</script>


<style scoped>
  #container
  {
    padding-top: 100px;
    width: 60vw;
    max-width: 750px;
    background-color: #000000;
    text-align: center;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  #button_container
  {
    position: relative;
    width: 100%;
    height: 79px;
    background: red;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 1px 1px 1px 1px;
  }

</style>
