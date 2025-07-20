<template>
	<div id="profile-container">
		<div id="top-bar">
			<div id="profile-image">
				<div id="p-image-container">
					<img :src="imageUrl" alt="profile-image">
				</div>
				
			</div>
			
			<div id="user-data">

				<div id="name-container">
					<p id="name">{{ name }}</p>
					<button  id = "edit-button" @click = "editComment">
            <p>Edit</p>
      		</button>
				</div>
				

				<div id="date-container">

					<div id = "icon-container">
            <img src="@/assets/calendar.svg" id="calendar-icon" alt="Joined">
            <p>Joined  {{ joined }}</p>
          </div>


          <div id = "icon-container">
            <img src="@/assets/stroller.svg" id="stroller-icon" alt="Born">
            <p>Born  {{ joined }}</p>
          </div>
					
				</div>

				<div id="activity-bar">
					<div id = "icon-container">
						<p id="number">10</p>
            <p>Posts</p>
            
          </div>


          <div id = "icon-container">
          	<p id="number">8</p>
            <p>Replies</p>
            
          </div>

          <div id = "icon-container">
          	<p id="number">1</p>
            <p>Hearts</p>
            
          </div>
			</div>
				
			</div>
		</div> 
		
		<div id="bio-bar">
			<pre>{{ bio }}</pre>
		</div>
		

	</div>
	
</template>
<script>
export default {
  name: "Profile",

  props: {


    imageUrl: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    joined: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      required: true,
    },

    posts: {
      type: String,
      required: false,
    },

    replies: {
      type: String,
      required: false,
    },

    hearts: {
      type: String,
      required: false,
    },


  },




}
	
</script>
<style scoped>

	#profile-container{

			width: 100%;
			max-width: 700px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 15px;
			overflow: hidden;
			border: 1px solid #222222;

	}

	#top-bar{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		
	}

	#date-container{
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		gap: 30px;
	}

	#name-container{
		padding-right: 20px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 100px;
	}

	#icon-container{

    height: 36px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    
	}

	#icon-container p {

		font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 16px;
    color: white;
    opacity: 0.5;
	}


	#icon-container img {
		width: 20px;
		height: 20px;
	}
	

	#profile-image{
		width: 30%;
		height: 100%;
		display: flex;
		align-items: end;
		justify-content: start;
		padding-left: 20px;
		padding-top: 15px;
		padding-bottom: 10px;

	}


	#p-image-container{
		width: 120px;
		height: 120px;
		background-color: gray;
		border-radius: 100%;
		overflow: hidden;
	}

	#p-image-container img{
		width: 100%;
	  height: 100%;
	  object-fit: cover;
	  border-radius: 50%;
	  display: block;
	}

	#user-data{
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		padding-left: 0px;
		gap: 0px;
		
	}


	#name{
		font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 24px;
    color: white;
	}



	#bio-bar{
		width: 100%;
		padding-top: 10px;
		padding-bottom: 5px;
		padding-left: 20px;
		text-align: left;
	}


	#bio-bar pre {
		white-space: pre-line; 
		font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 16px;
    color: white;
	}


	#activity-bar{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		gap: 20px;
		padding-left: 0px;
		padding-right: 20px;
	}


	#number{
		font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 32px;
    color: white;
	}

	#edit-button{
		  
		background-color: var(--bg-color);
		color: white;
		border-radius: 100px;
		border: 1px solid rgba(107, 107, 107, 0.6);
		width: 110px;
		height: 35px;
		cursor: pointer;
		font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 16px;
		transition: background-color 0.2s ease;
		box-shadow: none;
	}


@media (min-width: 485px) and (max-width: 890px){
    
     #profile-container{

			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 0px;
			overflow: hidden;
			border: none;

	}


	#p-image-container{
		width: 110px;
		height: 110px;
	}

	#user-data{
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		padding-left: 0px;
		gap: 0px;
		
	}

	#profile-image{
		width: 30%;

	}


	



	#bio-bar{
		width: 100%;
		padding-top: 10px;
		padding-bottom: 5px;
		padding-left: 20px;
		padding-right: 10px;
		text-align: left;
	}


	

	#icon-container{

    height: 36px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    
	}


	#icon-container img {
		width: 14px;
		height: 14px;
	}
	




     
    
} 

@media (max-width: 484px) {

	#profile-container{

			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 0px;
			overflow: hidden;
			border: none;

	}


	#p-image-container{
		width: 80px;
		height: 80px;
	}

	#user-data{
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		padding-left: 0px;
		gap: 0px;
		
	}

	#profile-image{
		width: 30%;

	}


	#name{
    font-size: 18px;
    color: white;
	}



	#bio-bar{
		width: 100%;
		padding-top: 10px;
		padding-bottom: 5px;
		padding-left: 20px;
		padding-right: 10px;
		text-align: left;
	}


	#bio-bar pre {
		white-space: pre-line; 
		font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 14px;
    color: white;
	}

	#icon-container{

    height: 36px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 3px;
    
	}


	#icon-container img {
		width: 14px;
		height: 14px;
	}
	

	#icon-container p {

    font-size: 14px;
    
	}

	#date-container{
		
		gap: 10px;
	}


	#edit-button{
		  
		background-color: var(--bg-color);
		color: white;
		border-radius: 100px;
		border: 1px solid rgba(107, 107, 107, 0.6);
		width: 90px;
		height: 30px;
		cursor: pointer;
		font-family: var(--font-family-poppins);
    font-weight: var(--font-weight-regular);
    font-size: 12px;
	}

	

}

	
</style>