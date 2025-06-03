<template>
  <Navbar />
  <main>
    <div id="create-page">
      <div class="post-card">
        <h2>Create</h2>
        <form @submit.prevent="handleSubmission">
          <input v-model="title" type="text" placeholder="Title" required />
          <input v-model="body" type="text" placeholder="Body" required />
          <input type="file" @change="handleFileUpload" accept=".jpg,.png,.gif" />

          <button type="submit">Post</button>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </main>
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
    },

    handleSubmission() {

      // Add form submission logic here
      console.log('Form submitted with:', {
        title: this.title,
        body: this.body,
        file: this.selectedFile
      });

      // Example: Set error if file not selected
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
      .then(response => {
      console.log('Post created:', response.data);
        this.title = '';
        this.body = '';
        this.selectedFile = null;
        this.error = null;
     
      })
      .catch(err => {
        console.error(err);
        this.error = err;

    });
    }
  }
};
</script>

<style scoped>
#create-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
  box-sizing: border-box;
  z-index: 10;
}

.post-card {
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  z-index: 10;
}

.post-card h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
}

.post-card form {
  display: flex;
  flex-direction: column;
}

.post-card input[type="text"],
.post-card input[type="file"],
.post-card textarea {
  margin-bottom: 15px;
  padding: 10px 12px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 14px;
}

.post-card button {
  padding: 10px;
  background-color: #4a90e2;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.post-card button:hover {
  background-color: #357bd8;
}

.post-card .error {
  color: #e74c3c;
  margin-top: 10px;
  text-align: center;
}
</style>
