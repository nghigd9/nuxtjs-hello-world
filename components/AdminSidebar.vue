<template>
  <aside :class="['admin-sidebar', { 'is-collapsed': isCollapsed }]">
    <nav class="sidebar-nav">
      <ul>
        <li>
          <NuxtLink to="/admin" class="nav-link" active-class="is-active">
            <Icon name="uil:dashboard" class="nav-icon" />
            <span class="nav-text">Dashboard</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/users" class="nav-link" active-class="is-active">
            <Icon name="uil:users-alt" class="nav-icon" />
            <span class="nav-text">Users</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/products" class="nav-link" active-class="is-active">
            <Icon name="uil:package" class="nav-icon" />
            <span class="nav-text">Products</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/orders" class="nav-link" active-class="is-active">
            <Icon name="uil:shopping-cart-alt" class="nav-icon" />
            <span class="nav-text">Orders</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/settings" class="nav-link" active-class="is-active">
            <Icon name="uil:setting" class="nav-icon" />
            <span class="nav-text">Settings</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="sidebar-footer">
      <NuxtLink to="/logout" class="nav-link logout-link">
        <Icon name="uil:signout" class="nav-icon" />
        <span class="nav-text">Logout</span>
      </NuxtLink>
    </div>
  </aside>
</template>

<script lang="ts" setup>
defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.admin-sidebar {
  width: 240px;
  height: calc(100vh - 60px); // Full height minus header
  background-color: $bg-secondary;
  border-right: 1px solid $border-color;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: sticky;
  top: 60px; // Stick below the header
  overflow-y: auto; // Allow scrolling if content overflows

  &.is-collapsed {
    width: 70px;

    .nav-text, .logout-link .nav-text {
      opacity: 0;
      visibility: hidden;
      width: 0;
      margin-left: -10px; // Prevent text from briefly appearing
    }

    .nav-link {
      justify-content: center;
    }

    .nav-icon {
      margin-right: 0;
    }
  }

  .sidebar-nav {
    flex-grow: 1;
    padding: 1rem 0;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      margin: 0.2rem 0;
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 0.8rem 1.5rem;
      color: $text-secondary;
      text-decoration: none;
      transition: background-color 0.2s ease, color 0.2s ease;
      white-space: nowrap;
      overflow: hidden;

      .nav-icon {
        font-size: 1.3rem;
        margin-right: 1rem;
        flex-shrink: 0; // Prevent icon from shrinking when collapsed
        transition: margin-right 0.3s ease;
      }

      .nav-text {
        font-size: 0.95rem;
        font-weight: 500;
        transition: opacity 0.2s ease 0.1s, visibility 0.2s ease 0.1s, width 0.3s ease; // Delay text fade
      }

      &:hover {
        background-color: $bg-tertiary;
        color: $text-primary;
      }

      &.is-active {
        background-color: rgba($primary-color, 0.15);
        color: $primary-color;
        font-weight: 600;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background-color: $primary-color;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }
  }

  .sidebar-footer {
    padding: 1rem 0;
    margin-top: auto; // Pushes footer to the bottom
    border-top: 1px solid $border-color;

    .logout-link {
      display: flex;
      align-items: center;
      padding: 0.8rem 1.5rem;
      color: $text-secondary;
      text-decoration: none;
      transition: background-color 0.2s ease, color 0.2s ease;
      white-space: nowrap;
      overflow: hidden;

      .nav-icon {
        font-size: 1.3rem;
        margin-right: 1rem;
        flex-shrink: 0;
        transition: margin-right 0.3s ease;
      }

      .nav-text {
        font-size: 0.95rem;
        font-weight: 500;
        transition: opacity 0.2s ease 0.1s, visibility 0.2s ease 0.1s, width 0.3s ease;
      }

      &:hover {
        background-color: rgba($error, 0.15);
        color: $error;
      }
    }
  }
}
</style>