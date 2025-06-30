<template>
  <transition name="fade">
    <div v-if="active" id="viewer-container">
      <div id="image-wrapper">
        <button id="close-button" @click="$emit('close')">
          <img src="@/assets/xmark.svg" id="cancel-icon" alt="Close">
        </button>
        <img :src="image" alt="Full Image" id="full-image" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ImageViewer',
  props: {
    image: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['close'],
};
</script>

<style scoped>
#viewer-container {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  border: 1px solid rgba(107, 107, 107, 0.3);
  z-index: 10000;
}

#image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#full-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);
}

#close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border: none;
  padding: 20px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2); 
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: background-color 0.2s ease;
  cursor: pointer;
}

#close-button:hover {
  background-color: var(--tertiary-color);
}

/* Fade transition */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
