<template>
	<transition name="slide-up">
	<div v-if="visible" id = "container">
		
		<div id = "input-container">

			<div id="button-container">
				<button id = "cancel" @click="$emit('close')">
					<img src="@/assets/xmark.svg" id="cancel-icon" alt="Cancel" @click="postReply">
				</button>
				<button id = "submit" @click = "sendData" :disabled="loading">
					<p v-if="!loading">Edit</p>
					<div v-if="loading" id="loading"></div>
				</button>
			</div>
			
			<textarea v-model="body" name="add-comment" placeholder = "" class="comment-input"></textarea>
		</div>
	</div>
	</transition>
</template>

<script>
	import axiosObj from '../axios-config';

	export default {

		name: 'EditBox',

		props: {

		    visible: {
		      type: Boolean,
		      required: true

		    },

		    prevText : {
		      type: String,
		      required: true

		    },

		    type : {

		      type: String,
		      required: true

		    },

		    id: {

		    	type: Number,
		    	required: true
		    }

		  },

		emits: ['close'],

		data() {
		    return {
		      body: ''
		    };
		 },

		 watch: {

		    visible(newVal) {
		      if (newVal) {
		        this.body = this.prevText;
		      }
		    }
		 },

		methods: {

			async sendData() {

		      if (!this.body.trim()) return; 

		      try {

		        if (this.type == "post") {

			        const formData = new FormData();
	      			formData.append('postId', this.id);  
	      			formData.append('body', this.body);     

	      			await axiosObj.patch('/new', formData);

		        } 

		        if (this.type == "comment"){

		        	const formData = new FormData();
      				formData.append('Id', this.id);  
      				formData.append('body', this.body);     

      				await axiosObj.patch('/comment', formData);

		        }


		        if (this.type == "reply"){

		        	const formData = new FormData();
      				formData.append('Id', this.id);  
      				formData.append('body', this.body);     

      				await axiosObj.patch('/reply', formData);

		        }


		        if (this.type == "bio"){

		        	const formData = new FormData(); 
      				formData.append('bio', this.body);     

      				await axiosObj.post('/bio', formData);

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
		position: fixed;
		left: 0;
		top: 60px;
		width: 100vw;
		height: 60vh;
		z-index: 200;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 50px;
		background-color: var(--bg-color);
		border: 1px solid rgba(107, 107, 107, 0.3);
		
	}



	.comment-input {

	  padding: 20px;
	  width: 100%;
	  max-width: 100%;
	  height: 70%;
	  border-radius: 15px;
	  font-size: 32px;
	  color: white;
	  background-color: var(--tertiary-color);
	  color: white;
	  border: none;
	  font-family: 'Inter', sans-serif;
      font-weight: 800;
	  font-size: 24px;

	}

	.comment-input:focus {
	  outline: none;
	  border: none;
	}

	

	#input-container{
		
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 10px;
		width: 90%;
		height: 100%;
		background-color: var(--bg-color);
		display: flex;
		flex-direction: column;
		align-items: end;
		justify-content: center;
		gap: 10px;
		border-radius: 20px;

		
	}


	#button-container{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: end;
		gap: 10px;
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

	#submit:hover {
	  background-color: #357bd8;
	}

	#cancel{

		width: 60px;
		height: 60px;
		border: none;
		padding: 20px;
		border-radius: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--bg-color);
		transition: background-color 0.2s ease;
	}

	#cancel:hover{
		background-color: var(--tertiary-color);
	}

	.slide-up-enter-from {
		transform: translateY(-100%);
		opacity: 0;
	}

	.slide-up-enter-active {
		transition: transform 0.4s ease-out, opacity 0.4s ease-out;
	}

	.slide-up-enter-to {
		transform: translateY(0);
		opacity: 1;
	}

	
	.slide-up-leave-from {
		transform: translateY(0);
		opacity: 1;
	}

	.slide-up-leave-active {
		transition: transform 0.3s ease-in, opacity 0.3s ease-in;
	}

	.slide-up-leave-to {
		transform: translateY(100%);
		opacity: 0;
	}

</style>