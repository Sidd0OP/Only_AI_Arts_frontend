<template>
  <div id="post">
  <Navbar @login-status-checked="onNavbarReady"/>
  <SidePanel />
  
  <main>
    <div id = "container">
      
      <div id = "center-container">

        <PostSnippetSkeleton v-if = "show"/>
        <PostSnippet v-if="post" :post = post :editable = this.postEditable :heartedPost = this.hearted @updated="refreshPostData"/>

        <div id="gap-container"></div>

        <div v-if = "comments" id = comment-reply-container>
          <div id="comment-input-container">

            <input id="comment-input" type="text" name="comment-input" placeholder="Add a comment...." v-model="body">

            <button  id = "submit-button" @click = "submitComment">
              <p>Submit</p>
            </button>

          </div>
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
          
          <!-- <Profile :imageUrl = "Hi" :name = "Sid" :joined = "9/10/11" :bio = "Hi" /> -->

          <PostSnippet  v-for= "post in similarPosts" :post = post />

          <div id="side-container-normal">
            <div  id="heading-container">
              <p>Continue With More</p>
            </div>
            <div id="gap-container"></div>
            <PostSnippet  v-for= "post in posts" :post = post />
          </div>
        </div>


      </div>
      
      <div id="side-container">
        <!-- <PostSnippetSkeleton v-if = "show"/>
        <PostSnippetSkeleton v-if = "show"/> -->
        <PostSnippetSmall  v-for= "post in posts" :post = post />
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
import PostSnippetSmall from '../components/PostSnippetSmall.vue'
import PostSnippetSkeleton from '../components/PostSnippetSkeleton.vue'
import CreatePost from '../components/CreatePost.vue'
import SidePanel from '../components/SidePanel.vue'
import Profile from '../components/Profile.vue'

export default {
  components: {
    Navbar,
    PostSnippet,
    PostSnippetSmall,
    Comment,
    PostSnippetSkeleton,
    CreatePost,
    SidePanel,
    Profile
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
      hearted: false,
      body: '',
      loading: false

    };

  },



  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  },

  methods: {

    refreshPostData() {
      
      const postId = this.$route.params.id;
      this.page = this.$route.params.page;
      this.fetchPost(postId);
    },

    onNavbarReady()
    {
      const postId = this.$route.params.id;
      this.page = Number(this.$route.query.page) || 0;

      this.fetchPost(postId);
      this.loadMorePosts();

    },

    async  loadMorePosts() {
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

      this.show = false;
    },

    async fetchPost(postId) {
      
      const response = await axiosObj.get(`/post/${postId}`);

      this.post = response.data.post
      this.similarPosts = response.data.similarPosts
      this.comments = response.data.discussion
      this.postEditable = response.data.postEditableByUser
      this.listOfEditableComments = response.data.listOfEditableComments;
      this.listOfEditableReplies = response.data.listOfEditableReplies;
      this.hearted = response.data.hearted;

      this.show = false;
    },




    async submitComment() {

          if (!this.body.trim()) return;

          const postId = this.post?.id || this.$route.params.id;


          console.log(postId);

          try {

            this.loading = true;



            const formData = new FormData();
            formData.append('postId', postId);  
            formData.append('body', this.body);     

            await axiosObj.post('/comment', formData);

          

            this.body = '';
            this.refreshPostData();

          } catch (err) {

            console.error('Failed to send comment:', err);

          } finally {

          this.loading = false; 

        }
        
      }
  }


}
</script>


<style scoped>

  #side-container-normal{
    display: none;
  }

  #gap-container{
    width: 100%;
    height: 30px;
  }

  #post{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    
  }

  #comment-input-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    padding: 10px;
    gap: 10px;
    
  }


  #comment-input-container input{
    width: 100%;
    background-color: rgb(66, 66, 66 , 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-radius: 15px;
    border: none;
    padding-left: 10px;

    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 14px;

    color: white;
  }

  #comment-input-container input:focus {
    outline: none;
    border: none;
  }

  



  #submit-button{
      
    background-color: white;
    color: black;
    border-radius: 100px;
    border: 1px solid rgba(107, 107, 107, 0.6);
    width: 110px;
    height: 35px;
    cursor: pointer;
    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 16px;
    transition: background-color 0.2s ease;
    box-shadow: none;

  }

  #container
  {
    padding-top: 100px;
    width: 100vw;
    max-width: 1000px;
    background-color: #000000;
    text-align: center;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
    gap: 50px;


  }

  #center-container{
    width: 70%;
    z-index: 100;
  }

  #side-container{
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
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




  @media (min-width: 768px) and (max-width: 1200px)
  {
    
    #side-container{

      display: none;

    }

    

    #side-container-normal{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
     
     
    
  }

  @media (max-width: 767px) 
  {

    #side-container{

      display: none;

    }

    
    #comment-reply-container{

   
    border: none;
    border-radius: 0px;
    border-top: 1px solid #222222;
    border-bottom: 1px solid #222222;
    

  }

    #gap-container{
      display: none;
    }

    #more-post-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding-bottom: 30px;
  }

    #side-container-normal{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }


    #center-container{
      width: 100%;
      z-index: 100;
    }

    #container
    {
      padding-top: 60px;
      width: 100%;
      background-color: #000000;
      text-align: center;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: start;
      gap: 0px;


    }

    #more-post-container p{
      -webkit-text-stroke: 2px #FF2160;
      color: var(--bg-color);
      font-family: 'Inter', sans-serif;
      font-size: 32px;
    }


    #heading-container{
      background-color: var(--bg-color);
      border-radius: 0px;
      border: none;
      padding-left: 0px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      z-index: 10;
      padding: 10px;

    }


  

    

  }

  
</style>
