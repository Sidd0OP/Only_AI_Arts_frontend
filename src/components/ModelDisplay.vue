<template>
	<div id="main-container">
		 <p id="number">{{ number }}</p>
		<div id="icon-container">
			<img :src="getIconPath(iconName)" :alt="iconName" />
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

	#main-container{
		height: 120px;
		background-color: var(--bg-color);
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		padding-left: 10px;
	}

	#icon-container{
	   	
	   	background: #000000;
		background: radial-gradient(circle, rgba(0, 0, 0, 0.8) 23%, rgba(255, 255, 255, 0) 64%);
		/*background-color: var(--bg-color);*/
	    width: 120px;
	    height: 120px;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    border-radius: 100px;
	    z-index: 100;
	    margin-left: 0px;
  	}


  	
	  

  	#main-container p {
  		position: absolute;
  		-webkit-text-stroke: 2px #FF2160;
    	color: var(--bg-color);
  		font-family: 'Inter', sans-serif;
    	font-size: 120px;
    	font-weight: 400;
    	align-self: center;
  		margin-right: auto;
  		
  	}

	#icon-container img{
		width: 60%;
		height: 60%;

	}
	
</style>