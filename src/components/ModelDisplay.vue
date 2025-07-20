<template>
	<div id="conatainer">
		<div id="main-container">
		 <p id="number">{{ number }}</p>
		<div id="icon-container">
			<img :src="getIconPath(iconName)" :alt="iconName" />
		</div>
	</div>
	<div id="model-name-container">
		<p id="mode-name">{{ iconName }}</p>
	</div>
	
	</div>
	
</template>
<script>
export default {
  name: "ModelDisplay",

  props: {
    number: {
      type: [Number, String],
      required: true
    },
    iconName: {
      type: String,
      required: true
    }
  },

  methods: {
    getIconPath(name) {
		  try {
		    return new URL(`../assets/${name}_icon.webp`, import.meta.url).href;
		  } catch (e) {
		    console.warn(`Icon not found: ${name}_icon.webp`);
		    return '';
		  }
		}
  }

}
</script>
<style scoped>

	#container{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15px;
		
	}


	#number{
		padding-top: 50px;
		font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 16px;
    left: -50%;
    color: white;
	}

	#main-container{
		height: 90px;
		width: 180px;
		background-color: var(--bg-color);
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: start;
		padding-left: 0px;
		border-radius: 15px;
		
	}


	#model-name-container{

  	width: 100%;
  	border-radius: 10px;
  	padding: 5px;
  	background-color: rgb(66, 66, 66 , 0.4);
  	margin-top: 60px;
  }


  #mode-name{
  	
  	font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-medium);
    font-size: 20px;
  	color: white;
  }



	#icon-container{
	   	left: 60%;
	   	transform: translate(-30%, 0%);
	   	background: #000000;
			background: radial-gradient(circle, rgba(0, 0, 0, 0.8) 23%, rgba(255, 255, 255, 0) 64%);
	    width: 180px;
	    height: 160px;
	    display: flex;
	    align-items: start;
	    justify-content: start;
	    border-radius: 100px;
	    z-index: 100;
	    margin-left: 0px;
	    
  	}


  	
	  

  	#main-container p {
  		left: 40%;
  		transform: translate(-50%, 0%);
  		position: relative;
  		-webkit-text-stroke: 2px #FF2160;
    	color: var(--bg-color);
  		font-family: 'Inter', sans-serif;
    	font-size: 180px;
    	font-weight: 400;
    	align-self: center;
  		margin-right: auto;
  		
  	}

	#icon-container img{
		width: 140px;
		height: 140px;

	}
	

	@media (min-width: 768px) and (max-width: 1024px){
    
     
     
    
} 

@media (max-width: 767px) {


	#model-name-container{

  	width: 60%;
  	border-radius: 6px;
  	padding: 2px;
  	background-color: rgb(66, 66, 66 , 0.4);
  	margin-top: 30px;
  	transform: translate(30%, 0%);
  }


  #mode-name{
  	
  	font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-medium);
    font-size: 16px;
  	color: white;
  }

	#icon-container{
	   	left: 60%;
	   	transform: translate(-10%, 0%);
	   	background: #000000;
			background: none;
	    width: 160px;
	    height: 160px;
	    display: flex;
	    align-items: start;
	    justify-content: start;
	    border-radius: 100px;
	    z-index: 100;
	    margin-left: 0px;
	    
  	}



	#main-container p {
  		left: 40%;
  		transform: translate(-50%, 0%);
  		position: relative;
  		-webkit-text-stroke: 2px #FF2160;
    	color: var(--bg-color);
  		font-family: 'Inter', sans-serif;
    	font-size: 120px;
    	font-weight: 400;
    	align-self: center;
  		margin-right: auto;
  		
  	}

	#icon-container img{
		width: 80px;
		height: 80px;

	}


}
</style>