<template>
  <!-- header -->
   <Header />
  <div class="tools-layout">
    <ToolsSidebar />
    <main class="tools-content">
      <slot /> <!-- Tool page content will be rendered here -->
    </main>
  </div>
  <Footer />
</template>

<script setup>
// Import the sidebar component
import ToolsSidebar from '~/components/ToolsSidebar.vue';
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.tools-layout {
  display: flex;
  min-height: calc(100vh - 60px); // Adjust 60px based on your header height if needed
  background-color: $bg-primary;
  color: $text-primary;
}

.tools-content {
  flex-grow: 1; // Takes remaining space
  padding: 2rem; // Add padding around the tool content area
  overflow-y: auto; // Allow content scrolling if needed
}

// Responsive adjustments (optional)
@media (max-width: 768px) {
  .tools-layout {
    flex-direction: column;
  }
  .tools-content {
     padding: 1rem; // Reduce padding on smaller screens
  }
  // Sidebar might need specific mobile styling (e.g., toggle button)
}
</style>