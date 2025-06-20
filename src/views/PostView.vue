<template>
  <div>
  <Navbar @login-status-checked="onNavbarReady"/>
  
  
  <main>
    <CreatePost />
    <div id = "container">
      
      <PostSnippetSkeleton v-if = "show"/>
      <PostSnippet v-if="post" :post = post :editable = this.postEditable @updated="refreshPostData"/>
      <div id="gap-container"></div>

      <div v-if = "comments" id = comment-reply-container>
        <Comment  v-for= "comment in comments" 
          :comments="comment.comment"
          :replies="comment.replies"
          :listOfEditableComments= "listOfEditableComments"
          :listOfEditableReplies= "listOfEditableReplies"
          @updated="refreshPostData"/>
      </div>
      
      <div id="gap-container"></div>

      <div id = "more-post-container">

        <div  v-if="similarPosts && similarPosts.length > 0" id="heading-container">
          <PostSnippetSkeleton v-if = "show"/>
          <PostSnippetSkeleton v-if = "show"/>
          <p>Similar Images</p>
        </div>
        

        <PostSnippet  v-for= "post in similarPosts" :post = post />

        <div id="heading-container"><p>Some more Images</p></div>

        <PostSnippetSkeleton v-if = "show"/>
        <PostSnippetSkeleton v-if = "show"/>
        <PostSnippet  v-for= "post in posts" :post = post />

      </div>
      
        

    </div>
  </main>
  </div>
</template>


<script>
import axiosObj from '../axios-config';
import Navbar from '../components/Navbar.vue'
import Comment from '../components/Comment.vue'
import PostSnippet from '../components/PostSnippet.vue'
import PostSnippetSkeleton from '../components/PostSnippetSkeleton.vue'
import CreatePost from '../components/CreatePost.vue'

export default {
  components: {
    Navbar,
    PostSnippet,
    Comment,
    PostSnippetSkeleton,
    CreatePost
  },

  data() {
    return {
      posts: [],
      page: 0,         
      usingSnippetsApi: false,
      post: null,
      similarPosts: null,
      postData: null,
      comments: [],
      postEditable: false,
      listOfEditableComments: [],
      listOfEditableReplies: [],
      show: true,

    };

  },



  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  },

  methods: {

    refreshPostData() {
      console.log("refresh post view");
      const postId = this.$route.params.id;
      this.fetchPost(postId);
    },

    onNavbarReady()
    {
      const postId = this.$route.params.id;
      this.fetchPost(postId);
      this.loadMorePosts();

    },

    async  loadMorePosts() {
      try {

        this.usingSnippetsApi = true;
        const response = await axiosObj.get(`/snippets/${this.page}`);
        const newPosts = response.data;

        console.log(response)

        this.posts.push(...newPosts);
        this.page++;

        
        if (newPosts.length === 0) {
          this.hasMore = false;
        }
      } catch (error) {
        console.error('Error loading more posts:', error);
      }

      this.show = false;
    },

    async fetchPost(postId) {
      
      const response = await axiosObj.get(`/post/${postId}`);

      this.post = response.data.post
      this.similarPosts = response.data.similarPosts
      this.comments = response.data.discussion
      console.log(this.comments)
      this.postEditable = response.data.postEditableByUser
      this.listOfEditableComments = response.data.listOfEditableComments;
      this.listOfEditableReplies = response.data.listOfEditableReplies;

      this.show = false;
    }
  }


}
</script>


<style scoped>

  #gap-container{
    width: 100%;
    height: 30px;
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

  }

  #comment-reply-container{

    width: 100%;
    background-color: var(--bg-color);
    z-index: 20;
    border-radius: 20px;
    border: 1px solid #222222;
    overflow: hidden;
    

  }

  #more-post-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 30px;
  }


  #more-post-container p{
    -webkit-text-stroke: 2px #FF2160;
    color: var(--bg-color);
    font-family: 'Inter', sans-serif;
    font-size: 48px;
  }

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
    z-index: 10;

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

  
</style>
