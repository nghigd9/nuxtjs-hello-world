<template>
  <div class="tools-index-page">
    <h1>Developer Tools</h1>
    <p>A collection of useful online tools for developers.</p>

    <!-- Display Last Used Tool -->
    <div v-if="lastUsedTool" class="last-used-tool">
      <NuxtLink :to="lastUsedTool.path" class="last-used-link">
        <Icon name="uil:history" />
        <span>Continue with: <strong>{{ lastUsedTool.name }}</strong></span>
      </NuxtLink>
    </div>
    <!-- End Display Last Used Tool -->

    <div class="search-bar-wrapper">
      <Icon name="uil:search" class="search-icon" />
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search tools by name..."
        class="search-input"
      />
    </div>

    <div v-if="filteredTools.length" class="tools-grid">
      <NuxtLink v-for="tool in filteredTools" :key="tool.path" :to="tool.path" class="tool-card">
        <div class="tool-icon-wrapper">
          <Icon v-if="tool.icon" :name="tool.icon" class="tool-icon" />
        </div>
        <h3 class="tool-name">{{ tool.name }}</h3>
        <p v-if="tool.description" class="tool-description">{{ tool.description }}</p>
      </NuxtLink>
    </div>
    <div v-else class="no-results">
      No tools found matching your search.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useSeoMeta } from '#imports';

definePageMeta({
  layout: 'tools', // Use the tools layout
});

// SEO Meta
useSeoMeta({
  title: 'Developer Tools Index',
  description: 'Browse a collection of useful online developer tools like URL Encoder, MD5 Calculator, JSON Formatter, and more.',
});

const searchQuery = ref('');
const lastUsedTool = ref(null); // Ref to store the last used tool data

// Define your tools here (same as in ToolsSidebar.vue)
// Consider extracting this list to a shared composable or file later
// to avoid duplication.
const allTools = ref([
]);

// Filter tools based on search query
const filteredTools = computed(() => {
  if (!searchQuery.value) {
    return allTools.value;
  }
  const lowerCaseQuery = searchQuery.value.toLowerCase();
  return allTools.value.filter(tool =>
    tool.name.toLowerCase().includes(lowerCaseQuery) ||
    (tool.description && tool.description.toLowerCase().includes(lowerCaseQuery))
  );
});

// --- Read last used tool on mount ---
onMounted(() => {
  if (typeof localStorage !== 'undefined') {
    const savedTool = localStorage.getItem('lastUsedTool');
    if (savedTool) {
      try {
        lastUsedTool.value = JSON.parse(savedTool);
      } catch (e) {
        console.error("Error parsing last used tool from localStorage:", e);
        localStorage.removeItem('lastUsedTool'); // Clear invalid data
      }
    }
  }
});
// --- End read ---

useSeoMeta({
  title: 'Developer Tools Collection',
  description: 'Browse a collection of useful online developer tools like URL Encoder, MD5 Calculator, JSON Formatter, and more.',
});

</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.tools-index-page {
  color: $text-primary;

  h1 {
    text-align: center;
    margin-bottom: 0.5rem;
    color: $primary-color;
    font-size: 2rem;
  }

  p {
    text-align: center;
    margin-bottom: 1rem; // Reduced margin
    color: $text-secondary;
    font-size: 1.1rem;
  }
}

// Styles for Last Used Tool section
.last-used-tool {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem; // Space below this section
}

.last-used-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.2rem;
  background-color: $bg-tertiary;
  border: 1px solid $border-color;
  border-radius: 2rem; // Rounded pill shape
  color: $text-secondary;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: lighten($bg-tertiary, 5%);
    color: $text-primary;
    border-color: $primary-color;
  }

  .icon { // Target Icon component
    font-size: 1.2em;
  }

  strong {
    color: $primary-color;
    font-weight: 500;
  }
}

.search-bar-wrapper {
  position: relative;
  max-width: 500px;
  margin: 0 auto 3rem auto; // Center the search bar

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: $text-muted;
    font-size: 1.2rem;
    pointer-events: none; // Allow clicking through the icon
  }

  .search-input {
    width: 100%;
    padding: 0.8rem 1rem 0.8rem 3rem; // Add padding for the icon
    background-color: $bg-secondary;
    border: 1px solid $border-color;
    border-radius: 2rem; // Rounded corners for search bar
    color: $text-primary;
    font-size: 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba($primary-color, 0.3);
    }

    &::placeholder {
      color: $text-muted;
    }
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); // Responsive grid
  gap: 1.5rem;
}

.tool-card {
  display: block; // Make the link a block element
  background-color: $bg-secondary;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid $border-color;
  text-decoration: none;
  color: $text-primary;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px $shadow-soft;
    border-color: $primary-color;
  }
}

.tool-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  background-color: $bg-tertiary;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.tool-icon {
  font-size: 2rem;
  color: $primary-color;
}

.tool-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $text-primary;
}

.tool-description {
  font-size: 0.9rem;
  color: $text-secondary;
  line-height: 1.4;
}

.no-results {
  text-align: center;
  margin-top: 3rem;
  color: $text-muted;
  font-size: 1.1rem;
}

</style>