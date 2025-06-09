<template>

  <CommentPostBox :visible="showCommentBox" 
  :postId = "this.postId" 
  :commentId = "this.commentId" 
  @close="showCommentBox = false"/>

  <EditBox :prevText = "body" :type = "'comment'" :visible="showEditBox" :id = "this.commentId" @close="showEditBox = false"/>
	<div id ="comment-container">

    <div id = "body-container">
      <p>
        {{ body }}
      </p>
    </div>

    <div id ="comment-footer">
      <div id ="meta">

        <div id ="left-container">

          <div id ="profile-image" @click="goToProfile">
              <img  :src="profileImage" />
          </div>

          <div id = "name" @click="goToProfile">
            <span id= "name-text">{{ name }}</span>
          </div>

        </div>


        <div id="right-container">
          <button v-if = "commentEditable" id = "edit-button" @click = "editComment" >Edit</button>
          <div id = "icon-container">
            <img src="@/assets/reply.svg" id="reply-icon" alt="Reply" @click="postReply">
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
    <Reply v-for="reply in localReplies" :reply="reply" :listOfEditableReplies = "listOfEditableReplies" />

  </div>
</template>

<script>
  import Reply from './Reply.vue'
  import CommentPostBox from './CommentPostBox.vue'
  import EditBox from './EditBox.vue'

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
    }
  },

  created() {
    this.localReplies = [...this.replies];
  },

  computed: {
    
    body() {
      return this.comments.body
    },
    name() {

     return this.comments.userName ?? "Bob"

    },

    profileImage()
    {
      return this.comments.profliePhotoUrl ?? ""
    } , 

    formattedCreated() {
      return this.formatDate(this.comments.created)
    },

    formattedEdited() {
      return this.formatDate(this.comments.edited)
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

    postReply(){

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
    border-top: 2px solid #222222;
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
    border-bottom: 2px solid #222222;
  }

  p
  {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 32px;
    color: #FFFFFF;
    opacity: 0.55;
    text-align: left;
    padding-left: 15px;
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
      gap: 20px;
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
     background-color: rgb(66, 66, 66 , 0.2);
  }

  #icon-container:hover{
    
    background-color: rgb(66, 66, 66 , 0.5);
  }

  #reply-icon {
    width: 20px;
    height: 20px;
  }

  #profile-image
  {
    width: 25px;
    height: 25px;
    background-color: blue;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
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
      font-size: 0.7rem;
      font-weight: bold;
      color: #888;

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

  .dates div div {
      font-size: 0.5rem;
      font-weight: bold;
      color: #fff; /* White text for readability */
  }
</style>