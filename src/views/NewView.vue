<template>
  <div id = "main-wrapper">

  <Navbar @login-status-checked="onNavbarReady"/>
  <SidePanel />
    <div id="create-page">
      <div id = "hint-text-container">
          <p  id = "heading">Important things to follow</p>
          <li>Supported file formats: <strong>.png</strong>, <strong>.gif</strong>, <strong>.jpeg</strong></li>
          <li>Maximum file size: <strong>10 MB</strong></li>
          <li>Recommended resolution: <strong>at least 800x600</strong> for best quality</li>
      </div>
      <div class="create-card">
        <form id = "form-container" @submit.prevent="handleSubmission">
          <input v-model="title" type="text" placeholder="Title" required />
          <div id = "heading-bar-container">
            <div :class="['title-bar', { 'over-limit': title.length > 128 }]" :style="barStyle"></div>
          </div>
          
          <div id = "file-drag-area"
            @dragover.prevent="isDragOver = true"
            @dragenter.prevent="isDragOver = true"
            @dragleave.prevent="isDragOver = false"
            @drop.prevent="handleFileDrop"

            :style="[previewBackgroundStyle, dragOverStyle]">

            <p>Drag and drop the media file</p>
            <p>Or</p>
            
            <button type="button" @click="triggerFileSelect">Click to Upload</button>
            <input ref="fileInput" type="file" @change="handleFileUpload" accept=".jpg,.png,.gif" hidden />
          </div>
          
          <div id="body-text-description">
            <p>Describe this Image</p>
          <input id = "body-container" v-model="body" type="text" placeholder="This image is about..." required />
          </div> 
          

          <div id = "model-selection-container">
            <p>Pick an Art App or AI Model</p>
            <div id = "model-grid">
                <div id="icon-container" @click="model = 'blender'">
                  <img src="@/assets/blender_icon.webp" alt="blender" :class="{ selected: model === 'blender' }" />
                </div>

                <div id="icon-container" @click="model = 'cinema'">
                  <img src="@/assets/cinema_icon.webp" alt="cinema" :class="{ selected: model === 'cinema' }" />
                </div>

                <div id="icon-container" @click="model = 'maya'">
                  <img src="@/assets/maya_icon.webp" alt="maya" :class="{ selected: model === 'maya' }" />
                </div>

                <div id="icon-container" @click="model = 'krita'">
                  <img src="@/assets/krita_icon.webp" alt="krita" :class="{ selected: model === 'krita' }" />
                </div>

                <div id="icon-container" @click="model = 'procreate'">
                  <img src="@/assets/procreate_icon.webp" alt="procreate" :class="{ selected: model === 'procreate' }" />
                </div>

                <div id="icon-container" @click="model = 'photoshop'">
                  <img src="@/assets/photoshop_icon.webp" alt="photoshop" :class="{ selected: model === 'photoshop' }" />
                </div>

                <div id="icon-container" @click="model = 'gimp'">
                  <img src="@/assets/gimp_icon.webp" alt="gimp" :class="{ selected: model === 'gimp' }" />
                </div>

                

                <div id="icon-container" @click="model = 'gemini'">
                  <img src="@/assets/gemini_icon.webp" alt="Gemini" :class="{ selected: model === 'gemini' }" />
                </div>

                <div id="icon-container" @click="model = 'copilot'">
                  <img src="@/assets/copilot_icon.webp" alt="copilot" :class="{ selected: model === 'copilot' }" />
                </div>

                <div id="icon-container" @click="model = 'meta'">
                  <img src="@/assets/meta_icon.webp" alt="meta" :class="{ selected: model === 'meta' }" />
                </div>

                <div id="icon-container" @click="model = 'gpt'">
                  <img src="@/assets/gpt_icon.webp" alt="gpt" :class="{ selected: model === 'gpt' }" />
                </div>

                <div id="icon-container" @click="model = 'mid'">
                  <img src="@/assets/mid_icon.webp" alt="mid" :class="{ selected: model === 'mid' }" />
                </div>
            </div>
          </div>

          <div id="tag-area">
            <p>Describe this Image with Tags</p>
            <input v-model="tags" id = "tag-text-container" type="text" name="tag-input" placeholder="#Blue #Sky #Realistic" required>
          </div>
          

          <div id = "post-button-container">

              <label class="Adult_Content">
                <input v-model="rated" type="checkbox" name="rated">
                <span class="slider"></span>
                <p>Contains Sensitive Content</p>
              </label>

          </div>
          

          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>

      <div id = "hint-text-container">
          <p  id = "heading">All set. Let’s go!</p>
          
          <button id = "post-button" type="submit" form="form-container" :disabled="loading">
              <p v-if="!loading">Post</p>
              <div v-if="loading" id="loading"></div>
          </button>

      </div>


    </div>

  </div>
