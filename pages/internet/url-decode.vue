<template>
  <div class="url-encoder-tool"> <!-- Removed container class, layout handles padding -->
    <h1>URL Encoder / Decoder</h1>
    <p>Paste your text below to encode or decode it for URLs.</p>

    <div class="tool-area">
      <div class="input-section">
        <label for="inputText">Input Text:</label>
        <textarea
          id="inputText"
          v-model="inputText"
          rows="6"
          placeholder="Enter text or URL component here..."
        ></textarea>
      </div>

      <div class="actions">
        <button @click="encodeUrl" class="btn btn-encode">
          <Icon name="uil:arrow-right" /> Encode
        </button>
        <button @click="decodeUrl" class="btn btn-decode">
          <Icon name="uil:arrow-left" /> Decode
        </button>
         <button @click="clearFields" class="btn btn-clear">
          <Icon name="uil:trash-alt" /> Clear
        </button>
      </div>

      <div class="output-section">
        <label for="outputText">Output:</label>
        <textarea
          id="outputText"
          v-model="outputText"
          rows="6"
          readonly
          placeholder="Result will appear here..."
        ></textarea>
        <button @click="copyResult" class="btn btn-copy" :disabled="!outputText">
          <Icon :name="copyIcon" /> {{ copyText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'; // Import onUnmounted
import { useSeoMeta } from '#imports'; // Auto-imported by Nuxt

definePageMeta({
  layout: 'tools', // Use the new tools layout
});

const inputText = ref('');
const outputText = ref('');
const copyText = ref('Copy');
const copyIcon = ref('uil:copy');

// SEO Meta
useSeoMeta({
  title: 'URL Encoder/Decoder Tool',
  description: 'Simple online tool to encode or decode text for URLs using encodeURIComponent and decodeURIComponent.',
});

// Encode function
const encodeUrl = () => {
  try {
    outputText.value = encodeURIComponent(inputText.value);
    resetCopyButton();
  } catch (e) {
    outputText.value = 'Error during encoding.';
    console.error("Encoding error:", e);
  }
};

// Decode function
const decodeUrl = () => {
  try {
    outputText.value = decodeURIComponent(inputText.value);
    resetCopyButton();
  } catch (e) {
    // Handle potential URIError for malformed input
    outputText.value = 'Error: Invalid input for decoding.';
    console.error("Decoding error:", e);
  }
};

// Copy result to clipboard
const copyResult = async () => {
  if (!outputText.value) return;
  try {
    await navigator.clipboard.writeText(outputText.value);
    copyText.value = 'Copied!';
    copyIcon.value = 'uil:check';
    setTimeout(resetCopyButton, 2000); // Reset after 2 seconds
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
  outputText.value = '';
  resetCopyButton();
};

// --- Save last visited tool ---
onUnmounted(() => {
  if (typeof localStorage !== 'undefined') {
    const lastTool = {
      name: 'URL Encoder/Decoder', // <-- Change this for each tool page
      path: '/tools/url-encoder'   // <-- Change this for each tool page
    };
    localStorage.setItem('lastUsedTool', JSON.stringify(lastTool));
  }
});
// --- End save ---

</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *; // Import variables

.url-encoder-tool {
  color: $text-primary; // Use text color from variables

  h1 {
    text-align: center;
    margin-bottom: 0.5rem;
    color: $primary-color; // Use primary color
  }

  p {
    text-align: center;
    margin-bottom: 2.5rem;
    color: $text-secondary;
  }
}

.tool-area {
  background-color: $bg-secondary; // Use secondary background
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px $shadow-soft; // Use shadow variable
  border: 1px solid $border-color; // Use border color
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: $text-secondary;
}

textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid $border-color;
  border-radius: 4px;
  background-color: $bg-tertiary; // Use tertiary background
  color: $text-primary;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical; // Allow vertical resize

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 2px rgba($primary-color, 0.3);
  }

  &::placeholder {
    color: $text-muted;
  }
}

.input-section, .output-section {
  margin-bottom: 1.5rem;
}

.output-section {
  position: relative; // For positioning the copy button

  textarea[readonly] {
    background-color: lighten($bg-tertiary, 3%); // Slightly lighter readonly bg
    cursor: default;
  }
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap; // Allow buttons to wrap on smaller screens
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
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .icon { // Target Icon component if needed
    font-size: 1.2em;
  }
}

.btn-encode {
  background-color: $green-soft; // Use green variable
  color: $text-black;
  &:hover { background-color: $green-dark; }
}

.btn-decode {
  background-color: $blue-bright; // Use blue variable
  color: $text-black;
  &:hover { background-color: darken($blue-bright, 10%); }
}

 .btn-clear {
  background-color: $gray-600; // Use gray variable
  color: $text-primary;
  &:hover { background-color: $gray-500; }
}

.btn-copy {
  position: absolute;
  top: 0.5rem; // Adjust as needed
  right: 0.5rem; // Adjust as needed
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  background-color: $gray-700; // Use gray variable
  color: $text-secondary;
  border: 1px solid $border-color;

  &:hover:not(:disabled) {
    background-color: $gray-600;
    color: $text-primary;
  }
}

</style>