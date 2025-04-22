<template>
  <div class="search-modal" :class="{ 'is-open': isSearchOpen }" @click="handleOutsideClick">
    <div class="search-modal-content">
      <div class="search-header">
        <h2><Icon name="uil:search" class="search-title-icon" /> Search</h2>
        <button class="close-button" @click="closeSearch" aria-label="Close search">
          <Icon name="uil:times" />
        </button>
      </div>
      <div class="search-form">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Type to search..." 
          @input="debouncedSearch"
          @keyup.enter="performSearch"
          class="search-modal-input"
        />
        <button class="search-submit" @click="performSearch">Search</button>
      </div>
      <div class="search-results" v-if="isSearching">
        <p class="searching-message">Searching...</p>
      </div>
      <div class="search-results" v-else-if="searchQuery.trim() && searchResults.length > 0">
        <h3>Results</h3>
        <ul>
          <li v-for="(result, index) in searchResults" :key="index">
            <NuxtLink :to="result.url" @click="closeSearch">{{ result.title }}</NuxtLink>
            <p>{{ result.excerpt }}</p>
          </li>
        </ul>
      </div>
      <div class="search-results" v-else-if="searchQuery.trim() && !isSearching">
        <p class="no-results">No results found for "{{ searchQuery }}"</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { 
  isSearchOpen,
  searchQuery,
  searchResults,
  isSearching,
  closeSearch,
  performSearch,
  debouncedSearch
} = useSearch();

const handleOutsideClick = (event) => {
  const modalContent = document.querySelector('.search-modal-content');
  if (modalContent && !modalContent.contains(event.target)) {
    closeSearch();
  }
};

// Close search modal on escape key
onMounted(() => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isSearchOpen.value) {
      closeSearch();
    }
  });
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use 'sass:color';

// Search Modal Styles
.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($bg-primary, 0.95);
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 5rem;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  overflow-y: auto;
  
  &.is-open {
    opacity: 1;
    visibility: visible;
  }
}

.search-modal-content {
  width: 90%;
  max-width: 800px;
  background-color: $bg-secondary;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid $border-color;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h2 {
    margin: 0;
    color: $text-white;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .search-title-icon {
    vertical-align: middle;
    margin-right: 0.5rem;
  }
  
  .close-button {
    background: transparent;
    border: none;
    color: $text-secondary;
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;
    padding: 0;
    
    &:hover {
      color: $primary-color;
    }
  }
}

.search-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  
  input {
    flex: 1;
    background-color: $bg-tertiary;
    border: 1px solid $border-color;
    border-radius: 4px;
    padding: 0.75rem 1rem;
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
  
  .search-submit {
    background-color: $primary-color;
    color: $text-white;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: color.adjust($primary-color, $lightness: -10%);
    }
  }
}

.search-results {
  h3 {
    color: $text-white;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    padding: 1rem 0;
    border-bottom: 1px solid $border-color;
    
    &:last-child {
      border-bottom: none;
    }
    
    a {
      color: $primary-color;
      text-decoration: none;
      font-weight: bold;
      font-size: 1.1rem;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    p {
      color: $text-secondary;
      margin: 0.5rem 0 0;
      font-size: 0.9rem;
    }
  }
  
  .searching-message {
    color: $text-secondary;
    font-size: 1rem;
    text-align: center;
  }
  
  .no-results {
    color: $text-secondary;
    font-size: 1rem;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .search-modal {
    padding-top: 2rem;
  }
  
  .search-modal-content {
    width: 85%;
    padding: 1.5rem;
    min-height: 350px;
  }
  
  .search-form {
    flex-direction: column;
    
    .search-submit {
      align-self: flex-end;
    }
  }
}
</style>