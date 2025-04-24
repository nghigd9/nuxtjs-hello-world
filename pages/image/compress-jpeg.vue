<template>
  <div class="compress-jpeg-tool">
    <h1>Compress JPEG Image</h1>
    <p>Reduce the file size of your JPEG images while controlling the quality.</p>

    <div class="tool-area">
      <!-- File Input -->
      <div class="input-section file-input-section">
        <label for="fileInput" class="file-label">
          <Icon name="uil:image-upload" />
          <span>{{ file ? file.name : 'Select JPEG Image' }}</span>
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/jpeg, image/jpg"
          @change="handleFileChange"
          ref="fileInputRef"
        />
        <button v-if="file" @click="clearSelection" class="btn btn-clear-file">
          <Icon name="uil:times-circle" /> Clear
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <div v-if="originalImageUrl" class="content-area">
        <!-- Options -->
        <div class="options-section">
          <label for="qualityRange">Quality ({{ quality }}%):</label>
          <input
            type="range"
            id="qualityRange"
            min="1"
            max="100"
            v-model.number="quality"
            class="quality-slider"
          />
        </div>

        <!-- Previews & Info -->
        <div class="previews-info">
          <div class="image-preview original-preview">
            <label>Original:</label>
            <img :src="originalImageUrl" alt="Original JPEG" />
            <div class="image-info">Size: {{ formatSize(originalSize) }}</div>
          </div>

          <div class="image-preview compressed-preview">
            <label>Compressed:</label>
            <img v-if="compressedImageUrl" :src="compressedImageUrl" alt="Compressed JPEG" />
            <div v-else class="placeholder">Adjust quality to preview</div>
            <div v-if="compressedSize > 0" class="image-info">
              Size: {{ formatSize(compressedSize) }}
              <span v-if="compressionRatio !== null" :class="compressionRatio > 0 ? 'reduction' : 'increase'">
                ({{ compressionRatio > 0 ? '-' : '+' }}{{ Math.abs(compressionRatio) }}%)
              </span>
            </div>
          </div>
        </div>

        <!-- Download Button -->
        <div class="actions">
          <button
            @click="downloadImage"
            class="btn btn-download"
            :disabled="!compressedImageUrl || isProcessing"
          >
            <Icon name="uil:download-alt" /> Download Compressed Image
          </button>
           <div v-if="isProcessing" class="processing-indicator">
             <Icon name="uil:spinner-alt" class="spin-icon" /> Processing...
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useSeoMeta } from '#imports';

definePageMeta({
  layout: 'tools', // Use the tools layout
});

// --- Refs ---
const fileInputRef = ref(null);
const file = ref(null);
const quality = ref(80); // Default quality
const originalImageUrl = ref(null);
const compressedImageUrl = ref(null);
const originalSize = ref(0);
const compressedSize = ref(0);
const errorMessage = ref('');
const isProcessing = ref(false);

// --- SEO ---
useSeoMeta({
  title: 'Compress JPEG Image Tool',
  description: 'Online tool to compress JPEG images and reduce file size with adjustable quality settings.',
});

// --- Computed ---
const compressionRatio = computed(() => {
  if (originalSize.value > 0 && compressedSize.value > 0) {
    return Math.round(((originalSize.value - compressedSize.value) / originalSize.value) * 100);
  }
  return null;
});

// --- Methods ---
const handleFileChange = (event) => {
  clearState();
  const selectedFile = event.target.files?.[0];
  if (!selectedFile) {
    return;
  }

  if (!['image/jpeg', 'image/jpg'].includes(selectedFile.type)) {
    errorMessage.value = 'Invalid file type. Please select a JPEG or JPG image.';
    clearFileInput();
    return;
  }

  file.value = selectedFile;
  originalSize.value = selectedFile.size;

  // Display original image preview
  const reader = new FileReader();
  reader.onload = (e) => {
    originalImageUrl.value = e.target?.result;
    // Trigger initial compression
    compressImage();
  };
  reader.onerror = () => {
      errorMessage.value = 'Error reading file.';
      clearState();
  }
  reader.readAsDataURL(selectedFile);
};

