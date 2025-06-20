<template>
  <div id="main-wrapper">
    <EditBox
      :prevText="bio"
      :type="'bio'"
      :visible="showEditBox"
      :id="userId"
      @close="showEditBox = false"
    />


    <div id = "user-data-container">

      <div id = "profile-image-container">
        <img id = "profile-image" :src= "profileImage" :class="{ uploading: isUploading }" alt="Profile Photo" @click = "changeProfileImage"/>
        <img v-if = "editable" id = "edit-icon" src="@/assets/edit-pencil.svg" alt="Edit" @click = "changeProfileImage">
        <input ref="fileInput" type="file" @change="handleFileUpload" accept=".jpg,.png,.gif" hidden />
      </div>

      <div id = "meta-data-container">

        <div id = "name-data-container">
          <p id = "name">{{ name }}</p>
          <!-- <div id="icon-container">
            <img id = "edit-icon-small" src="@/assets/edit-pencil.svg" alt="Edit">
          </div> -->
        </div>
        
        <p id = "joined">{{ formattedCreated }}</p>

        <div id = "name-data-container">

          <div id="bio-container">
            <p id = "bio">{{ bio }}</p>
          </div>
          
          <div v-if = "editable" id="icon-container" @click = "editBio">
            <img id = "edit-icon-small" src="@/assets/edit-pencil.svg" alt="Edit">
          </div>  

        </div>
        
      </div>
    </div>


    <Navbar @login-status-checked="onNavbarReady" />

    <main id="content-wrapper">
      <section id="tabs-bar">
        <button :class="{ active: selectedTab === 'Post' }" @click="selectedTab = 'Post'">Posts</button>
        <button :class="{ active: selectedTab === 'Comment' }" @click="selectedTab = 'Comment'">Comments</button>
        <button :class="{ active: selectedTab === 'Reply' }" @click="selectedTab = 'Reply'">Replies</button>
      </section>

      <section id="tab-content">
        
          <PostSnippet 
          v-if="selectedTab === 'Post'" 
          v-for= "post in posts" 
          :post = post 
          :editable = this.editable />

          <Comment 
          v-if="selectedTab === 'Comment'" 
          v-for="comment in comments" 
          :comments="comment"
          :listOfEditableComments = "listOfEditableComments" />

          <Reply 
          v-if="selectedTab === 'Reply'" 
          v-for="reply in replies" 
          :reply="reply" 
          :listOfEditableReplies = "listOfEditableReplies" />

      </section>
    </main>
  </div>
</template>


<script>
import axiosObj from '../axios-config';
import Navbar from '../components/Navbar.vue'
import PostSnippet from '../components/PostSnippet.vue'
import Comment from '../components/Comment.vue'
import Reply from '../components/Reply.vue'
import EditBox from '../components/EditBox.vue'


export default {
  components: {
    Navbar,
    PostSnippet,
    Comment,
    Reply,
    EditBox
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
      userId: null,
      userName: "",
      displayBio: "",
      joined: "",
      url: "",
      selectedFile: null,
      showEditBox: false,
      isUploading: false,

    }
    
  },


  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  },


  computed: {
    
    bio() {
      return this.displayBio ?? "Your Description.."
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

    editBio() {
      this.showEditBox = true;
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
        this.isUploading = true;

        axiosObj.post('/upload/profile', formData)
        .then(()=>{
            console.log("uploaded")
            this.fetchPost();
          }
        )
        .catch(err => {
          console.error(err);
          this.error = err;

        })
        .finally(() => {
          this.isUploading = false;
        });;

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
      this.userId = response.data.userId
      this.posts = response.data.posts
      this.comments = response.data.comments
      this.replies = response.data.replies
      this.editable =  response.data.editable
      this.userName = response.data.name
      this.displayBio = response.data.bio
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

  #main-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#content-wrapper {

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding-bottom: 20px;
}

#tabs-bar {
  position: sticky;
  top: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  display: flex;
  justify-content: center;
  gap: 20%;
  padding: 20px 0;
  border-top: 1px solid #4d4d4d;
  z-index: 150;
  width: 100%;
}

#tabs-bar button {
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  cursor: pointer;
  padding-bottom: 6px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease-in-out;
}

#tabs-bar button:hover {
  color: white;
}

#tabs-bar button.active {
  color: white;
  border-bottom: 2px solid white;
}

#tab-content {
  width: 60vw;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 80px;
}


#user-data-container{

  margin-top: 60px;
  width: 100%;
  min-height: 100px;
  padding: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  gap: 30px;
  z-index: 100;
}

#profile-image-container {
  position: absolute;
  top: 100px;
  left: 0;
  margin-left: 30px;
  width: 250px;
  height: 250px;
  border-radius: 10%;
  overflow: hidden;
  z-index: 100;
  border: 1px solid rgba(107, 107, 107, 0.3);
}

#profile-image{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#meta-data-container{
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 10px;
  padding-left: 30px;
  width: 80%;
}


#name-data-container{
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: row;
  background-color: var(--secondary-color);
  padding: 10px;
  border-radius: 15px;
  gap: 10px;
}


#name{

  font-family: 'Inter', sans-serif;
  font-size: 72px;
  font-weight: 800;
  color: white;
}

#joined{

  font-family: 'Inter', sans-serif;
  font-size: 48px;
  font-weight: 800;
  color: white; 
}


#bio{

  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 900;
  color: var(--text-color);
}

#icon-container{

  display: flex;
  align-items: start;
  justify-content: center;
  cursor: pointer;
}


#edit-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

#profile-image-container:hover #edit-icon {
  opacity: 1;
}

#profile-image.uploading {
  opacity: 0.4;
  transition: opacity 0.3s ease;
}


  
</style>

