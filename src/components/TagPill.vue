<template>
  <span class="tag-pill">{{ tag }}</span>
</template>

<script>
export default {
  name: 'TagPill',
  props: {
    tag: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.tag-pill {
  display: inline-block;
  background-color: var(--tertiary-color);
  border-radius: 999px;
  padding: 6px 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 16px;
  color: white;
  opacity: 0.55;
  margin-right: 8px;
  margin-bottom: 4px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
</style>
