<template>
  <div id ="post-snippet">
    <h2>{{ title }}</h2>

    <p>
      {{ body }}
    </p>

    <div id ="post-footer">
      <div>
        <span>{{ name }}</span>
      </div>

      <div class="meta">
        <span class="comments-icon">[Comments Icon]</span>

        <div class="dates">

          <div>
            <small>Posted</small>
            <div>May 29, 2025</div>
          </div>

          <div>
            <small>Edited</small>
            <div>May 29, 2025</div>
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
    title: String,
    body: String,
    name: String
  }
}
</script>

<style scoped>
  #post-snippet
  {
    width: 100%;
    height: 400px;
    background: red;

  }
</style>
