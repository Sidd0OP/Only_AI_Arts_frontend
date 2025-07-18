<template>
	<div id = "side-bar-container">
		
		
      	<div id = "icon-container">
	        <img src="@/assets/post.svg" id="post-icon" alt="Trending" @click="goTrending">
	        <p>Trending</p>
      	</div>
      	<CreatePost />
      	<div id = "icon-container">
	        <img src="@/assets/view-grid.svg" id="grid-icon" alt="Gallery" @click="goGallery">
	        <p>Gallery</p>
      	</div>
      	
      	

	</div>
</template>
<script>
	import CreatePost from './CreatePost.vue'

	export default {

    	name: 'SidePanel',

    	components: {
		    
		    CreatePost,

		  },

    	methods: {
		    goBack() {
		      this.$router.go(-1); 
		    },

		    goTrending(){
		  		this.$router.push('/'); 
		  	},

		  	goGallery() {
		      this.$router.push('/gallery'); 
		    },
		    goHome() {
		      this.$router.push('/home'); 
		    }	

		  },

		  
	}
	
</script>

<style scoped>
	#side-bar-container{
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100px;
	  height: 100vh;
	  background-color: rgba(0, 0, 0, 0.5);
	  backdrop-filter: blur(40px);
	  -webkit-backdrop-filter: blur(40px);
	  padding: 0.5rem;
	  box-sizing: border-box;
	  z-index: 999;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  gap: 50px;
	}

	#icon-container{
		background-color: var(--bg-color);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 10px;
		border-radius: 10px;
		transition: 0.4s ease;
	}


	#icon-container p {

		font-family: var(--font-family-poppins);
    	font-weight: var(--font-weight-medium);
    	font-size:12px;
    	color: white;
    	opacity: 0.6;
	}

	#icon-container:hover{

		border-radius: 15px;
		background-color: var(--tertiary-color);

	}

	#icon-container img{

		width: 32px;
		height: 32px;
		opacity: 0.4;
		cursor: pointer;

	}


	@media (min-width: 768px) and (max-width: 1024px){
    
     
     
    
  	}	

  @media (max-width: 767px) {

  	#side-bar-container {
	  position: fixed;
	  top: auto;
	  bottom: 0;
	  width: 100%;
	  height: 100px;
	  box-sizing: border-box;
	  z-index: 999;
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: center;
	  gap: 80px;
	  background-color: var(--bg-color);
	  backdrop-filter: none;
	  -webkit-backdrop-filter: none;

	}

	#icon-container img{

		width: 24px;
		height: 24px;
		opacity: 0.8;
		gap: 5px;
		cursor: pointer;

	}

	#icon-container{
		background-color: rgba(0, 0, 0, 0.0);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10px;
		border-radius: 10px;
		transition: 0.4s ease;

	}
	
  }

</style>