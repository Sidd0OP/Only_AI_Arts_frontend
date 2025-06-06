<template>
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
  export default {

  name: 'Reply',

  props: {

    reply: {
      type: Object,
      required: true
    }
  } ,


  data() {
    return {

      userId: null
     
    }
  },

  computed: {
    
    body() {

      return this.reply.body
    },
    name() {

     return this.reply.userName ?? "Bob"

    },

    profileImage()
    {
      return this.reply.profliePhotoUrl ?? ""
    } , 

    formattedCreated() {
      return this.formatDate(this.reply.created)
    },

    formattedEdited() {
      return this.formatDate(this.reply.edited)
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


  }, 

  mounted(){

    this.userId = this.reply.userId

  }

}
</script>

<style scoped>
  #reply-container
  {
    padding-top: 20px;
    width: 90%;
    box-shadow: inset 2px 0 0 #222222;
    z-index: 10;


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
    margin-bottom: -25px;
  }

  #left-container
  {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      border-left: 2px solid #222222;
      border-bottom: 2px solid #222222;
      border-bottom-left-radius: 25px;
      gap: 10px;
      padding: 10px;
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

  .dates div div {
      font-size: 0.5rem;
      font-weight: bold;
      color: #fff; /* White text for readability */
  }
</style>