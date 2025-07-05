<template>
  <div id ="post-snippet">
    <div id = "heading" class="shimmer"></div>


    <div id="image-container" class="shimmer">
      
    </div>

    <div id = "body" class="shimmer"></div>

    <hr class="divider" />

    <div id ="post-footer">


      <div id ="meta" class="shimmer">

        

      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'PostSnippetSkeleton'
}

  
</script>

<style scoped>

  #post-snippet
  {
    width: 100%;
    background: var(--bg-color);
    border-radius: 15px;
    border: 1px solid #222222;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    z-index: 10;
  }

  #heading{

    width: 100%;
    height: 50px;
    background-color: var(--secondary-color);
    border-radius: 10px;
  }

  #image-container{
    width: 100%;
    height: 40vh;
    background-color: var(--secondary-color);
    border-radius: 10px;
  }

  #body{
    width: 100%;
    height: 30px;
    background-color: var(--secondary-color);
    border-radius: 10px;
  }

  .divider {
    width: 97%;
    margin: 10px auto;
    opacity: 0.4;
    border-top: 1px solid #999999;

  }

  #meta
  {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    background-color: var(--secondary-color);
    border-radius: 10px;
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
  left: -400px;
  height: 100%;
  width: 400px;
  background: linear-gradient(to right, transparent 0%, var(--tertiary-color) 40%, transparent 100%);
  animation: shimmer 0.3s infinite;
}



@keyframes shimmer {
  0% {
    left: -150px;
  }
  100% {
    left: 100%;
  }
}
  
@media (max-width: 767px) {

  #post-snippet {
    width: 100vw;
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    padding-left: 0;
    padding-right: 0;
  }

  .divider {
    width: 100%;
  }

}

</style>
