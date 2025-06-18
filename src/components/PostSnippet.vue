<template>
  <CommentPostBox :visible="showCommentBox" :postId = "this.postId" @close="showCommentBox = false"/>
  <EditBox :prevText = "body" :type = "'post'" :visible="showEditBox" :id = "this.postId" @close="showEditBox = false"/>
  <div id ="post-snippet">
    <h2 @click="goToPost">{{ title }}</h2>


    <div id="image-container" :style="{ backgroundImage: 'url(' + url + ')' }" @click="goToPost">
      <div class="image-overlay"></div>
      <img :src="url" loading="lazy"/>
    </div>

    <p>
      {{ body }}
    </p>

    <hr class="divider" />

    <div id ="post-footer">


      <div id ="meta">

        <div id ="left-container">

          <div id ="profile-image" @click="goToProfile">
              <img v-if = "profileImage" :src="profileImage" />
          </div>

          <div id = "name" @click="goToProfile">
            <span id= "name-text">{{ name }}</span>
          </div>

        </div>


        <div id="right-container">
          <button v-if = "editable" id = "edit-button" @click = "editComment">Edit</button>
          <div id = "icon-container">
            <img v-if = "!hearted" src ="@/assets/heart-stroked.svg" id="heart-icon" alt="Heart" @click="heartComment">
            <img v-if = "hearted" src ="@/assets/heart-solid.svg" id="heart-icon" alt="Heart">
          </div>
          <div id = "icon-container">
            <img src="@/assets/message-text.svg" id="comments-icon" alt="Comment" @click="postComment">
          </div>
          
          <div class="dates">
              <div>
                  <small>Posted</small>
                  <div>{{ formattedCreated }}</div>
              </div>
              <div v-if="post.edited">
                  <small>Edited</small>
                  <div>{{ formattedEdited }}</div>
              </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import CommentPostBox from './CommentPostBox.vue'
import EditBox from './EditBox.vue'
import axiosObj from '../axios-config';

export default {
  name: 'PostSnippet',
  components: {
    CommentPostBox,
    EditBox
  },

  props: {

    post: {
      type: Object,
      required: true
    },

    editable: {
      type: Boolean,
      default: false
    }
  } ,


  data() {
    return {
      postId: null,
      userId: null,
      showCommentBox: false,
      showEditBox: false,
      hearted: false
    }
  },

  computed: {
    title() {
      return this.post.title
    },
    body() {
      return this.post.body
    },
    name() {

     return this.post.userName ?? ""

    },

    heart(){

      return this.post.heart
    },

    profileImage()
    {
      return this.post.profliePhotoUrl ?? ""
    } , 

    url()
    {
      return this.post.imageUrl ?? ""
    }
     ,

    formattedCreated() {
      return this.formatDate(this.post.created)
    },

    formattedEdited() {
      return this.formatDate(this.post.edited)
    }
  },

  methods: {
    formatDate(isoString) {
      if (!isoString) return '-'
      const d = new Date(isoString)
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return d.toLocaleDateString(undefined, options)
    },

    goToProfile() {
      if (this.userId) {
        this.$router.push(`/profile/${this.userId}`)
      } 
    }, 


    goToPost() {
      if (this.postId) {
        this.$router.push(`/post/${this.postId}/${this.post.title}`)
      } 
    },

    postComment() {
      this.showCommentBox = true;
    },

    editComment() {
      this.showEditBox = true;
    },

    async heartComment() {
      try {
        
        console.log(this.postId)
        const response = await axiosObj.post(`/heart/${this.postId}`);
        this.hearted = true;
        
      } catch (error) {
        console.error('Error hearting', error);
      }
    },




  } , 

  mounted(){

    this.postId = this.post.postId
    this.userId = this.post.userId
  }

}
</script>

<style scoped>
  #post-snippet
  {
    width: 100%;
    background: var(--bg-color);
    border-radius: 15px;
    border: 1px solid #222222;
    z-index: 10;
  }

  h2
  {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 12px;
    color: #ffffff;
    text-align: left;
    padding-top: 10px;
    padding-left: 15px;
    cursor: pointer;
  }

  p
  {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 32px;
    color: #FFFFFF;
    opacity: 0.55;
    text-align: left;
    padding-top: 0px;
    padding-left: 15px;
  }

  .divider {
    width: 97%;
    margin: 10px auto;
    opacity: 0.4;
    border-top: 1px solid #999999;

  }

  #meta
  {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  #left-container
  {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 20px;
      margin-bottom: 10px;
  }

    #name
    {
        width: 40px;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-left: 15px;
        cursor: pointer;
      }

    #name-text
    {
      font-size: 1rem;
      font-weight: bold;
      color: #FFFFFF;
      opacity: 0.55;
    }

    #right-container
    {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-right: 35px;
      margin-bottom: 10px;
      gap: 10px;
    }

  #profile-image
  {
    width: 25px;
    height: 25px;
    background-color: var(--bg-color);
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }

  #profile-image img {

    width: 100%;
    height: 100%;

  }

  #icon-container{

    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 100%;
    transition: background-color 0.3s ease;
  }

  #icon-container:hover{
    
    background-color: rgb(66, 66, 66 , 0.5);
  }

  #comments-icon {
    width: 20px;
    height: 20px;
  }

  #heart-icon {
    width: 20px;
    height: 20px;
  }

  .dates
  {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    margin-left: 10px;
  }

  .dates div {

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      
    }

  small {
      font-size: 0.7rem;
      font-weight: bold;
      color: #888;

  }

  .dates div div {
      font-size: 0.5rem;
      font-weight: bold;
      color: #fff; 
  }


  #image-container{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60vh;
    border-radius: 20px;
    margin: 20px;
    overflow: hidden;
    background-size: cover; 
    background-position: center;
    background-repeat: no-repeat;

  }

.image-overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(30px);
  background-color: rgba(0, 0, 0, 0.5);
  
}

#image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  z-index: 10;
}

  #edit-button {
  background-color: #0F0F0F;
  color: white;
  border-radius: 100px;
  border: 1px solid rgba(107, 107, 107, 0.3);
  width: 125px;
  height: 45px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 12px;
  transition: background-color 0.2s ease;
}

#edit-button:hover {
  background-color: #357bd8;
}

</style>
