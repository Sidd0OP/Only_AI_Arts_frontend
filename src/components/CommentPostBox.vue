<template>
	<div v-if="visible" id = "container">
		<div id = "input-container">
			<textarea v-model="body" name="add-comment" placeholder="Write your comment..." class="comment-input"></textarea>
			<button id = "submit" @click = "sendData">Send</button>
		</div>
		<button id = "cancel" @click="$emit('close')">Cancel</button>
		
	</div>
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

		emits: ['close'],

		data() {
		    return {
		      body: ''
		    };
		 },

		methods: {

			async sendData() {

		      if (!this.body.trim()) return; 

		      try {

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

		      } catch (err) {
		        console.error('Failed to send comment:', err);
		      }
    		
    	}
  	}
		
}

</script>

<style scoped>
	#container{
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: 200;
		backdrop-filter: blur(10px);
  		-webkit-backdrop-filter: blur(10px); /* For Safari */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.comment-input {
	  width: 100%;
	  height: 80%;
	  padding: 10px 12px;
	  border: 1px solid #ccc;
	  border-radius: 8px;
	  font-size: 32px;
	  color: white;
	  background-color: var(--bg-color);

	}

	.comment-input:focus {
	  outline: none;
	}

	#input-container{
		
		padding: 20px;
		background-color: var(--bg-color);
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 10px;
		border-radius: 20px;
		border: 1px solid rgba(107, 107, 107, 0.3);
	}


	#submit{
		  
		background-color: #0F0F0F;
		color: white;
		border-radius: 100px;
		border: 1px solid rgba(107, 107, 107, 0.3);
		width: 125px;
		height: 45px;
		cursor: pointer;
		font-family: 'Inter', sans-serif;
		font-weight: 800;
		font-size: 12px;
		transition: background-color 0.2s ease;
		box-shadow: none;
	}

</style>