const compressImage = async () => {
  if (!file.value || !originalImageUrl.value || isProcessing.value) {
    return;
  }

  isProcessing.value = true;
  compressedImageUrl.value = null; // Clear previous compressed image
  compressedSize.value = 0;
  errorMessage.value = ''; // Clear previous errors

  try {
    const qualityValue = quality.value / 100;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = async () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      // Get compressed data URL
      const compressedDataUrl = canvas.toDataURL('image/jpeg', qualityValue);
      compressedImageUrl.value = compressedDataUrl;

      // Calculate compressed size
      const blob = await (await fetch(compressedDataUrl)).blob();
      compressedSize.value = blob.size;
      isProcessing.value = false;
    };

    img.onerror = () => {
        errorMessage.value = 'Error loading image for compression.';
        isProcessing.value = false;
    }

    img.src = originalImageUrl.value;

  } catch (error) {
    errorMessage.value = `Compression failed: ${error.message}`;
    console.error("Compression error:", error);
    isProcessing.value = false;
  }
};

const downloadImage = () => {
  if (!compressedImageUrl.value || !file.value) return;

  const link = document.createElement('a');
  link.href = compressedImageUrl.value;
  const originalName = file.value.name.replace(/\.(jpe?g)$/i, '');
  link.download = `${originalName}-compressed-q${quality.value}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const formatSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const clearFileInput = () => {
    if (fileInputRef.value) {
        fileInputRef.value.value = ''; // Clear the file input visually
    }
}

const clearState = () => {
  file.value = null;
  originalImageUrl.value = null;
  compressedImageUrl.value = null;
  originalSize.value = 0;
  compressedSize.value = 0;
  errorMessage.value = '';
  isProcessing.value = false;
  // Don't reset quality here, keep user's preference
};

const clearSelection = () => {
    clearState();
    clearFileInput();
}

// --- Watchers ---
watch(quality, () => {
  // Debounce or throttle this if performance is an issue on large images
  compressImage();
});

</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.compress-jpeg-tool {
  color: $text-primary;

  h1 {
    text-align: center;
    margin-bottom: 0.5rem;
    color: $primary-color;
  }

  p {
    text-align: center;
    margin-bottom: 2.5rem;
    color: $text-secondary;
  }
}

.tool-area {
  background-color: $bg-secondary;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px $shadow-soft;
  border: 1px solid $border-color;
}

// File Input Styling
.file-input-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border: 2px dashed $border-color;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: $bg-tertiary;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover {
    border-color: $primary-color;
    background-color: lighten($bg-tertiary, 3%);
  }

  input[type="file"] {
    display: none; // Hide default input
  }

  .file-label {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.7rem 1.5rem;
    background-color: $primary-color;
    color: $text-black;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s ease;
    flex-grow: 1; // Allow label to take space
    justify-content: center;
    text-align: center;

    .icon {
      font-size: 1.3em;
    }

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}

.btn-clear-file {
    background-color: $gray-600;
    color: $text-primary;
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
    &:hover { background-color: $gray-500; }
}

.error-message {
  color: $error;
  background-color: rgba($error, 0.1);
  border: 1px solid rgba($error, 0.3);
  padding: 0.8rem 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  text-align: center;
}

.content-area {
  margin-top: 2rem;
  border-top: 1px solid $border-color;
  padding-top: 2rem;
}

// Options
.options-section {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    display: block;
    margin-bottom: 0.75rem;
    font-weight: 500;
    color: $text-secondary;
  }

  .quality-slider {
    width: 100%;
    max-width: 400px;
    cursor: pointer;
    accent-color: $primary-color; // Style the slider track/thumb
  }
}

// Previews
.previews-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.image-preview {
  border: 1px solid $border-color;
  border-radius: 4px;
  padding: 1rem;
  background-color: $bg-tertiary;
  text-align: center;

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.75rem;
    color: $text-secondary;
  }

  img {
    max-width: 100%;
    height: auto;
    max-height: 300px; // Limit preview height
    object-fit: contain;
    margin-bottom: 0.75rem;
    background-color: $bg-primary; // Dark background for image visibility
    border-radius: 2px;
  }

  .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 150px; // Placeholder height
      color: $text-muted;
      background-color: $bg-primary;
      border-radius: 2px;
      margin-bottom: 0.75rem;
  }

  .image-info {
    font-size: 0.9rem;
    color: $text-muted;

    .reduction {
      color: $green-soft; // Use a success/green color
      font-weight: 500;
    }
    .increase {
        color: $orange; // Use a warning/orange color
        font-weight: 500;
    }
  }
}

// Actions
.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease, transform 0.1s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
}

.btn-download {
  background-color: $accent-secondary;
  color: $text-white;
  padding: 0.8rem 2rem; // Make download button prominent
  font-size: 1.1rem;

  &:hover:not(:disabled) {
    background-color: darken($accent-secondary, 10%);
  }
}

.processing-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: $text-muted;
    font-size: 0.9rem;

    .spin-icon {
        animation: spin 1.5s linear infinite;
    }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>