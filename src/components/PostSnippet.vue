<template>
  <div id ="post-snippet">
    <h2>{{ title }}</h2>

    <p>
      {{ body }}
    </p>

    <hr class="divider" />

    <div id ="post-footer">


      <div id ="meta">

        <div id ="left-container">
          <div id ="profile-image"></div>
          <div id = "name">
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

  computed: {
    title() {
      return this.post.title
    },
    body() {
      return this.post.body
    },
    name() {

//      return this.post.userName
      return "Name"
    },

    formattedCreated() {
      return this.formatDate(this.post.created)
    },

    formattedEdited() {
      return this.post.edited ? this.formatDate(this.post.edited) : '-'
    }
  },

  methods: {
    formatDate(isoString) {
      if (!isoString) return '-'
      const d = new Date(isoString)
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return d.toLocaleDateString(undefined, options)
    }
  }

}
</script>

<style scoped>
  #post-snippet
  {
    width: 100%;
    background: #0E1217;
    border-radius: 15px;
    border: 2px solid #222222;
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
  }

  p
  {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 32px;
    color: #FFFFFF;
    opacity: 0.55;
    text-align: left;
    padding-top: 10px;
    padding-left: 15px;
  }

  .divider {
    width: 97%;
    margin: 16px auto;
    opacity: 0.4;
    height: 1px;
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
      margin-left: 25px;
      margin-bottom: 20px;
  }

    #name
    {
        width: 40px;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-left: 25px;

      }

    #name-text
    {
      font-size: 1.3rem;
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
      margin-bottom: 20px;
      gap: 25px;
    }

  #profile-image
  {
    width: 35px;
    height: 35px;
    background-color: blue;
    border-radius: 50%;
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




</style>
