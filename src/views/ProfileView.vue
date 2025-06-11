<template>
  <Navbar @login-status-checked="onNavbarReady"/>
  <div class="profile">
    <div id = "user-data-container">

      <div id = "profile-image-container">
        <img :src= "profileImage" alt="Profile Photo" @click = "changeProfileImage"/>
        <img id = "edit-icon" src="@/assets/edit-pencil.svg" alt="Edit" @click = "changeProfileImage">
        <input ref="fileInput" type="file" @change="handleFileUpload" accept=".jpg,.png,.gif" hidden />
      </div>
      <div id = "meta-data-container">
        <div id = name-data-container>
          <p id = "hello">Hello </p>
          <p id = "name">{{ name }}</p>
          <img id = "edit-icon-small" src="@/assets/edit-pencil.svg" alt="Edit">
        </div>
        
        <p id = "joined">Joined: {{ formattedCreated }}</p>
        <div id = name-data-container>
          <p id = "bio">Bio: {{ bio }}</p>
          <img id = "edit-icon-small" src="@/assets/edit-pencil.svg" alt="Edit">
        </div>
        
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
          <PostSnippet v-if="selectedTab === 'Post'" v-for= "post in posts" :post = post :editable = this.editable />
          <Comment v-if="selectedTab === 'Comment'" v-for="comment in comments" 
          :comments="comment"
          :listOfEditableComments = "listOfEditableComments" />
          <Reply v-if="selectedTab === 'Reply'" v-for="reply in replies" 
          :reply="reply" 
          :listOfEditableReplies = "listOfEditableReplies" />
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
      editable: false,
      listOfEditableComments: [],
      listOfEditableReplies: [],
      userName: "",
      bio: "",
      joined: "",
      url: "",
      selectedFile: null,

    }
    
  },

  mounted() {
    
    

  },


  computed: {
    
    bio() {
      return this.bio ?? "Write something about yourself..."
    },

    name() {

     return this.userName ?? "Bob"

    },

    profileImage()
    {
      return this.url 
    } , 

    formattedCreated() {
      return this.formatDate(this.joined)
    },

    formattedEdited() {
      return this.formatDate(this.post.edited)
    }

  },


  methods: {

    async onNavbarReady()
    {
      this.fetchPost()
    },

    changeProfileImage(){
      this.$refs.fileInput.click();
    },

    handleFileUpload(event) {

      const file = event.target.files[0];
      this.selectedFile = file;

      if (file && ['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
          

        const formData = new FormData();
        formData.append('file', this.selectedFile);

        axiosObj.post('/upload/profile', formData)
        .then(()=>{
            console.log("uploaded")
          }
        )
        .catch(err => {
          console.error(err);
          this.error = err;

        });

        } else {
          this.error = 'Unsupported file type';
        }
    },

    formatDate(isoString) {
      if (!isoString) return '-'
      const d = new Date(isoString)
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return d.toLocaleDateString(undefined, options)
    },
    
    async fetchPost() {
      
      const response = await axiosObj.get(`/profile/${this.$route.params.id}`);
      this.posts = response.data.posts
      this.comments = response.data.comments
      this.replies = response.data.replies
      this.editable =  response.data.editable
      this.userName = response.data.name
      this.bio = response.data.bio
      this.joined =  response.data.joined
      this.url = response.data.profilePhotoUrl


      if (this.editable) {

        this.listOfEditableComments = this.comments.map(c => c.commentId);
        this.listOfEditableReplies = this.replies.map(r => r.replyId);

      }
      
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
    overflow: hidden;
    object-fit: contain;
  }

  #edit-icon{
    position: absolute;
     filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6));
    width: 50px;
    height: 50px;
    cursor: pointer;
  }

  #edit-icon-small{
    width: 30px;
    height: 30px;
    cursor: pointer;
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

  #name-data-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 20px;
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

