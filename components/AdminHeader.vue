<template>
  <header class="admin-header">
    <div class="header-left">
      <button class="sidebar-toggle" @click="toggleSidebar">
        <Icon name="uil:bars" />
      </button>
      <div class="logo">
        <NuxtLink to="/admin">
          <Icon name="uil:shield-check" />
          <span>Admin Panel</span>
        </NuxtLink>
      </div>
    </div>
    <div class="header-center">
      <div class="search-bar">
        <Icon name="uil:search" />
        <input type="text" placeholder="Search..." />
      </div>
    </div>
    <div class="header-right">
      <button class="header-icon-btn">
        <Icon name="uil:bell" />
        <span class="badge">3</span>
      </button>
      <button class="header-icon-btn">
        <Icon name="uil:envelope-alt" />
      </button>
      <div class="user-menu">
        <!-- <img src="/images/avatar-placeholder.png" alt="User Avatar" class="avatar" /> -->
        <span class="user-name">Admin User</span>
        <Icon name="uil:angle-down" />
        <!-- Dropdown would go here -->
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
// In a real app, you'd likely use a store (like Pinia) or provide/inject
// to manage the sidebar state globally.
const emit = defineEmits(['toggle-sidebar']);

const toggleSidebar = () => {
  emit('toggle-sidebar');
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;


.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 60px;
  background-color: $bg-secondary;
  border-bottom: 1px solid $border-color;
  color: $text-primary;
  position: sticky;
  top: 0;
  z-index: 1000; // Ensure header stays on top

  .header-left, .header-center, .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .header-left {
    .sidebar-toggle {
      background: none;
      border: none;
      color: $text-secondary;
      font-size: 1.4rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.2s ease, color 0.2s ease;

      &:hover {
        background-color: $bg-tertiary;
        color: $text-primary;
      }
    }

    .logo {
      a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: $text-primary;
        text-decoration: none;
        font-weight: 600;
        font-size: 1.1rem;

        .icon {
          font-size: 1.5rem;
          color: $primary-color;
        }
      }
    }
  }

  .header-center {
    flex-grow: 1;
    justify-content: center;

    .search-bar {
      position: relative;
      width: 100%;
      max-width: 400px;

      .icon {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: $text-muted;
        font-size: 1.1rem;
      }

      input {
        width: 100%;
        padding: 0.6rem 1rem 0.6rem 2.5rem;
        background-color: $bg-tertiary;
        border: 1px solid $border-color;
        border-radius: 20px;
        color: $text-primary;
        font-size: 0.9rem;
        transition: border-color 0.2s ease, background-color 0.2s ease;

        &:focus {
          outline: none;
          border-color: $primary-color;
          background-color: $bg-secondary;
        }

        &::placeholder {
          color: $text-muted;
        }
      }
    }
  }

  .header-right {
    .header-icon-btn {
      background: none;
      border: none;
      color: $text-secondary;
      font-size: 1.3rem;
      cursor: pointer;
      position: relative;
      padding: 0.5rem;
      border-radius: 50%;
      transition: background-color 0.2s ease, color 0.2s ease;

      &:hover {
        background-color: $bg-tertiary;
        color: $text-primary;
      }

      .badge {
        position: absolute;
        top: 0;
        right: 0;
        background-color: $error;
        color: $text-white;
        font-size: 0.65rem;
        font-weight: bold;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      cursor: pointer;
      padding: 0.3rem 0.6rem;
      border-radius: 6px;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: $bg-tertiary;
      }

      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid $border-color;
      }

      .user-name {
        font-size: 0.9rem;
        font-weight: 500;
        color: $text-secondary;
      }

      .icon {
        font-size: 1rem;
        color: $text-muted;
      }
    }
  }
}
</style>