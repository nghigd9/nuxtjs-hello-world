<template>
  <div class="json-minifier-tool">
    <h1>JSON Minifier</h1>
    <p>Paste your JSON data below to minify it (remove whitespace).</p>

    <div class="tool-area">
      <div class="input-section">
        <label for="inputText">Input JSON:</label>
        <ClientOnly>
          <Codemirror
            v-model="inputText"
            placeholder="Paste your formatted or raw JSON here..."
            :style="{ height: '250px' }"
            :autofocus="true"
            :extensions="extensions"
            @ready="handleReady"
            :class="{ 'cm-error-outline': !!errorMessage }"
          />
          <template #fallback>
            <textarea rows="10" placeholder="Loading editor..." readonly class="editor-fallback"></textarea>
          </template>
        </ClientOnly>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>

      <div class="actions">
        <button @click="minifyJson" class="btn btn-minify" :disabled="!inputText">
          <Icon name="uil:compress-lines" /> Minify
        </button>
        <button @click="clearFields" class="btn btn-clear" :disabled="!inputText && !outputText">
          <Icon name="uil:trash-alt" /> Clear
        </button>
      </div>

      <div class="output-section">
        <label for="outputText">Minified JSON:</label>
        <ClientOnly>
          <Codemirror
            v-model="outputText"
            placeholder="Minified JSON will appear here..."
            :style="{ height: '250px' }"
            :disabled="true"
            :extensions="extensions"
          />
          <template #fallback>
            <textarea rows="10" placeholder="Loading editor..." readonly class="editor-fallback"></textarea>
          </template>
        </ClientOnly>
        <button @click="copyResult" class="btn btn-copy" :disabled="!outputText || !!errorMessage">
          <Icon :name="copyIcon" /> {{ copyText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import { useSeoMeta } from '#imports';
import { Codemirror } from 'vue-codemirror';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter, lintGutter } from "@codemirror/lint";
import { oneDark } from '@codemirror/theme-one-dark';

definePageMeta({
  layout: 'tools', // Use the tools layout
});

const inputText = ref('');
const outputText = ref('');
const errorMessage = ref('');
const copyText = ref('Copy');
const copyIcon = ref('uil:copy');

// --- CodeMirror Configuration ---
const extensions = shallowRef([
  json(),
  oneDark,
  linter(jsonParseLinter()),
  lintGutter()
]);
const view = shallowRef();
const handleReady = (payload) => {
  view.value = payload.view;
};
// --- End CodeMirror Configuration ---

// SEO Meta
useSeoMeta({
  title: 'JSON Minifier Tool',
  description: 'Minify JSON data quickly and easily by removing unnecessary whitespace with this online tool.',
});

// Minify JSON
const minifyJson = () => {
  errorMessage.value = '';
  outputText.value = '';
  resetCopyButton();

  if (!inputText.value.trim()) {
    errorMessage.value = 'Input cannot be empty.';
    return;
  }

  try {
    const jsonObj = JSON.parse(inputText.value);
    // Stringify without spacing arguments to minify
    outputText.value = JSON.stringify(jsonObj);
    errorMessage.value = ''; // Clear error on success
  } catch (e) {
    errorMessage.value = `Invalid JSON: ${e.message}`;
    outputText.value = ''; // Clear output on error
  }
};

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
  outputText.value = '';
  errorMessage.value = '';
  resetCopyButton();
};

</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

// Apply common tool styles (copied and adapted from json-formatter)
.json-minifier-tool { // Renamed class
  color: $text-primary;

  h1 {
    text-align: center;
    margin-bottom: 0.5rem;
    color: $primary-color; // Use primary color for title
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

.editor-fallback {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid $border-color;
  border-radius: 4px;
  background-color: $bg-tertiary;
  color: $text-muted;
  font-family: monospace;
  font-size: 0.95rem;
  resize: vertical;
  min-height: 150px;
}

.input-section, .output-section {
  margin-bottom: 1.5rem;
  position: relative;

  :deep(.cm-editor) {
    border: 1px solid $border-color;
    border-radius: 4px;
    outline: none;
  }

  :deep(.cm-error-outline .cm-editor) {
     border-color: $error;
     box-shadow: 0 0 0 2px rgba($error, 0.3);
  }

  :deep(.cm-editor.cm-focused) {
    border-color: $primary-color;
    box-shadow: 0 0 0 2px rgba($primary-color, 0.3);
  }
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

// Specific button styles
.btn-minify {
  background-color: $orange-accent; // Use orange for minify action
  color: $text-black; // Use black text for contrast on orange
  &:hover:not(:disabled) { background-color: darken($orange-accent, 10%); }
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
  z-index: 10;

  &:hover:not(:disabled) {
    background-color: $gray-600;
    color: $text-primary;
  }
}

</style>