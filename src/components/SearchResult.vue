<template>
  <div id="post-result">
    <div id="image-container" class ="shimmer" @click="goToPost">
      <img :src="url" loading="lazy" />
    </div>

    <div id="heading">
      <p @click="goToPost">{{ title }}</p>
    </div>

    <div id="icon-container">
      <img src="@/assets/search.svg" id="search-icon" alt="Search">
    </div>
  </div>

</template>

<script>
export default {
  name: 'SearchResult',

  props: {
    postId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },

  computed: {
    url() {
      return this.imageUrl ?? '';
    },
  },

  methods: {
    goToPost() {
      if (this.postId) {
        this.$router.push(`/post/${this.postId}/${this.title}`);
      }
    },
  },
};
</script>

<style scoped>
#post-result{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: end;
  background-color: var(--bg-color);
  padding-left: 10px;
  padding-right: 10px;
  gap: 20px;
  padding-top: 10px;
  padding-bottom: 10px;

}


#image-container{

  width: 60px;
  height: 40px;
  object-fit: contain;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

#image-container img{
  width: 101%;
  heading: 101%;
  object-fit: cover;
  z-index: 10;
}

#heading{
  background-color: var(--bg-color);
  min-height: 50px;
  border-radius: 10px;
  padding-left: 10px;
  padding-bottom: 4px;
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: start;
}

#heading p{

  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 20px;
}


.shimmer {
  position: relative;
  overflow: hidden;
  background: #e0e0e0;
}

.shimmer::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100px;
  height: 100%;
  width: 100px;
  background: linear-gradient(to right, transparent 0%, var(--tertiary-color) 40%, transparent 100%);
  animation: shimmer 0.3s infinite;
}

#icon-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--secondary-color);
}

#search-icon{
  height: 30px;
  width: 30px;
}




@keyframes shimmer {
  0% {
    left: -150px;
  }
  100% {
    left: 100%;
  }
}



</style>
