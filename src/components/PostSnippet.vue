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
    <h2 id="normal-heading" @click="goToPost">{{ title }}</h2>


    <div id="image-container" :style="{ backgroundImage: 'url(' + url + ')' }">
      <div id = "maximize-icon-container" @click.stop="openImageViewer">
           <img src="@/assets/maximize.svg" id="maximize-icon" alt="Maximize">
      </div>
      <div class="image-overlay"></div>
      <img :src="url" loading="lazy" :alt="title || 'Post image'"/>
    </div>

    <div id="tag-container">
    <TagPill v-for="(tag, index) in tagList" :key="index" :tag="tag" />
   </div>

    <div id="body-container">
      <p>
        {{ body }}
      </p>
    </div>
    

   


    <div id ="post-footer">


      <div id ="meta">

        <div id ="left-container">

          <div id ="profile-image" @click="goToProfile">
              <img v-if = "profileImage" :src="profileImage" :alt="name || 'Profile Name'" />
          </div>

          

          <div id = "name" @click="goToProfile">
            <span id= "name-text">~ {{ name }}</span>
          </div>

        </div>


        <div id="right-container">

          <button v-if = "editable" id = "edit-button" @click = "editComment">
            <img id = "edit-icon" src="@/assets/edit-pencil.svg" alt="Edit">
          </button>

          <div v-if = "rated" id = "icon-container">
            <img src="@/assets/waist.svg" id="comments-icon" alt="Rated">
            <p>NSFW</p>
          </div>
          <div id = "icon-container">
            <img v-if = "!hearted" src ="@/assets/heart-stroked.svg" id="heart-icon" alt="Heart" @click="heartComment">
            <img v-if = "hearted" src ="@/assets/heart-solid.svg" id="heart-icon" alt="Heart">
            <p>{{ heart }}</p>
          </div>
          <div id = "icon-container">
            <img src="@/assets/message-text.svg" id="comments-icon" alt="Comment" @click="postComment">
            <p>{{ commentCount }}</p>
          </div>
          
          <div class="dates">
              <div>
                  <small>Posted</small>
                  <div>{{ formattedCreated }}</div>
              </div>
              <!-- <div id = "time-wrapper">
                  <small>At</small>
                  <div id = "time">{{ timePosted }}</div>
              </div> -->

              <div v-if="post.edited">
                  <small>Edited</small>
                  <div>{{ formattedEdited }}</div>
              </div>
             

          </div>
        </div>

      </div>



      <div id="bottom-right-container">


          <div id="media-user-data-container">

            <div id ="profile-image" @click="goToProfile">
              <img v-if = "profileImage" :src="profileImage" :alt="name || 'Profile Name'" />
            </div>
            <div id = "name" @click="goToProfile">
              <span id= "name-text">~ {{ name }}</span>
            </div>

          </div>


          <div id="media-description" @click="goToPost">
            
              <p>
                {{ body }}
              </p>
            
          </div>

          

          <div id="post-footer-container">

            <button v-if = "editable" id = "edit-button" @click = "editComment">
            
            <img id = "edit-icon" src="@/assets/edit-pencil.svg" alt="Edit">

            </button>
            <div v-if = "rated" id = "icon-container">
              <img src="@/assets/waist.svg" id="comments-icon" alt="Rated">
            </div>
            <div id = "icon-container">
              <img v-if = "!hearted" src ="@/assets/heart-stroked.svg" id="heart-icon" alt="Heart" @click="heartComment">
              <img v-if = "hearted" src ="@/assets/heart-solid.svg" id="heart-icon" alt="Heart">
              <p>{{ heart }}</p>
            </div>
            <div id = "icon-container">
              <img src="@/assets/message-text.svg" id="comments-icon" alt="Comment" @click="postComment">
              <p>{{ commentCount }}</p>
            </div>
            
            <div class="dates">
                <div>
                    <small>Posted</small>
                    <div>{{ formattedCreated }}</div>
                </div>
                <div id = "time-wrapper">
                    <small>At</small>
                    <div id = "time">{{ timePosted }}</div>
                </div>

                <div v-if="post.edited">
                    <small>Edited</small>
                    <div>{{ formattedEdited }}</div>
                </div>
                <div id = "time-wrapper" v-if="post.edited">
                    <small>At</small>
                    <div id = "time">{{ timePosted }}</div>
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
import ImageViewer from './ImageViewer.vue'
import axiosObj from '../axios-config';
import TagPill from './TagPill.vue';

