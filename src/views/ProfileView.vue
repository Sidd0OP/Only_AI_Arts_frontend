<template>
  <Navbar />
  <div class="profile">
    <div id = "user-data-container">

      <div id = "profile-image-container">
        <img :src="url" />
        <img src="@/assets/edit-pencil.svg" id="heart-icon" alt="Heart">
      </div>
      <div id = "meta-data-container">
        <p id = "name">Name</p>
        <p id = "joined">Joined</p>
        <p id = "bio">Bio</p>
      </div>
      </div>
    </div>
    <div id = "user-post-container">
        <div id = "top-bar">
          <p :class="{ active: selectedTab === 'Post' }" @click="selectedTab = 'Post'">Post</p>
          <p :class="{ active: selectedTab === 'Comment' }" @click="selectedTab = 'Comment'">Comment</p>
          <p :class="{ active: selectedTab === 'Reply' }" @click="selectedTab = 'Reply'">Reply</p>
        </div>
        <div id = "container">
          <PostSnippet v-if="selectedTab === 'Post'" v-for= "post in posts" :post = post />
          <Comment v-if="selectedTab === 'Comment'" v-for="comment in comments" :comments="comment" />
          <Reply v-if="selectedTab === 'Reply'" v-for="reply in replies" :reply="reply" />
        </div>
        
    </div>
</template>


<script>
import axiosObj from '../axios-config';
import Navbar from '../components/Navbar.vue'
import PostSnippet from '../components/PostSnippet.vue'
import Comment from '../components/Comment.vue'
import Reply from '../components/Reply.vue'


export default {
  components: {
    Navbar,
    PostSnippet,
    Comment,
    Reply
  },


  data() {
    return{
      posts: [],
      comments: [],
      replies: [],
      selectedTab: 'Post',
    }
    
  },

  mounted() {
    
    this.fetchPost()

  },

  methods: {
    
    async fetchPost() {
      
      const response = await axiosObj.get(`/profile/${this.$route.params.id}`);
      this.posts = response.data.posts
      this.comments = response.data.comments
      this.replies = response.data.replies
      console.log(response.data.replies)

      
    }

  }


}
</script>

<style scoped>
  .profile{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-top: 100px;
    z-index: 20;
    gap: 30px;
  }

  #user-data-container{
    width: 100%;
    height: 40%;
    min-height: 250px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    padding-left: 50px;
    padding-bottom: 50px;
  }


  #profile-image-container{
    
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    background-color: gray;
    z-index: 22;
    display: flex;
    justify-content: center;
    align-items: center;

  }


  #meta-data-container{
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding-left: 50px;
  }

  #meta-data-container p {
    color: white;
    font-family: 'Inter', sans-serif;
    font-weight: 1000;
    font-size: 36px;
  }

  #user-post-container{
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 30;
  }

  #top-bar{
    position: sticky;
    top: 50px;
    width: 100%;
    background-color: var(--bg-color);
    border-color: #4D4D4D;
    border-width: 1px 0px 0px 0px; 
    border-style: solid;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 200px;
    padding-right: 200px;
    padding-top: 30px;
    padding-bottom: 30px;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 24px;
    color: var(--text-color);
    z-index: 150;
  }

  #top-bar p {
    cursor: pointer;
  }

  #top-bar p.active {
    color: white;
  }

  #container
  {
    padding-top: 30px;
    width: 60vw;
    max-width: 700px;
    text-align: center;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 30px;

  }
</style>

