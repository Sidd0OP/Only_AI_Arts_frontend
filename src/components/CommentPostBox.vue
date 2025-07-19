<template>
	<transition name="slide-up">
	<div v-if="visible" id = "container">
		
		<div id = "input-container">
			<p id="replying-text">
				Replying to 
			</p>
			<div id="button-container">

				<p id="replying-text-value">
					
				</p>
				<div id="top-right-container">
					<button id = "cancel" @click="$emit('close')" :disabled="loading">
						<p>Cancel</p>
					</button>
					<button id = "submit" @click = "sendData" :disabled="loading">
						<p v-if="!loading">Send</p>
						<div v-if="loading" id="loading"></div>
					</button>
				</div>
				
			</div>
			
			<textarea v-model="body" name="add-comment" placeholder="Message.... " class="comment-input"></textarea>
		</div>
	</div>
	</transition>
</template>

<script>
	import axiosObj from '../axios-config';

	export default {

		name: 'CommentPostBox',

		props: {

		    visible: {
		      type: Boolean,
		      required: true

		    },

		    postId: {
		    	type: Number,
		    	required: true
		    },

		    commentId: {
		    	type: Number,
		    	required: false
		    }

		  },

		emits: ['close' , 'updated'],
		

		data() {
		    return {
		      body: '',
		      loading: false
		    };
		 },

		methods: {

			async sendData() {

		      if (!this.body.trim()) return; 

		      try {

		      	this.loading = true;

		        if (this.commentId == null) {

		        const formData = new FormData();
      			formData.append('postId', this.postId);  
      			formData.append('body', this.body);     

      			await axiosObj.post('/comment', formData);

		        } else {
		          
		          	const replyFormData = new FormData();
		          	
		          	replyFormData.append('CommentId', this.commentId); 
      				replyFormData.append('PostId', this.postId);  
      				replyFormData.append('body', this.body);     

      				await axiosObj.post('/reply', replyFormData);

		        	
		        }

		        this.body = '';
		        this.$emit('close'); 
		        this.$emit('updated'); 

		      } catch (err) {

		        console.error('Failed to send comment:', err);

		      } finally {

			    this.loading = false; 

			  }
    		
    	}
  	}
		
}

</script>

<style scoped>
	#container{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 50vw;
		height: 300px;
		z-index: 200;
		display: flex;
		align-items: center;
	}


	#input-container{
		
		padding: 10px;
		width: 100%;
		height: 100%;
		background-color: var(--bg-color);
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
		gap: 10px;
		border-radius: 20px;
		border: 1px solid rgba(107, 107, 107, 0.3);

		
	}

	


	.comment-input {

	  padding: 20px;
	  width: 100%;
	  height: 100%;
	  border-radius: 15px;
	  font-size: 32px;
	  color: white;
	  background-color: rgb(66, 66, 66 , 0.4);
	  color: white;
	  border: none;
	  font-family: var(--font-family-poppins);
	  font-weight: var(--font-weight-medium);
	  font-size: 24px;
	  color: white;
	}

	.comment-input:focus {
	  outline: none;
	  border: none;
	}

	



	#button-container{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		gap: 10px;
		background-color: rgb(66, 66, 66 , 0.4);
		border-radius: 15px;
	}

	#replying-text{
	  font-family: var(--font-family-poppins);
	  font-weight: var(--font-weight-medium);
	  font-size: 16px;
	  color: white;
	  opacity: 0.6;
	}


	#replying-text-value{
	  font-family: var(--font-family-poppins);
	  font-weight: var(--font-weight-medium);
	  font-size: 16px;
	  color: white;
	  text-align: left;
	}

	#top-right-container{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 100px;
	}

	#button-container button[disabled] {
		  opacity: 0.5;
		  cursor: not-allowed;
		}

	#submit{
		  
		background-color: white;
		color: black;
		border-radius: 100px;
		width: 125px;
		height: 35px;
		cursor: pointer;
		font-family: var(--font-family-poppins);
	  	font-weight: var(--font-weight-regular);
	  	font-size: 18px;
		transition: background-color 0.2s ease;
		box-shadow: none;
		border: none;
	}

	#submit:hover {
	  background-color: #357bd8;
	}

	#cancel{

		background-color: black;
		color: white;
		border-radius: 100px;
		width: 125px;
		height: 35px;
		cursor: pointer;
		font-family: var(--font-family-poppins);
	  	font-weight: var(--font-weight-regular);
	  	font-size: 18px;
		transition: background-color 0.2s ease;
		box-shadow: none;
		border: none;
	}

	#cancel:hover{
		background-color: var(--tertiary-color);
	}

	

	#loading {
	  display: inline-block;
	  width: 20px;
	  height: 20px;
	  border: 3px solid rgba(255,255,255,.3);
	  border-radius: 50%;
	  border-top-color: #fff;
	  animation: spin 1s ease-in-out infinite;
	  -webkit-animation: spin 1s ease-in-out infinite;
	}

	@keyframes spin {
	  to { -webkit-transform: rotate(360deg); }
	}
	@-webkit-keyframes spin {
	  to { -webkit-transform: rotate(360deg); }
	}


	@media (min-width: 768px) and (max-width: 1024px){
    
     
     
    
} 

@media (max-width: 767px) {

	#container{
		padding-top: 60px;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100vh;
		z-index: 200;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 50px;
		background-color: var(--bg-color);
		border: none;
		
	}


	#input-container{
		
		padding-left: 5px;
		padding-right: 5px;
		padding-bottom: 10px;
		width: 100%;
		height: 100%;
		background-color: var(--bg-color);
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: start;
		gap: 10px;
		border-radius: 20px;

		
	}

	.comment-input {
	  position: sticky;
	  top: 0px;
	  padding: 20px;
	  width: 100%;
	  max-height: 40%;
	  border-radius: 10px;
	  font-size: 32px;
	  color: white;
	  background-color: var(--bg-color);
	  color: white;
	  border: none;
	  font-family: 'Inter', sans-serif;
      font-weight: 800;
	  font-size: 16px;

	}


}

</style>