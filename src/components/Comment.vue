<template>

  <CommentPostBox :visible="showCommentBox" 
  :postId = "this.postId" 
  :commentId = "this.commentId" 
  :replyText = "body"
  @close="this.showCommentBox = false"
  @updated="posted()"/>

  <teleport to ="body">
    <EditBox 
    :prevText = "body" 
    :type = "'comment'" 
    :visible="showEditBox" 
    :id = "this.commentId" 
    @close="this.showEditBox = false"
    @updated="update()"/>
  </teleport>
  
  
	<div id ="comment-container">

    <div id = "body-container">
      <pre>
        {{ body }}
      </pre>
    </div>

    <div id ="comment-footer">
      <div id ="meta">

        <div id ="left-container">

          <div id ="profile-image" @click="goToProfile">
              <img  :src="profileImage" />
          </div>

          <div id = "name" @click="goToProfile">
            <span id= "name-text">~ {{ name }}</span>
          </div>

        </div>


        <div id="right-container">
          <button v-if = "commentEditable" id = "edit-button" @click = "editComment">
            <img id = "edit-icon" src="@/assets/edit-pencil.svg" alt="Edit">
          </button>

          <div id = "icon-container">
            <img src="@/assets/reply.svg" id="reply-icon" alt="Reply" @click="postReply">
            <p id="reply-text">Reply</p>
            
          </div>
          <div class="dates">
              <div>
                  <small>Posted</small>
                  <div>{{ formattedCreated }}</div>
              </div>
              <div v-if="comments.edited">
                  <small>Edited</small>
                  <div>{{ formattedEdited }}</div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <Reply v-for="reply in localReplies" :reply="reply" :listOfEditableReplies = "listOfEditableReplies" @updated="update()"/>

  </div>
</template>

<script>
  import Reply from './Reply.vue'
  import CommentPostBox from './CommentPostBox.vue'
  import EditBox from './EditBox.vue'
  import axiosObj from '../axios-config';

	export default {

  components: {
    Reply,
    CommentPostBox,
    EditBox
  },

  name: 'Comment',

  props: {

    comments: {
      type: Object,
      required: true
    },

    replies: {
      type: Array,
      default: () => []  
    },

    listOfEditableComments: {
      type: Array,
      default: () => []  
    },

    listOfEditableReplies: {
      type: Array,
      default: () => []  
    }
  } ,


  data() {
    return {

      postId: null,
      userId: null,
      commentId: null,
      localReplies: [],
      commentEditable: false,
      showCommentBox: false,
      showEditBox: false,
      userLoggedIn: false
    }
  },


  emits: ['updated'],



  created() {
    this.localReplies = [...this.replies];
  },


    watch: {
    replies(newReplies) {
      this.localReplies = [...newReplies];
    }
  },

  computed: {
    
    body() {
      return this.comments.body
    },
    name() {

     return this.comments.userName ?? ""

    },

    profileImage()
    {
      const base = "https://res.cloudinary.com/decwrc84w/image/fetch";
      const transformation = "f_auto";
      const imageUrl = this.comments.profliePhotoUrl ?? "";

      return imageUrl ? `${base}/${transformation}/${encodeURIComponent(imageUrl)}` : "";

    
    } ,

    formattedCreated() {
      return this.formatDate(this.comments.created)
    },

    formattedEdited() {
      return this.formatDate(this.comments.edited)
    }
  },

  methods: {
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

          console.log(error)
        }
    },

    async posted(){
      this.showCommentBox = false
      this.$emit('updated');


    },

    update(){

      this.$emit('updated');
      this.showEditBox = false;

    },

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

    async postReply(){

      await this.checkLoginStatus();
      
      if(!this.userLoggedIn){
        this.$router.push(`/login`);
        return;
      }

      this.showCommentBox = true;

    },

    editComment() {
      this.showEditBox = true;
    }


  }, 

  mounted(){

    this.postId = this.$route.params.id;
    this.userId = this.comments.userId
    this.commentId = this.comments.commentId
    this.commentEditable = this.listOfEditableComments.includes(this.commentId);
  }

}
</script>

<style scoped>

  

	#comment-container
  {
    border-top: 1px solid rgba(77, 77, 77, 0.7);
    padding-top: 20px;
    width: 100%;
    background: var(--bg-color);
    display: flex;
    flex-direction: column;
    align-items: end;
    z-index: 10;

    
    
  }

  #comment-footer{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(77, 77, 77, 0.5);
    
  }

  #body-container pre
  {

    white-space: pre-line; 
    margin-bottom: 32px;
    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 16px;
    color: white;    
    text-align: left;
    padding-left: 20px;
    box-sizing: border-box;
    padding-top: 15px;
  }

  #body-container{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
  }

  .divider {
    width: 97%;
    margin: 10px auto;
    opacity: 0.4;

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
      font-family: var(--font-family-poppins);
      font-weight: var(--font-weight-medium);
      font-size: 16px;
      color: white;
    }

    #right-container
    {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-right: 35px;
      margin-bottom: 10px;
      gap: 20px;
    }

  #icon-container{

    background-color: rgb(66, 66, 66 , 0.4);
    height: 36px;
    
    padding-left: 12px;
    padding-right: 12px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    
    gap: 16px;
    cursor: pointer;
    border-radius: 50px;
    transition: background-color 0.3s ease;
  }

  #reply-icon {
    width: 20px;
    height: 20px;
  }


  #reply-text {

    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 14px;
    color: white;
  }

  #icon-container:hover{
    
    background-color: rgb(66, 66, 66 , 0.5);
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

  .dates
  {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;

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

  #edit-button {
    background-color: var(--bg-color);
    border-radius: 100px;
    border: none;
    width: 35px;
    height: 35px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
  }


  #edit-icon{
        display: flex;
        width: 20px;
        height: 20px;
      }

  #edit-button:hover {
    background-color: #357bd8;
  }

  

  .dates div div {
      font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-medium);
    font-size:12px;
    color: white;
  }


@media (min-width: 768px) and (max-width: 1024px){
    
     
     
    
  }

  @media (max-width: 767px) {


    small {
     display: none;

  }


      
    #icon-container{

    background-color: rgb(66, 66, 66 , 0.4);
    height: 36px;
    
    padding-left: 12px;
    padding-right: 12px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    
    gap: 16px;
    cursor: pointer;
    border-radius: 50px;
    transition: background-color 0.3s ease;
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