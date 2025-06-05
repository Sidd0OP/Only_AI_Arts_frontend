<template>
  <Navbar />
  <main>
    <div id = "container">
      
      <PostSnippet v-if="post" :post = post />

      <Comment  v-for= "comment in comments" :comment = comment />
      
      <div  v-if="similarPosts" id="heading-container">
        <p>Similar Posts</p>
      </div>

      <PostSnippet  v-for= "post in similarPosts" :post = post />

      

      <div id="heading-container">
        <p>Trending Posts</p>
      </div>

    </div>
  </main>
  
</template>


<script>
import axiosObj from '../axios-config';
import Navbar from '../components/Navbar.vue'
import Comment from '../components/Comment.vue'
import PostSnippet from '../components/PostSnippet.vue'

export default {
  components: {
    Navbar,
    PostSnippet,
    Comment
  },

  data() {
    return {
      post: null,
      similarPosts: null,
      postData: null,
      comments: []
    };

  },



  mounted() {
    const postId = this.$route.params.id;
    this.fetchPost(postId);
  },

  methods: {

    async fetchPost(postId) {
      
      const response = await axiosObj.get(`/post/${postId}`);
      this.post = response.data.post
      this.similarPosts = response.data.similarPosts
      this.comments = response.data.discussion

      console.log(this.comments);
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
</style>
