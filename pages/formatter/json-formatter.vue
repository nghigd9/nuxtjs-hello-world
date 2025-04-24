<template>
  <div class="json-formatter-tool">
    <h1>JSON Formatter & Validator</h1>
    <p>Paste your JSON data below to format and validate it.</p>

    <div class="tool-area">
      <div class="input-section">
        <label for="inputText">Input JSON:</label>
        <ClientOnly> <!-- Ensure Codemirror runs only on client -->
          <Codemirror
            v-model="inputText"
            placeholder="Paste your raw JSON here..."
            :style="{ height: '250px' }"
            :autofocus="true"
            :indent-with-tab="useTabs"  
            :tab-size="indentSize"      
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
        <button @click="formatJson" class="btn btn-format" :disabled="!inputText">
          <Icon name="uil:align-left" /> 
        </button>
         <button @click="clearFields" class="btn btn-clear" :disabled="!inputText && !outputText">
          <Icon name="uil:trash-alt" /> 
        </button>
      </div>

      <div class="output-section">
        <label for="outputText">Formatted JSON:</label>
        <ClientOnly> <!-- Ensure Codemirror runs only on client -->
          <Codemirror
            v-model="outputText"
            placeholder="Formatted JSON will appear here..."
            :style="{ height: '250px' }"
            :disabled="true"
            :indent-with-tab="useTabs" 
            :tab-size="indentSize"     
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
import { ref, shallowRef } from 'vue'; // Import shallowRef for extensions
import { useSeoMeta } from '#imports';
import { Codemirror } from 'vue-codemirror'; // Import Codemirror
import { json, jsonParseLinter } from '@codemirror/lang-json'; // Import JSON language support and linter
import { linter, lintGutter } from "@codemirror/lint"; // Import linter and gutter
import { oneDark } from '@codemirror/theme-one-dark'; // Import a dark theme

definePageMeta({
  layout: 'tools', // Use the tools layout
});

const inputText = ref('');
const outputText = ref('');
const errorMessage = ref('');
const copyText = ref('Copy');
const copyIcon = ref('uil:copy');

// --- Indentation Configuration ---
const indentSize = ref(2); // Control indentation size (e.g., 2 or 4)
const useTabs = ref(false); // Control whether to use tabs (true) or spaces (false)
// --- End Indentation Configuration ---

// --- CodeMirror Configuration ---
// Update extensions to include linter
const extensions = shallowRef([
  json(),
  oneDark,
  linter(jsonParseLinter()), // Add the JSON linter
  lintGutter() // Show lint errors in the gutter
]);
const view = shallowRef(); // To access CodeMirror view instance if needed
const handleReady = (payload) => {
  view.value = payload.view;
  // You can access the CodeMirror view instance here, e.g., view.value.focus()
};
// --- End CodeMirror Configuration ---


// SEO Meta
useSeoMeta({
  title: 'JSON Formatter & Validator Tool',
  description: 'Format, beautify, and validate JSON data quickly and easily with this online tool.',
});

// Format and Validate JSON
const formatJson = () => {
  errorMessage.value = '';
  outputText.value = '';
  resetCopyButton();

  if (!inputText.value.trim()) {
    errorMessage.value = 'Input cannot be empty.';
    return;
  }

  try {
    const jsonObj = JSON.parse(inputText.value);
    // Use configured indentation for output formatting
    const indentArg = useTabs.value ? '\t' : indentSize.value;
    outputText.value = JSON.stringify(jsonObj, null, indentArg); // Use configured indentation
    errorMessage.value = ''; // Clear error on success
  } catch (e) {
    errorMessage.value = `Invalid JSON: ${e.message}`;
    // Attempt to show error location if possible (basic example)
    const match = e.message.match(/position (\d+)/);
    if (match && view.value) {
        const pos = parseInt(match[1], 10);
        // Highlight the error position - requires more setup with diagnostics if needed
    }
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

// Apply common tool styles
.json-formatter-tool {
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

// Style the fallback textarea
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
  min-height: 150px; // Match Codemirror height roughly
}

.input-section, .output-section {
  margin-bottom: 1.5rem;
  position: relative; // Needed for error message/copy button positioning

  // Style wrapper for CodeMirror editor to apply border/outline
  :deep(.cm-editor) {
    border: 1px solid $border-color;
    border-radius: 4px;
    outline: none; // Remove default outline
  }

  // Style for error outline on the input editor
  :deep(.cm-error-outline .cm-editor) {
     border-color: $error;
     box-shadow: 0 0 0 2px rgba($error, 0.3);
  }

   // Ensure focus outline matches theme
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

.btn-format {
  background-color: $blue-deep; // Changed color for variety
  color: $text-white;
  &:hover:not(:disabled) { background-color: darken($blue-deep, 10%); }
}

.btn-clear {
  background-color: $gray-600;
  color: $text-primary;
  &:hover:not(:disabled) { background-color: $gray-500; }
}

.btn-copy {
  position: absolute;
  top: 0.5rem; // May need slight adjustment based on editor padding
  right: 0.5rem; // May need slight adjustment
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  background-color: $gray-700;
  color: $text-secondary;
  border: 1px solid $border-color;
  z-index: 10; // Ensure it's above the editor

  &:hover:not(:disabled) {
    background-color: $gray-600;
    color: $text-primary;
  }
}

</style>