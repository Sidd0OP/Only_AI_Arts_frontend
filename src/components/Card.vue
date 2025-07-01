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
</style>
