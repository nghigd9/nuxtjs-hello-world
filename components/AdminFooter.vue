<template>
  <footer class="admin-footer">
    <div class="footer-content">
      <span>&copy; {{ currentYear }} Your Company Name. All rights reserved.</span>
      <div class="footer-links">
        <NuxtLink to="/admin/support">Support</NuxtLink>
        <NuxtLink to="/admin/docs">Docs</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.admin-footer {
  padding: 1rem 1.5rem;
  background-color: $bg-secondary;
  border-top: 1px solid $border-color;
  color: $text-secondary;
  font-size: 0.85rem;
  margin-top: auto; // Ensure footer sticks to bottom if content is short

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-links {
    display: flex;
    gap: 1rem;

    a {
      color: $text-secondary;
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: $primary-color;
        text-decoration: underline;
      }
    }
  }
}
</style>