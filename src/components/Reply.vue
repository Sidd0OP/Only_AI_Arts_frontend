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

    <p>
      {{ body }}
    </p>

    

    <div id ="reply-footer">


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
    width: 85%;
    border: 1px solid rgba(107, 107, 107, 0.3);
    /*box-shadow: inset 2px 2px 2px  #222222;*/
    z-index: 10;
    background-color: var(--secondary-color);

  }

  

  p
  {
    font-size: 1rem;
    font-weight: bold;
    color: #FFFFFF;
    opacity: 0.55;
    text-align: left;
    padding-top: 30px;
    padding-bottom: 10px;
    padding-left: 15px;
  }

  

  #meta
  {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /*border-bottom: 2px solid #222222;*/
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
    background-color: blue;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    background-color: var(--bg-color);
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
      font-size: 0.5rem;
      font-weight: bold;
      color: #fff; 
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