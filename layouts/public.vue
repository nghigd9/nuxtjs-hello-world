<template>
  <div>
    <Header />
    <div class="body">
      <slot /> <!-- Page content will be injected here -->
    </div>
    <Footer />
    <!-- Global components like modals are often kept in app.vue -->
  </div>
</template>

<script setup>
// Import your standard Header and Footer components
import Header from '~/components/Header.vue'; // Adjust path if necessary
import Footer from '~/components/Footer.vue'; // Adjust path if necessary
</script>

<style lang="scss">
// You might import your global styles here if they aren't already loaded globally
// @use '@/assets/scss/global.scss';

body {
  // Reset body margin/padding if needed for this layout
  margin: 0;
  padding: 0;
  background-color: $bg-primary; // Or your default public background
}

.body {
  min-height: 60vh; // Ensure footer is pushed down
  // Add other common body styles for public pages if needed
}
</style>