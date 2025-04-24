<template>
  <div class="base64-tool">
    <h1>Base64 Encoder / Decoder</h1>
    <p>Encode text to Base64 or decode Base64 strings back to text.</p>

    <div class="tool-area">
      <div class="input-section">
        <label for="inputText">Input Text / Base64:</label>
        <textarea
          id="inputText"
          v-model="inputText"
          rows="8"
          placeholder="Enter text to encode or Base64 to decode..."
          :class="{ 'error-border': !!errorMessage }"
        ></textarea>
         <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>

      <div class="actions">
        <button @click="encodeBase64" class="btn btn-encode" :disabled="!inputText">
          <Icon name="uil:arrow-right" /> Encode to Base64
        </button>
        <button @click="decodeBase64" class="btn btn-decode" :disabled="!inputText">
          <Icon name="uil:arrow-left" /> Decode from Base64
        </button>
         <button @click="clearFields" class="btn btn-clear" :disabled="!inputText && !outputText">
          <Icon name="uil:trash-alt" /> Clear
        </button>
      </div>

      <div class="output-section">
        <label for="outputText">Output:</label>
        <textarea
          id="outputText"
          v-model="outputText"
          rows="8"
          readonly
          placeholder="Result will appear here..."
        ></textarea>
        <button @click="copyResult" class="btn btn-copy" :disabled="!outputText || !!errorMessage">
          <Icon :name="copyIcon" /> {{ copyText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSeoMeta } from '#imports';

definePageMeta({
  layout: 'tools', // Use the tools layout
});

const inputText = ref('');
const outputText = ref('');
const errorMessage = ref('');
const copyText = ref('Copy');
const copyIcon = ref('uil:copy');

// SEO Meta
useSeoMeta({
  title: 'Base64 Encoder/Decoder Tool',
  description: 'Encode text strings to Base64 or decode Base64 strings back to plain text using this online tool.',
});

// Encode to Base64
const encodeBase64 = () => {
  clearErrorAndOutput();
  if (!inputText.value) return;
  try {
    // Handle potential Unicode issues
    const bytes = new TextEncoder().encode(inputText.value);
    const binaryString = String.fromCharCode(...bytes);
    outputText.value = btoa(binaryString);
  } catch (e) {
    errorMessage.value = `Error during encoding: ${e.message}`;
    console.error("Encoding error:", e);
  }
};

// Decode from Base64
const decodeBase64 = () => {
  clearErrorAndOutput();
  if (!inputText.value) return;
  try {
    // Basic check for valid Base64 characters (optional but helpful)
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(inputText.value.replace(/\s/g, ''))) {
       throw new Error('Input contains invalid Base64 characters.');
    }
    const binaryString = atob(inputText.value);
    const bytes = Uint8Array.from(binaryString, (m) => m.charCodeAt(0));
    outputText.value = new TextDecoder().decode(bytes);
  } catch (e) {
    errorMessage.value = `Error during decoding: ${e.message}. Make sure the input is valid Base64.`;
    console.error("Decoding error:", e);
  }
};

// Helper to clear errors and output
const clearErrorAndOutput = () => {
    errorMessage.value = '';
    outputText.value = '';
    resetCopyButton();
}

// Copy result to clipboard
const copyResult = async () => {
  if (!outputText.value || errorMessage.value) return;
  try {
    await navigator.clipboard.writeText(outputText.value);
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
  clearErrorAndOutput();
};

</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

// Apply common tool styles
.base64-tool {
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

textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid $border-color;
  border-radius: 4px;
  background-color: $bg-tertiary;
  color: $text-primary;
  font-family: inherit; // Use default for text, monospace might be okay too
  font-size: 1rem;
  resize: vertical;
  min-height: 120px; // Slightly more height

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 2px rgba($primary-color, 0.3);
  }

  &::placeholder {
    color: $text-muted;
  }

  &.error-border {
     border-color: $error;
     box-shadow: 0 0 0 2px rgba($error, 0.3);
  }
}

textarea[readonly] {
  background-color: lighten($bg-tertiary, 3%);
  cursor: default;
}

.input-section, .output-section {
  margin-bottom: 1.5rem;
  position: relative;
}

.error-message {
  color: $error;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
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

// Specific button colors (adjust as desired)
.btn-encode {
  background-color: $green-soft;
  color: $text-black;
  &:hover:not(:disabled) { background-color: $green-dark; }
}

.btn-decode {
  background-color: $blue-bright;
  color: $text-black;
  &:hover:not(:disabled) { background-color: darken($blue-bright, 10%); }
}

.btn-clear {
  background-color: $gray-600;
  color: $text-primary;
  &:hover:not(:disabled) { background-color: $gray-500; }
}

.btn-copy {
  position: absolute;
  top: 0.5rem;
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