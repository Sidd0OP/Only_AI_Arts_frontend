<template>
  <CommentPostBox :visible="showCommentBox" :postId = "this.postId" @close="showCommentBox = false" @updated="posted()"/>

  <teleport to ="body">
    <EditBox
      :prevText="body"
      :type="'post'"
      :visible="showEditBox"
      :id="postId"
      @close="this.showEditBox = false"
      @updated="refresh()"
    />
  </teleport>

  <teleport to="body">
    <ImageViewer
      :active="showImageViewer"
      :image="viewerImageUrl"
      @close="showImageViewer = false"
    />
  </teleport>


  <div id ="post-snippet">
    <h2 @click="goToPost">{{ title }}</h2>


    <div id="image-container" :style="{ backgroundImage: 'url(' + url + ')' }">
      <div id = "maximize-icon-container" @click.stop="openImageViewer">
           <img src="@/assets/maximize.svg" id="maximize-icon" alt="Maximize">
      </div>
      <div class="image-overlay"></div>
      <img :src="url" loading="lazy"/>
    </div>

    
    



    
  </div>
</template>

<script>
import CommentPostBox from './CommentPostBox.vue'
import EditBox from './EditBox.vue'
import ImageViewer from './ImageViewer.vue'
import axiosObj from '../axios-config';
import TagPill from './TagPill.vue';

export default {
  name: 'PostSnippetSmall',
  components: {
    CommentPostBox,
    EditBox,
    TagPill,
    ImageViewer
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


  emits: ['updated'],


  data() {
    return {
      postId: null,
      userId: null,
      showCommentBox: false,
      showEditBox: false,
      hearted: false,
      userLoggedIn: false,
      rated: false,
      showImageViewer: false,
      viewerImageUrl: ''
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
    },

    timePosted() {
      return this.formatTime(this.post.created)
    },
    timeEdited() {
      return this.formatTime(this.post.edited)
    },
    tagList() {
      if (!this.post.tags) return [];
      return this.post.tags.split(',').map(tag => tag.trim());
    }

  },

  methods: {

    openImageViewer() {
      this.viewerImageUrl = this.url;
      this.showImageViewer = true;
    },

    async posted(){
      this.showCommentBox = false
      this.$emit('updated');


    },

    async refresh(){

      this.$emit('updated');

    },

    async checkLoginStatus() {
        try {

          
          const response = await axiosObj.get('/user');
          
          if(response.data.userId === null){

            this.userLoggedIn = false;


          }else{
            this.userLoggedIn = true;
          }

        } catch (error) {

          this.userLoggedIn = false;
        }
    },


    formatDate(isoString) {
      if (!isoString) return '-'
      const d = new Date(isoString)
      const options = { year: 'numeric', month: 'short', day: 'numeric' }


      return d.toLocaleDateString(undefined, options)
    },

    formatTime(isoString) {
    if (!isoString) return '-';
    const d = new Date(isoString);
    return d.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

    ,

    goToProfile() {
      if (this.userId) {
        this.$router.push(`/profile/${this.userId}`)
      } 
    }, 


    goToPost() {
      if (this.postId) {
        const slug = this.post.title
        .replace(/\s+/g, '_')            
        .replace(/[^a-zA-Z0-9-_]/g, ''); 

        this.$router.push(`/post/${this.postId}/${slug}`);

      } 
    },

    async postComment() {
      await this.checkLoginStatus();
      
      if(!this.userLoggedIn){
        this.$router.push(`/login`);
        return;
      }


      this.showCommentBox = true;
    },

    async editComment() {

      await this.checkLoginStatus();
      
      if(!this.userLoggedIn){
        this.$router.push(`/login`);
        return;
      }


      this.showEditBox = true;
    },

    async heartComment() {

      await this.checkLoginStatus();

      if(!this.userLoggedIn){
        this.$router.push(`/login`);
        return;
      }

      try {
      
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
    this.rated = this.post.rated
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
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 12px;
    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-bold);
    font-size: 16px;
    color: white;
    text-align: left;
    padding-top: 10px;
    padding-left: 15px;
    cursor: pointer;
  }


  #body-container{
    background-color: var(--secondary-color);
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    margin: 20px;
    border-radius: 10px;
  }


  p
  {
    font-size: 0.8rem;
    font-weight: bold;
    color: #FFFFFF;
    opacity: 0.55;
    text-align: left;
    padding-left: 15px;
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
      margin-left: 10px;
      margin-bottom: 10px;
      gap: 0px;
  }

    #name
    {
        
        height: 40px;
        padding: 2px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
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
    width: 15px;
    height: 15px;
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

    width: 20px;
    height: 20px;
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
    width: 15px;
    height: 15px;
  }

  #heart-icon {
    width: 15px;
    height: 15px;
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
      font-size: 0.6rem;
      font-weight: bold;
      color: #888;

  }

  .dates div div {
      font-size: 0.4rem;
      font-weight: bold;
      color: #fff; 
  }

  #time-wrapper{
    display: start;
    flex-direction: column;
    justify-content: end;
    align-items: start;
    height: 30px;
    
  }

  #time{
    font-size: 0.5rem;
    opacity: 1.0;

  }

  #image-container{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 20vh;
    border-radius: 10px;
    margin: 10px;
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

#maximize-icon-container {
  width: 35px;
  height: 35px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

#image-container:hover #maximize-icon-container {
  opacity: 1;
}

#maximize-icon-container img{
  width: 5px;
  height: 5px;
}

#image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
