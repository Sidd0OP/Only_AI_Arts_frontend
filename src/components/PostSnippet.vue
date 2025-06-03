<template>
  <div id ="post-snippet">
    <h2 @click="goToPost">{{ title }}</h2>


    <div id="image-container" @click="goToPost">
      <img :src="url" />
    </div>

    <p>
      {{ body }}
    </p>

    

    <hr class="divider" />

    <div id ="post-footer">


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
          <img src="@/assets/message-text.svg" id="comments-icon" alt="Comments">
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
export default {
  name: 'PostSnippet',
  props: {

    post: {
      type: Object,
      required: true
    }
  } ,


  data() {
    return {
      postId: null,
      userId: null
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

     return this.post.userName ?? "Bob"

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
      return this.post.edited 
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
        this.$router.push(`/post/${this.postId}`)
      } 
    }

  } , 

  mounted(){

    this.postId = this.post.postId
    this.userId = this.post.userId
    console.log('Stored:', this.postId, this.userId);
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
    background-color: blue;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }

  #comments-icon {
    width: 22px;
    height: 22px;
  }


  .dates
  {
    display: flex;
    flex-direction: row;
    align-items: center;

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


  #image-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60vh;
    border-radius: 20px;
    margin: 20px;
    overflow: hidden;
    background-color: gray;
  }

  #image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

</style>
