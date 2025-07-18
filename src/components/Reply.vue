<template>

  <teleport to ="body">
    <EditBox 
    :prevText = "body" 
    :type = "'reply'" 
    :visible="showEditBox" 
    :id = "this.replyId"
    @close="this.showEditBox = false"
    @updated="update()"/>
  </teleport>


	<div id ="reply-container">

    <pre>
        {{ body }}
    </pre>

    

    <div id ="reply-footer">


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
          <button v-if = "this.replyEditable" id = "edit-button" @click = "editReply">
            <img id = "edit-icon" src="@/assets/edit-pencil.svg" alt="Edit">
          </button>
          <div class="dates">
              <div>
                  <small>Posted</small>
                  <div>{{ formattedCreated }}</div>
              </div>
              <div v-if="reply.edited">
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
  import EditBox from './EditBox.vue'

  

  export default {

  name: 'Reply',

  props: {

    reply: {
      type: Object,
      required: true
    },

    listOfEditableReplies: {
      type: Array,
      default: () => []  
    }
  } ,

  components: {
    
    EditBox
    
  },

  emits: ['updated'],

  data() {
    return {

      userId: null,
      replyId: null, 
      replyEditable: false,
      showEditBox: false
     
    }
  },

  computed: {
    
    body() {
      return this.reply.body
    },
    name() {

     return this.reply.userName ?? ""

    },

    profileImage()
    {
      const base = "https://res.cloudinary.com/decwrc84w/image/fetch";
      const transformation = "f_auto";
      const imageUrl = this.reply.profliePhotoUrl ?? "";

      return imageUrl ? `${base}/${transformation}/${encodeURIComponent(imageUrl)}` : "";

    
    } ,

    formattedCreated() {
      return this.formatDate(this.reply.created)
    },

    formattedEdited() {
      return this.formatDate(this.reply.edited)
    }
  },

  methods: {

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

    editReply() {
      this.showEditBox = true;
    },

  }, 

  mounted(){

    this.userId = this.reply.userId
    this.replyId = this.reply.replyId
    this.replyEditable = this.listOfEditableReplies.includes(this.replyId);
  }

}
</script>

<style scoped>
  #reply-container
  {
    padding-top: 20px;
    width: 94.5%;
    border-left: 1px dashed transparent;
    background-color: var(--bg-color);
    z-index: 10;

  
  border-image: repeating-linear-gradient(
    to bottom,
    rgba(77, 77, 77, 0.7) 0,
    rgba(77, 77, 77, 0.7) 10px,
    transparent 10px,
    transparent 20px
  ) 1;
  }

  

  pre
  {
    white-space: pre-line;
    font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 16px;
    color: white;
    text-align: left;
    padding-top: 0px;
    padding-bottom: 30px;
    padding-left: 20px;
  }

  

  #meta
  {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(77, 77, 77, 0.7);
  }

  #left-container
  {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      gap: 10px;
      padding-left: 20px;
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
      color: #055dff;
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
    background-color: var(--secondary-color);
    color: white;
    border-radius: 100px;
    width: 35px;
    height: 35px;
    border:  none;
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




      width: 35px;
      height: 35px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 100%;
      transition: background-color 0.3s ease;
      background-color: var(--bg-color);
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