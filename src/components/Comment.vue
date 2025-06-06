<template>
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
    <Reply v-for="reply in replies" :reply="reply" />

  </div>
</template>

<script>
  import Reply from './Reply.vue'

	export default {

  components: {
    Reply
  },

  name: 'Comment',

  props: {

    comments: {
      type: Object,
      required: true
    }
  } ,


  data() {
    return {

      postId: null,
      userId: null,
      replies: []
    }
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


  }, 

  mounted(){

    this.postId = this.comments.postId
    this.userId = this.comments.userId


  }

}
</script>

<style scoped>
	#comment-container
  {
    padding-top: 20px;
    padding-bottom: 30px;
    width: 100%;
    background: var(--bg-color);
    display: flex;
    flex-direction: column;
    align-items: end;
    z-index: 10;
    gap: 5px;
  }

  #comment-footer{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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