<template>
  <Navbar />
  
    <div id="create-page">
      <div id = "hint-text-container">
          <p  id = "heading">Important things to follow</p>
          <li>✅ Supported file formats: <strong>.png</strong>, <strong>.gif</strong>, <strong>.jpeg</strong></li>
          <li>📏 Maximum file size: <strong>10 MB</strong></li>
          <li>🖼️ Recommended resolution: <strong>at least 800x600</strong> for best quality</li>
          <li>🚫 Do not upload offensive or copyrighted material</li>
        </div>
      <div class="create-card">
        <form id = "form-container" @submit.prevent="handleSubmission">
          <input v-model="title" type="text" placeholder="Title" required />
          <div id = "file-drag-area"
            @dragover.prevent="isDragOver = true"
            @dragenter.prevent="isDragOver = true"
            @dragleave.prevent="isDragOver = false"
            @drop.prevent="handleFileDrop"

            :style="[previewBackgroundStyle, dragOverStyle]">

            <p>Drag and drop the image file</p>
            <p>file types supported are  , png , jpeg , gif</p>
            <p>Or</p>
            
            <button type="button" @click="triggerFileSelect">Click to Upload</button>
            <input ref="fileInput" type="file" @change="handleFileUpload" accept=".jpg,.png,.gif" hidden />
          </div>
          
          <input id = "body-container" v-model="body" type="text" placeholder="Write something about this image" required />

          <div id = "post-button-container">
              <button type="submit">Post</button>
          </div>
          

          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  
</template>

<script>
import axiosObj from '../axios-config';
import Navbar from '../components/Navbar.vue'


export default {
  components: {
    Navbar,
  },

  data() {
    return {
      isDragOver: false,
      title: '',
      body: '',
      selectedFile: null,
      error: null,
    };
  },

  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.selectedFile = file;
      if (file && ['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
          this.setFilePreview(file);
          this.isDragOver = true;
        } else {
          this.error = 'Unsupported file type';
        }
    },

     handleFileDrop(event) {
        const file = event.dataTransfer.files[0];
        if (file && ['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
          this.selectedFile = file;
          this.setFilePreview(file);
        } else {
          this.error = 'Unsupported file type';
        }
        
    },

    triggerFileSelect() {
      this.$refs.fileInput.click();
    },

    setFilePreview(file) {

      this.selectedFile = file;
      this.previewUrl = URL.createObjectURL(file);
    },

    handleSubmission() {

      
      
      if (!this.selectedFile) {
        this.error = 'Please upload a file.';
        return;
      }

      this.error = null;

      
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('body', this.body);
      formData.append('file', this.selectedFile);

      axiosObj.post('/new', formData)
      .then(()=>{
          this.$router.push(`/`);
        }
      )
      .catch(err => {
        console.error(err);
        this.error = err;

    });
    }
  },

  computed: {
    dragOverStyle() {
      return this.isDragOver
        ? {
            border: '2px solid #357bd8',
            backgroundColor: '#1a1a1a',  
          }
        : {};
    },

    previewBackgroundStyle() {

      
        if (this.selectedFile) {
          
        return {
         
          backgroundImage: `url(${this.previewUrl})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',

          backgroundBlendMode: 'multiply',
          backgroundColor: 'rgba(255, 0, 0, 0.5)', 
          color: 'white',
        };
      }
      return {};

       
    }
  }


};
</script>

<style scoped>



#create-page {
 

  width: 100vw;
  
  z-index: 21;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
  gap: 20px;

  
}


#hint-text-container{

  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  background-color: var(--bg-color);
  border-radius: 15px;
  border: 1px solid rgba(107, 107, 107, 0.3);
  padding: 20px;
  gap: 10px;


} 

#hint-text-container p {
  padding-left: 20px;
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 32px;
}

#hint-text-container li {
  padding-left: 10px;
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
}

.create-card {
  background-color: var(--bg-color);
  width: 80%;
  border-radius: 15px;
  border: 1px solid rgba(107, 107, 107, 0.3);
  z-index: 10;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

}



.create-card form {
  width: 98%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.create-card #body-container
{
  background-color: var(--bg-color);
  width: 100%;
  border: none;
  padding-left: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 16px;

}

.create-card input[type="text"]
{
  background-color: var(--bg-color);
  outline: none;
  width: 100%;
  border: none;
  padding-left: 20px;
  padding-top: 10px;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 50px;
  color: white;
}

#form-container{
  display: flex;
  justify-content: center;
  align-items: center;
 
}

#file-drag-area{

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 95%;
  height: 60vh;
  background-color: #0F0F0F;
  border-radius: 20px;
  border: 2px dashed #575757;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 18px;

}



#post-button-container{

  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: start;
  padding: 10px;
}



.create-card button {
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
}

.create-card button:hover {
  background-color: #357bd8;
}

.create-card .error {
  color: #e74c3c;
  margin-top: 10px;
  text-align: center;
}




</style>