export default {
  name: 'PostSnippet',
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

    hearts: Array,

    editable: {
      type: Boolean,
      default: false
    },

    heartedPost: {

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


    commentCount(){

      return this.post.commentCount

    },

    heart(){

      return this.post.heart

    },


    isHearted() {
      return this.hearts.includes(this.postId);
    },

    profileImage()
    {
      const base = "https://res.cloudinary.com/decwrc84w/image/fetch";
      const transformation = "f_auto";
      const imageUrl = this.post.profliePhotoUrl ?? "";

      return imageUrl ? `${base}/${transformation}/${encodeURIComponent(imageUrl)}` : "";

    
    } , 

    url()
    {
      const base = "https://res.cloudinary.com/decwrc84w/image/fetch";
      const transformation = "f_auto";
      const imageUrl = this.post.imageUrl ?? "";

      return imageUrl ? `${base}/${transformation}/${encodeURIComponent(imageUrl)}` : "";
      
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

    if (
    this.heartedPost === true ||                        // From prop
    (this.post && this.post.hearted === true) ||    // From post object
    (Array.isArray(this.hearts) && this.hearts.includes(this.post.postId)) // From hearts list
    ) {
      this.hearted = true;
    }

  }

}
</script>

<style scoped>



  


  #bottom-right-container{
    display: none;
  }



  #post-snippet
  {
    width: 100%;
    background: var(--bg-color);
    border-radius: 15px;
    border: 1px solid #222222;
    z-index: 10;
  }

  #normal-heading
  {
    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-bold);
    font-size: 32px;
    margin-bottom: 12px;
    color: #ffffff;
    text-align: left;
    padding-top: 10px;
    padding-left: 15px;
    cursor: pointer;
  }


  #body-container{
    background-color: var(--bg-color);
    padding-top: 10px;
    padding-bottom:10px;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 15px;
    border-color: rgba(77, 77, 77, 0.5);
    border-width: 0px 0px 2px 0px; 
    border-style: solid;


  }


  p
  {
    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-medium);
    font-size: 16px;
    color: #FFFFFF;
    text-align: left;
    padding-left: 0px;
  }


  #tag-container {
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
    margin-top: 20px;
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
      font-family: var(--font-family-poppins);
      font-weight: var(--font-weight-medium);
      font-size: 16px;
      color: #055dff;
      
    }

    #right-container
    {
      width: 70%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: end;
      margin-right: 35px;
      margin-bottom: 10px;
      gap: 10px;
      
    }

  #profile-image
  {
    width: 40px;
    height: 40px;
    background-color: var(--bg-color);
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.25);
    
  }

  #profile-image img {

    width: 100%;
    height: 100%;
  }

  #icon-container{

    background-color: rgb(66, 66, 66 , 0.4);
    height: 36px;
    display: flex;
    padding-left: 12px;
    padding-right: 12px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    border-radius: 50px;
    transition: background-color 0.3s ease;

  }


  #icon-container p {
    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-medium);
    font-size: 16px;
    color: white;
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
    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size:10px;
    color: white;
    opacity: 0.7;

  }

  .dates div div {
    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-medium);
    font-size:12px;
    color: white;
  }

  #time-wrapper{
    display: start;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: 30px;
    
  }

  #time{
    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-medium);
    font-size:12px;
    color: white;

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

#maximize-icon-container {
  width: 45px;
  height: 45px;
  position: absolute;
  bottom: 10px;
  right: 10px;
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
  width: 25px;
  height: 25px;
}

#image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  z-index: 10;
}

  #edit-button {
    background-color: var(--bg-color);
    color: white;
    border-radius: 100px;
    border: none;
    width: 45px;
    height: 45px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 12px;
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }

  #edit-icon{
        display: flex;
        width: 20px;
        height: 20px;
      }

#edit-button:hover {
  background-color: #357bd8;
}


@media (min-width: 768px) and (max-width: 1024px){
    
     
     
    
} 

@media (max-width: 767px) {

  #meta{
    display: none;
  }

  .image-overlay {
    display: none;
  }


  #bottom-right-container{
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 24px;
    padding-bottom: 15px;
    padding-left: 10px;

    
  }


  #media-user-data-container{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    padding-top: 20px;
    padding-left: 10px;
    gap: 10px;
  }


  #media-description{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding-left: 10px;
    gap: 10px;
  }


  


  #media-description p{

    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 16px;
    text-align: left;
    color: white;
  }

  #image-container {
    background: none !important;
    background-image: none !important;
    background-size: initial !important;
    background-position: initial !important;
    background-repeat: initial !important;
  }

  #maximize-icon-container img{
    display: none;
  }

  #maximize-icon-container{
    opacity: 1.0;
    width: 100%;
    height: 100%;
    border-radius: 0px;
    background-color: rgba(0, 0, 0, 0.0);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  #image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 10;
}
  
  #icon-container{

    background-color: rgb(66, 66, 66 , 0.4);
    height: 36px;
    display: flex;
    padding-left: 12px;
    padding-right: 12px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    border-radius: 50px;
    transition: background-color 0.3s ease;
  }

  #icon-container p{
    color: white;
    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-medium);
    font-size: 12px;
    color: white;
   
  }


  #body-container{
    display: none;
  }

  #tag-container{
    display: none;
  }

  

  #time-wrapper{
    display: none;
  }

  #normal-heading {
    display: none;
  }


  #right-container{
    display: none;
  }

  #post-snippet
  {
    width: 100%;
    background: var(--bg-color);
    border-radius: 0px;
    border: none;
    z-index: 10;
  }


  

  


  

  #post-footer-container{

    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 24px;
    padding-bottom: 35px;
    padding-left: 10px;
  }

  #bottom-right-container small{
    display: none;
  }

  #image-container{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50vh;
    border-radius: 0px;
    margin: 0px;
    overflow: hidden;
    background-size: cover; 
    background-position: center;
    background-repeat: no-repeat;

  }


  .dates div div {
      font-size: 0.7rem;
      font-weight: bold;
      color: #fff; 
  }


  #comments-icon {
    width: 16px;
    height: 16px;
  }

  #heart-icon {
    width: 16px;
    height: 16px;
  }


}


@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@media (hover: none) {
  #edit-button,
  #icon-container,
  #maximize-icon-container {
    transition: transform 0.2s ease;
  }

  #edit-button:active,
  #icon-container:active,
  #maximize-icon-container:active {
    animation: pop 0.3s ease;
  }

  /* Optionally disable hover effects on mobile */
  #edit-button:hover,
  #icon-container:hover,
  #maximize-icon-container:hover {
    background-color: transparent !important;
    opacity: 1 !important;
  }

  #image-container:hover #maximize-icon-container {
    opacity: 0 !important;
  }
}

</style>
