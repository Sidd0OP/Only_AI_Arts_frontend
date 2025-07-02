<template>
  <div class="image-card">
    <img :src="imageUrl" alt="Post Image" class="post-image" />
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    postId: {
      type: [String, Number],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.image-card {
  width: 250px;
  height: 250px;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 100;
  border-radius: 5px;

}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

  @media (min-width: 768px) and (max-width: 1200px)
  {
     
     .image-card {
    width: 150px;
    height: 150px;
    background-color: var(--bg-color);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 100;
    border-radius: 5px;
  }
    
  }

  @media (max-width: 767px) 
  {
    .image-card {
    width: 100px;
    height: 100px;
    background-color: var(--bg-color);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 100;
    border-radius: 5px;

}
  }
</style>
