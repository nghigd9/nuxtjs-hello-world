<template>
  <div class="text-to-slug-tool">
    <h1>Text to Slug Converter</h1>
    <p>Convert any text into a URL-friendly slug with your preferred separator.</p>

    <div class="tool-area">
      <div class="input-section">
        <label for="inputText">Input Text:</label>
        <textarea
          id="inputText"
          v-model="inputText"
          rows="5"
          placeholder="Enter text to convert..."
        ></textarea>
      </div>

      <div class="options-section">
        <label>Separator:</label>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="separator" value="-" name="separator">
            Dash (-)
          </label>
          <label>
            <input type="radio" v-model="separator" value="_" name="separator">
            Underscore (_)
          </label>
        </div>
      </div>

      <div class="output-section">
        <label for="outputText">Generated Slug:</label>
        <input
          type="text"
          id="outputText"
          :value="generatedSlug"
          readonly
          placeholder="Slug will appear here..."
        />
        <button @click="copyResult" class="btn btn-copy" :disabled="!generatedSlug">
          <Icon :name="copyIcon" /> {{ copyText }}
        </button>
      </div>

       <div class="actions">
         <button @click="clearFields" class="btn btn-clear" :disabled="!inputText && !generatedSlug">
          <Icon name="uil:trash-alt" /> Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useSeoMeta } from '#imports';

definePageMeta({
  layout: 'tools', // Use the tools layout
});

const inputText = ref('');
const separator = ref('-'); // Default separator
const copyText = ref('Copy');
const copyIcon = ref('uil:copy');

// SEO Meta
useSeoMeta({
  title: 'Text to Slug Converter Tool',
  description: 'Generate URL-friendly slugs from text with custom separators (- or _).',
});

// Computed property to generate the slug
const generatedSlug = computed(() => {
  if (!inputText.value) {
    return '';
  }

  const text = inputText.value;
  const sep = separator.value;

  return text
    .toString()                     // Ensure input is a string
    .normalize('NFD')               // Split accented characters into base characters and diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()                  // Convert to lowercase
    .trim()                         // Trim leading/trailing whitespace
    .replace(/[^a-z0-9\s_-]/g, '')  // Remove invalid characters (allow letters, numbers, space, underscore, dash)
    .replace(/[\s_-]+/g, sep)       // Replace spaces, underscores, dashes with the chosen separator
    .replace(new RegExp(`^\\${sep}+|\\${sep}+$`, 'g'), ''); // Trim leading/trailing separators
});

// Copy result to clipboard
const copyResult = async () => {
  if (!generatedSlug.value) return;
  try {
    await navigator.clipboard.writeText(generatedSlug.value);
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
  // generatedSlug will update automatically via computed property
  resetCopyButton();
};

// Watch input text to reset copy button if user modifies input after copying
watch(inputText, () => {
    resetCopyButton();
});

</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

// Inherit common styles from other tools if possible, or redefine here
.text-to-slug-tool {
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

label { // General label styling
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
  min-height: 80px;
}

input[readonly] {
  background-color: lighten($bg-tertiary, 3%);
  cursor: default;
  font-family: monospace; // Good for slugs
}

.input-section, .options-section, .output-section {
  margin-bottom: 1.5rem;
}

.options-section {
  label:first-child { // Style the main "Separator:" label
     margin-bottom: 0.75rem;
  }
}

.radio-group {
  display: flex;
  gap: 1.5rem; // Space between radio options
  align-items: center;

  label { // Style individual radio labels
    display: inline-flex; // Align input and text
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0; // Reset margin for inline labels
    font-weight: 400; // Normal weight for options
    cursor: pointer;
    color: $text-secondary;
  }

  input[type="radio"] {
    width: auto; // Override default width
    accent-color: $primary-color; // Color the radio button itself
    cursor: pointer;
  }
}

.output-section {
  position: relative; // For copy button positioning
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: -0.5rem;
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