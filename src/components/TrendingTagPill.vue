<template>
  <span class="tag-pill" :class="{ active: isActive }">{{ tag }}</span>
</template>

<script>
export default {
  name: 'TrendingTagPill',
  props: {
    tag: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
  }
}
</script>

<style scoped>
.tag-pill {
  display: inline-block;
  background-color: var(--tertiary-color);
  border-radius: 10px;
  padding: 6px 12px;
  font-family: var(--font-family-poppins);
  font-weight: var(--font-weight-regular);
  font-size: 14px;
  color: white;
  cursor: pointer;
  
}

.tag-pill.active {
  background-color: white;
  color: black;
}
</style>
