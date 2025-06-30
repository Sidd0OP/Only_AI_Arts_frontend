<template>
  <div id="post-result">
    <div id="image-container" @click="goToPost">
      <div class="shimmer"></div>
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
  padding-left: 10px;
  padding-right: 14px;
  padding-top: 14px;
  padding-bottom: 10px;
  gap: 20px;
  border-color: rgba(77, 77, 77, 0.5);
  border-width: 1px 0px 0px 0px; 
  border-style: solid;

}


#image-container{

  width: 80px;
  height: 40px;
  object-fit: contain;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  display: block;

}

#image-container img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; 
  margin: 0;
  padding: 0;
  z-index: 2;
}

#heading{
  
  min-height: 40px;
  padding-left: 0px;
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  z-index: 500;
}

#heading p{

  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 16px;
  cursor: pointer;
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
}

#search-icon{
  height: 20px;
  width: 20px;
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
