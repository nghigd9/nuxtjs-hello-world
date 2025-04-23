<template>
  <div class="admin-layout">
    <AdminSidebar :is-collapsed="isSidebarCollapsed" />
    <div class="admin-main-content">
      <AdminHeader @toggle-sidebar="toggleSidebar" />
      <main class="admin-page-content">
        <slot /> <!-- Page content will be injected here -->
      </main>
      <AdminFooter />
    </div>
  </div>
</template>

<script setup>
import AdminHeader from '~/components/AdminHeader.vue';
import AdminSidebar from '~/components/AdminSidebar.vue';
import AdminFooter from '~/components/AdminFooter.vue';

const isSidebarCollapsed = ref(false);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

// Optional: Close sidebar on smaller screens when navigating
// const route = useRoute();
// watch(route, () => {
//   if (window.innerWidth < 768) { // Example breakpoint
//     isSidebarCollapsed.value = true;
//   }
// });
</script>

<style lang="scss">
@use '@/assets/scss/variables' as *; // Import your SCSS variables
@use '@/assets/scss/admin.scss'; // Import common admin layout styles

// Add any layout-specific overrides or styles here if needed
body {
  // Ensure body has no margin/padding when using admin layout
  margin: 0;
  padding: 0;
  background-color: $bg-primary; // Match admin background
}
</style>