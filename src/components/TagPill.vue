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
  background-color: rgb(66, 66, 66 , 0.4);
  border-radius: 999px;
  padding: 6px 15px;
  font-family: var(--font-family-poppins);
  font-weight: var(--font-weight-medium);
  font-size: 12px;
  color: white;
  margin-right: 8px;
  margin-bottom: 8px;
  /*border: 1px solid rgba(255, 255, 255, 0.25);*/
}
</style>
