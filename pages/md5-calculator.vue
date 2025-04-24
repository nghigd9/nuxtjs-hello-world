<template>
  <div class="md5-calculator-tool">
    <h1>MD5 Hash Calculator</h1>
    <p>Enter text below to calculate its MD5 hash.</p>

    <div class="tool-area">
      <div class="input-section">
        <label for="inputText">Input Text:</label>
        <textarea
          id="inputText"
          v-model="inputText"
          rows="5"
          placeholder="Enter text here..."
          @input="calculateMd5"
        ></textarea>
        <div class="char-count">Characters: {{ inputText.length }}</div>
      </div>

      <div class="output-section">
        <label for="outputText">MD5 Hash:</label>
        <input
          type="text"
          id="outputText"
          :value="md5Hash"
          readonly
          placeholder="MD5 hash will appear here..."
        />
        <button @click="copyResult" class="btn btn-copy" :disabled="!md5Hash">
          <Icon :name="copyIcon" /> {{ copyText }}
        </button>
      </div>

       <div class="actions">
         <button @click="clearFields" class="btn btn-clear" :disabled="!inputText && !md5Hash">
          <Icon name="uil:trash-alt" /> Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useSeoMeta } from '#imports';
import SparkMD5 from 'spark-md5'; // Using a reliable library

definePageMeta({
  layout: 'tools', // Use the tools layout
});

const inputText = ref('');
const md5Hash = ref('');
const copyText = ref('Copy');
const copyIcon = ref('uil:copy');

// SEO Meta
useSeoMeta({
  title: 'MD5 Hash Calculator Tool',
  description: 'Calculate the MD5 hash of any text string quickly and easily using this online tool.',
});

// Calculate MD5 hash function
const calculateMd5 = () => {
  if (inputText.value === '') {
    md5Hash.value = '';
  } else {
    md5Hash.value = SparkMD5.hash(inputText.value);
  }
   resetCopyButton(); // Reset copy button when input changes
};

// Watch for changes in inputText to auto-calculate
watch(inputText, calculateMd5);

// Copy result to clipboard
const copyResult = async () => {
  if (!md5Hash.value) return;
  try {
    await navigator.clipboard.writeText(md5Hash.value);
    copyText.value = 'Copied!';
    copyIcon.value = 'uil:check';
    setTimeout(resetCopyButton, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
    copyText.value = 'Error';
    copyIcon.value = 'uil:times-circle';
    setTimeout(resetCopyButton, 2000);
  }
};

// Reset copy button state
const resetCopyButton = () => {
  copyText.value = 'Copy';
  copyIcon.value = 'uil:copy';
};

// Clear fields
const clearFields = () => {
  inputText.value = '';
  // md5Hash will be cleared by the watcher
  resetCopyButton();
};

// Initial calculation in case there's pre-filled data (less common in SPA)
calculateMd5();

</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.md5-calculator-tool {
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

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: $text-secondary;
}

textarea, input[type="text"] {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid $border-color;
  border-radius: 4px;
  background-color: $bg-tertiary;
  color: $text-primary;
  font-family: inherit;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 2px rgba($primary-color, 0.3);
  }

  &::placeholder {
    color: $text-muted;
  }
}

textarea {
  resize: vertical;
  min-height: 80px; // Ensure a minimum height
}

input[readonly] {
  background-color: lighten($bg-tertiary, 3%);
  cursor: default;
  font-family: monospace; // Use monospace for hash
}

.input-section, .output-section {
  margin-bottom: 1.5rem;
}

.input-section {
  position: relative; // For char count positioning
}

.char-count {
  position: absolute;
  bottom: 10px; // Adjust as needed
  right: 10px; // Adjust as needed
  font-size: 0.8rem;
  color: $text-muted;
}


.output-section {
  position: relative; // For copy button positioning
}

.actions {
  display: flex;
  justify-content: flex-end; // Align clear button to the right
  margin-top: -0.5rem; // Adjust spacing if needed
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

.btn-clear {
  background-color: $gray-600;
  color: $text-primary;
  &:hover:not(:disabled) { background-color: $gray-500; }
}

.btn-copy {
  position: absolute;
  top: calc(50% - 1px); // Vertically center relative to the input height
  transform: translateY(-50%);
  right: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  background-color: $gray-700;
  color: $text-secondary;
  border: 1px solid $border-color;

  &:hover:not(:disabled) {
    background-color: $gray-600;
    color: $text-primary;
  }
}

</style>