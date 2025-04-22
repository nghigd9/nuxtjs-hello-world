export const useSearch = () => {
  const isSearchOpen = useState('isSearchOpen', () => false);
  const searchQuery = useState('searchQuery', () => '');
  const searchResults = useState('searchResults', () => []);
  const isSearching = useState('isSearching', () => false);

  const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value;

    if (isSearchOpen.value) {
      // When search modal is open, prevent body scrolling
      document.body.style.overflow = 'hidden';
      // Focus the search input after modal is open
      setTimeout(() => {
        document.querySelector('.search-modal-input')?.focus();
      }, 100);
    } else {
      // Restore body scrolling
      document.body.style.overflow = '';
    }
  };

  const closeSearch = () => {
    isSearchOpen.value = false;
    searchQuery.value = '';
    searchResults.value = [];
    isSearching.value = false;
    // Restore body scrolling
    document.body.style.overflow = '';
  };

  const performSearch = () => {
    if (!searchQuery.value.trim()) return;

    // This is where you would integrate with your actual search system
    // For example, you might make an API call to your backend

    // Mock data for demonstration
    searchResults.value = [
      {
        title: 'Getting Started Guide',
        excerpt: 'Learn how to get started with our platform...',
        url: '/guides/getting-started'
      },
      {
        title: 'API Documentation',
        excerpt: 'Explore our API endpoints and functionality...',
        url: '/docs/api'
      },
      {
        title: 'Frequently Asked Questions',
        excerpt: 'Find answers to common questions...',
        url: '/faq'
      },
    ].filter(item =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  };

  const debouncedSearch = () => {
    isSearching.value = true;
    setTimeout(() => {
      performSearch();
      isSearching.value = false;
    }, 300);
  };

  return {
    isSearchOpen,
    searchQuery,
    searchResults,
    isSearching,
    toggleSearch,
    closeSearch,
    performSearch,
    debouncedSearch
  };
};