</template>

<script>
import axiosObj from '../axios-config';
import Navbar from '../components/Navbar.vue'
import SidePanel from '../components/SidePanel.vue'


export default {
  components: {
    Navbar,
    SidePanel
  },

  data() {
    return {
      isDragOver: false,
      title: '',
      body: '',
      selectedFile: null,
      error: null,
      loading: false,
      tags: '',         
      rated: false,
      model: '',
    };
  },


  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
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
          return;
        }

        if (file && file.size > 10 * 1024 * 1024) {
          this.error = 'File size must be under 10MB';
          return;
        }


    },

     handleFileDrop(event) {
        const file = event.dataTransfer.files[0];
        if (file && ['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
          this.selectedFile = file;
          this.setFilePreview(file);
        } else {
          this.error = 'Unsupported file type';
          return;
        }



        if (file && file.size > 10 * 1024 * 1024) {
          this.error = 'File size must be under 10MB';
          return;
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

      if (this.title.length > 128) {
        this.error = 'Title too Long';
        return;
      }
      
      
      if (!this.selectedFile) {
        this.error = 'Upload File to Submit';
        return;
      }

      this.error = null;
      this.loading = true;
      
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('body', this.body);
      formData.append('file', this.selectedFile);
      formData.append('tags', this.tags); 
      formData.append('rated', this.rated); 
      formData.append('model', this.model);




      axiosObj.post('/new', formData)
      .then(()=>{
          this.$router.push(`/`);
        }
      )
      .catch(err => {

        console.error(err);
        this.error = err;

      }).finally(() => {

        this.loading = false; 

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

    barStyle() {
      const maxLen = 128;
      const percent = Math.min((this.title.length / maxLen) * 100, 100);
      return {
        width: percent + '%',
        backgroundColor: this.title.length > maxLen ? 'red' : 'white',
      };
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

#main-wrapper{
  width: 100%;
}

#create-page {
 

  width: 100%;
  z-index: 21;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
  gap: 25px;

  
}


#hint-text-container{

  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  background-color: var(--bg-color);
  border-radius: 15px;
  border: 1px solid rgba(107, 107, 107, 0.3);
  padding: 25px;
  gap: 20px;
  z-index: 100;

} 

#hint-text-container p {
  padding-left: 5px;
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
  width: 95%;
  border-radius: 15px;
  border: 1px solid rgba(107, 107, 107, 0.3);
  z-index: 10;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

}

.selected {
  border: 2px solid #357bd8;
  border-radius: 12px;
}


.create-card form {
  width: 98%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.create-card #body-container
{
  background-color: var(--secondary-color);
  width: 95%;
  border-radius: 20px;
  border: none;
  margin-top: 30px;
  padding-left: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 24px;

}


#body-text-description{
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding-top: 20px;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 32px;
    color: white;
  }

#tag-area{
  margin-top: 20px;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 32px;
  color: white;
}

#tag-text-container{
  background-color: var(--secondary-color);
      width: 95%;
      border-radius: 10px;
      border: none;
      margin-top: 10px;
      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 20px;
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 32px;
}

#model-selection-container{
  width: 95%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 32px;
  color: white;
}

#model-grid{

  background-color: var(--bg-color);
  width: 100%;
  border-radius: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-content: center;
  gap: 20px;
 

  
}

#icon-container{
    background: #ffffff;
    background: var(--secondary-color);
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    transition: 0.4s ease;
  }

  #icon-container:hover{

    border-radius: 15px;
    background: #ffffff;
    

  }

  #icon-container img{

    width: 64px;
    height: 64px;
    cursor: pointer;

  }

.create-card input[type="text"]
{
  background-color: var(--bg-color);
  outline: none;
  width: 95%;
  border: none;
  padding-left: 5px;
  padding-top: 30px;
  padding-bottom: 30px;
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
  color: white;

}



