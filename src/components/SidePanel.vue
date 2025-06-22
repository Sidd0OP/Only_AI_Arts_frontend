<template>
	<div id = "side-bar-container">
		
		<div id = "icon-container">
	        <img src="@/assets/long-arrow-up-left.svg" id="back-icon" alt="Back" @click="goBack">
      	</div>
      	<div id = "icon-container">
	        <img src="@/assets/post.svg" id="post-icon" alt="Trending" @click="goTrending">
      	</div>
      	<div id = "icon-container">
	        <img src="@/assets/view-grid.svg" id="grid-icon" alt="Gallery" @click="goGallery">
      	</div>
      	<div id = "icon-container">
	        <img src="@/assets/home-simple.svg" id="home-icon" alt="Home" @click="goHome">
      	</div>
      	

	</div>
</template>
<script>

	export default {

    	name: 'SidePanel',

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
		align-items: center;
		justify-content: center;
		padding: 10px;
		border-radius: 10px;
		transition: 0.4s ease;
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


</style>