<template>
	<div id ="comment-container">

    <p>
      {{ body }}
    </p>

    <hr class="divider" />

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
          
          <div class="dates">
              <div>
                  <small>Posted</small>
                  <div>{{ formattedCreated }}</div>
              </div>
              <div v-if="comment.edited">
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
  name: 'Comment',

  props: {

    comment: {
      type: Object,
      required: true
    }
  } ,


  data() {
    return {

      postId: null,
      userId: null,
      replies: [],
    }
  },

  computed: {
    
    body() {
      return this.comment.body
    },
    name() {

     return this.comment.userName ?? "Bob"

    },

    profileImage()
    {
      return this.comment.profliePhotoUrl ?? ""
    } , 

    formattedCreated() {
      return this.formatDate(this.comment.created)
    },

    formattedEdited() {
      return this.comment.edited 
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

    this.postId = this.comment.postId
    this.userId = this.comment.userId
    console.log('Stored:', this.postId, this.userId);
  }

}
</script>

<style scoped>
	#comment-container
  {
    width: 100%;
    background: var(--bg-color);
    border-radius: 15px;
    border: 1px solid #222222;
    z-index: 10;
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
    background-color: blue;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }
</style>