#post-button-container{

  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
}

.Adult_Content{
  
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  position: relative;
  margin-top: 10px;
  background-color: white;
  width: 95%;
  border-radius: 15px;
  padding-left: 30px;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 24px;
  gap: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.Adult_Content p{

  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 24px;
  color: var(--bg-color);
}

.Adult_Content input[type="checkbox"] {
  display: none;
}

.Adult_Content .slider {
  position: relative;
  width: 50px;
  height: 26px;
  background-color: #ccc;
  border-radius: 50px;
  transition: 0.3s;
}

.Adult_Content .slider::before {
  content: "";
  position: absolute;
  height: 22px;
  width: 22px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  border-radius: 50%;
  transition: 0.3s;
}

.Adult_Content input:checked + .slider {
  background-color: #FF5733;
}

.Adult_Content input:checked + .slider::before {
  transform: translateX(24px);
}

#post-button{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 10px;
  background-color: #0F0F0F;
  color: white;
  border-radius: 10px;
  border: 1px solid rgba(107, 107, 107, 0.3);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

#post-button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}


#post-button:hover{
  background-color: #357bd8;
}

.create-card button {
  background-color: #0F0F0F;
  color: white;
  border-radius: 100px;
  border: 1px solid rgba(107, 107, 107, 0.3);
  width: 140px;
  height: 60px;
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
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 18px;
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

#heading-bar-container{

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;


}


.heading-bar {
  height: 1px; 
  width: 10%;  
  background-color: white; 
  margin-left: 20px; 
  margin-bottom: 10px;
  border-radius: 2px;
}

.title-bar {
  height: 2px;
  border-radius: 2px;
  transition: width 0.3s ease, background-color 0.3s ease;
  margin-left: 30px;
  margin-top: -25px;
  margin-bottom: 20px;
}

.over-limit {
  background-color: red !important;
}


@media (min-width: 768px) and (max-width: 1024px){
    
     
     
    
  }

  @media (max-width: 767px) {


    #create-page {
 

      width: 100%;
      z-index: 21;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0px;
      padding-top: 60px;
      gap: 0px;

      
  }

  #hint-text-container{

    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    background-color: var(--bg-color);
    border-radius: 0px;
    border: none;
    padding: 25px;
    gap: 20px;
    z-index: 100;

  } 


  #hint-text-container p {
    padding-left: 5px;
    color: white;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 24px;
  }

  #hint-text-container li {
    padding-left: 10px;
    color: var(--text-color);
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 10px;
  }


  .create-card {
  background-color: var(--bg-color);
  width: 100%;
  border-radius: 0px;
  border: none;
  z-index: 10;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

}

.create-card input[type="text"]
{
    background-color: var(--bg-color);
    outline: none;
    width: 95%;
    border: none;
    padding-left: 0px;
    padding-top: 30px;
    padding-bottom: 30px;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 32px;
    color: white;
  }


  .heading-bar {
    height: 1px; 
    width: 10%;  
    background-color: white; 
    margin-left: 20px; 
    margin-bottom: 10px;
    border-radius: 2px;
  }

  .title-bar {
    height: 2px;
    border-radius: 2px;
    transition: width 0.3s ease, background-color 0.3s ease;
    margin-left: 0px;
    margin-top: -25px;
    margin-bottom: 20px;
  }


  .create-card #body-container
  {
    background-color: var(--secondary-color);
    width: 95%;
    border-radius: 10px;
    border: none;
    margin-top: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 16px;

  }


  #model-selection-container{
  width: 95%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 24px;
  color: white;
}

  #body-text-description{
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding-top: 20px;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 24px;
    color: white;
  }


  #tag-text-container{
    background-color: var(--secondary-color);
      width: 95%;
      border-radius: 10px;
      border: none;
      margin-top: 10px;
      padding-top: 15px;
      padding-bottom: 15px;
      padding-left: 20px;
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 18px;
  }


  #tag-area{
    margin-top: 20px;
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 10px;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 24px;
    color: white;
  }


  .Adult_Content{
      width: 95%;
      border-radius: 10px;
      border: none;
      margin-top: 10px;
      padding-top: 15px;
      padding-bottom: 15px;
      padding-left: 20px;
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 18px;
  }

  .Adult_Content p{

  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 16px;
  color: var(--bg-color);
}

  }


</style>
