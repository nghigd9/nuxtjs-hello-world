<template>
  <BaseModal
    v-model="isOpen"
    title="Report an Error"
    @close="resetForm"
  >
    <form @submit.prevent="submitReport" class="report-form">
      <div class="form-group">
        <label for="error-type">Error Type</label>
        <select id="error-type" v-model="formData.errorType" required>
          <option value="" disabled>Select error type</option>
          <option value="bug">Bug</option>
          <option value="display">Display Issue</option>
          <option value="feature">Missing Feature</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="error-description">Description</label>
        <textarea 
          id="error-description" 
          v-model="formData.description" 
          placeholder="Please describe the issue in detail..." 
          rows="5"
          required
        ></textarea>
      </div>
      
      <div class="form-group">
        <label>Screenshot (optional)</label>
        <div class="file-upload">
          <div 
            class="upload-area" 
            @click="triggerFileInput" 
            @dragover.prevent="onDragOver" 
            @dragleave.prevent="onDragLeave" 
            @drop.prevent="onFileDrop"
            :class="{ 'drag-over': isDragging }"
          >
            <input 
              type="file" 
              ref="fileInput" 
              @change="handleFileUpload" 
              accept="image/*" 
              class="file-input"
            />
            <div v-if="!formData.image">
              <Icon name="uil:upload" class="upload-icon" />
              <p>Drop image here or click to upload</p>
              <p class="upload-hint">PNG, JPG or GIF (max. 5MB)</p>
            </div>
            <div v-else class="image-preview">
              <img :src="imagePreview" alt="Preview" />
              <button type="button" class="remove-image" @click.stop="removeImage">
                <Icon name="uil:trash-alt" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="error-email">Your Email (optional)</label>
        <input 
          type="email" 
          id="error-email" 
          v-model="formData.email" 
          placeholder="So we can follow up with you"
        />
      </div>
      
      <div v-if="error" class="form-error">
        {{ error }}
      </div>
    </form>
    
    <template #footer>
      <button type="button" class="modal-button" @click="closeModal">Cancel</button>
      <button 
        type="button" 
        class="modal-button primary" 
        @click="submitReport"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting">
          <Icon name="uil:spinner" class="spinner" />
          Submitting...
        </span>
        <span v-else>Submit Report</span>
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
const isOpen = ref(false);
const isSubmitting = ref(false);
const error = ref('');
const isDragging = ref(false);
const fileInput = ref(null);
const imagePreview = ref('');

const formData = ref({
  errorType: '',
  description: '',
  image: null,
  email: ''
});

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
  resetForm();
};

const resetForm = () => {
  formData.value = {
    errorType: '',
    description: '',
    image: null,
    email: ''
  };
  error.value = '';
  imagePreview.value = '';
  isSubmitting.value = false;
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const onDragOver = () => {
  isDragging.value = true;
};

const onDragLeave = () => {
  isDragging.value = false;
};

const onFileDrop = (e) => {
  isDragging.value = false;
  const files = e.dataTransfer.files;
  if (files.length) {
    validateAndSetFile(files[0]);
  }
};

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    validateAndSetFile(file);
  }
};

const validateAndSetFile = (file) => {
  // Check if file is an image
  if (!file.type.match('image.*')) {
    error.value = 'Please upload an image file (PNG, JPG, GIF)';
    return;
  }
  
  // Check file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'Image size should be less than 5MB';
    return;
  }
  
  // Clear any existing errors
  error.value = '';
  
  // Set the file and create preview
  formData.value.image = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const removeImage = () => {
  formData.value.image = null;
  imagePreview.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const submitReport = async () => {
  // Validate form
  if (!formData.value.errorType || !formData.value.description) {
    error.value = 'Please fill out all required fields';
    return;
  }
  
  isSubmitting.value = true;
  error.value = '';
  
  try {
    // In a real app, you would send the data to your backend
    // For now, we'll simulate an API call with a timeout
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful submission
    console.log('Form submitted:', formData.value);
    
    // Show success message and close modal
    alert('Thank you for your report! We will look into it.');
    closeModal();
  } catch (err) {
    console.error('Error submitting form:', err);
    error.value = 'There was an error submitting your report. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};

// Expose functions to be used outside the component
defineExpose({
  openModal,
  closeModal
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use 'sass:color';

.report-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-weight: 600;
    color: $text-white-light;
    font-size: 0.95rem;
  }
  
  input, select, textarea {
    background-color: $bg-tertiary;
    border: 1px solid $border-color;
    border-radius: 4px;
    padding: 0.75rem;
    color: $text-white;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: $primary-color;
    }
    
    &::placeholder {
      color: $text-muted;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
}

.file-upload {
  width: 100%;
}

.upload-area {
  border: 2px dashed $border-color;
  border-radius: 6px;
  padding: 2rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    border-color: $primary-color;
    background-color: rgba($primary-color, 0.05);
  }
  
  &.drag-over {
    border-color: $primary-color;
    background-color: rgba($primary-color, 0.1);
  }
  
  .upload-icon {
    font-size: 2.5rem;
    color: $primary-color;
    margin-bottom: 0.5rem;
  }
  
  .upload-hint {
    font-size: 0.85rem;
    color: $text-muted;
    margin-top: 0.5rem;
  }
}

.file-input {
  display: none;
}

.image-preview {
  position: relative;
  max-width: 100%;
  
  img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 4px;
  }
  
  .remove-image {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba($bg-primary, 0.7);
    color: $error;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background-color: $bg-primary;
      transform: scale(1.1);
    }
  }
}

.form-error {
  color: $error;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.spinner {
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>