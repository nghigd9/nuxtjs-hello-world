<template>
  <div class="admin-users-page">
    <h1 class="page-title">Manage Users</h1>

    <!-- Toolbar: Search and Add Button -->
    <div class="toolbar">
      <div class="search-wrapper">
        <Icon name="uil:search" class="search-icon" />
        <input type="text" v-model="searchQuery" placeholder="Search users by name or email..." />
      </div>
      <button class="btn-add-user">
        <Icon name="uil:plus" />
        Add New User
      </button>
    </div>

    <!-- Users Table -->
    <div class="table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th><input type="checkbox" @change="toggleSelectAll" :checked="allSelected" /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="7" class="no-results">No users found matching your search.</td>
          </tr>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td><input type="checkbox" v-model="selectedUsers" :value="user.id" /></td>
            <td>
              <div class="user-info">
                <img :src="user.avatar || '/images/avatar-placeholder.png'" alt="Avatar" class="avatar" />
                <span>{{ user.name }}</span>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="['role-badge', user.role.toLowerCase()]">{{ user.role }}</span>
            </td>
            <td>
              <span :class="['status-badge', user.status.toLowerCase()]">
                <Icon :name="user.status === 'Active' ? 'uil:check-circle' : 'uil:ban'" />
                {{ user.status }}
              </span>
            </td>
            <td>{{ formatDate(user.joinedDate) }}</td>
            <td>
              <div class="action-buttons">
                <button class="btn-action edit" title="Edit User">
                  <Icon name="uil:edit" />
                </button>
                <button class="btn-action delete" title="Delete User">
                  <Icon name="uil:trash-alt" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination (Placeholder) -->
    <div class="pagination">
      <span>Showing 1-{{ filteredUsers.length }} of {{ users.length }}</span>
      <div class="pagination-controls">
        <button disabled>&lt; Prev</button>
        <span>Page 1</span>
        <button>Next &gt;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Set the layout for this page
definePageMeta({
  layout: 'admin',
});

const searchQuery = ref('');
const selectedUsers = ref([]);

// Placeholder user data - replace with API call
const users = ref([
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Admin', status: 'Active', joinedDate: '2024-01-15T10:30:00Z', avatar: '/images/avatars/alice.jpg' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@sample.net', role: 'Editor', status: 'Active', joinedDate: '2024-02-20T14:00:00Z', avatar: null },
  { id: 3, name: 'Charlie Brown', email: 'charlie@domain.org', role: 'Viewer', status: 'Inactive', joinedDate: '2024-03-10T09:15:00Z', avatar: '/images/avatars/charlie.jpg' },
  { id: 4, name: 'Diana Prince', email: 'diana.p@mail.co', role: 'Editor', status: 'Active', joinedDate: '2023-12-01T11:00:00Z', avatar: '/images/avatars/diana.jpg' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan.h@service.com', role: 'Admin', status: 'Active', joinedDate: '2024-04-01T16:45:00Z', avatar: null },
]);

// Computed property for filtering users based on search query
const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return users.value;
  }
  const lowerQuery = searchQuery.value.toLowerCase();
  return users.value.filter(user =>
    user.name.toLowerCase().includes(lowerQuery) ||
    user.email.toLowerCase().includes(lowerQuery)
  );
});

// Computed property to check if all users are selected
const allSelected = computed(() => {
  return filteredUsers.value.length > 0 && selectedUsers.value.length === filteredUsers.value.length;
});

// Function to toggle select all checkboxes
const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedUsers.value = filteredUsers.value.map(user => user.id);
  } else {
    selectedUsers.value = [];
  }
};

// Helper function to format date (replace with a more robust library like date-fns if needed)
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Add functions for Add/Edit/Delete actions later
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/admin' as *; // Import common admin styles

.admin-users-page {
  animation: fadeIn 0.5s ease-out;
}

.page-title {
  font-size: 1.8rem;
  color: $text-primary;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-wrapper {
  position: relative;
  flex-grow: 1;
  max-width: 400px;

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: $text-muted;
    font-size: 1.1rem;
  }

  input {
    width: 100%;
    padding: 0.7rem 1rem 0.7rem 2.5rem;
    background-color: $bg-secondary;
    border: 1px solid $border-color;
    border-radius: 6px;
    color: $text-primary;
    font-size: 0.9rem;
    transition: border-color 0.2s ease, background-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: $primary-color;
      background-color: $bg-tertiary;
    }

    &::placeholder {
      color: $text-muted;
    }
  }
}

.btn-add-user {
  background: linear-gradient(45deg, $primary-color, lighten($primary-color, 10%));
  color: $bg-primary;
  border: none;
  border-radius: 6px;
  padding: 0.7rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 3px 10px rgba($primary-color, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba($primary-color, 0.3);
  }
}

.table-container {
  background-color: $bg-secondary;
  border-radius: 8px;
  overflow-x: auto; // Allow horizontal scrolling on small screens
  border: 1px solid $border-color;
  box-shadow: $shadow-soft;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px; // Prevent table from becoming too cramped

  thead {
    background-color: $bg-tertiary;
    border-bottom: 2px solid $border-color;

    th {
      padding: 0.9rem 1rem;
      text-align: left;
      font-size: 0.85rem;
      font-weight: 600;
      color: $text-secondary;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;

      input[type="checkbox"] {
        vertical-align: middle;
      }
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid $border-color;
      transition: background-color 0.15s ease;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: rgba($bg-tertiary, 0.7);
      }

      td {
        padding: 0.9rem 1rem;
        font-size: 0.9rem;
        color: $text-secondary;
        vertical-align: middle;

        input[type="checkbox"] {
          vertical-align: middle;
        }
      }
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
    span {
      color: $text-primary;
      font-weight: 500;
    }
  }

  .role-badge, .status-badge {
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;

    .icon {
      font-size: 0.9rem;
    }
  }

  .role-badge {
    &.admin { background-color: rgba($primary-color, 0.2); color: $primary-color; }
    &.editor { background-color: rgba($blue-bright, 0.2); color: $blue-bright; }
    &.viewer { background-color: rgba($text-muted, 0.2); color: $text-muted; }
  }

  .status-badge {
    &.active { background-color: rgba($success, 0.2); color: $success; }
    &.inactive { background-color: rgba($error, 0.2); color: $error; }
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;

    .btn-action {
      background: none;
      border: 1px solid $border-color;
      color: $text-secondary;
      border-radius: 4px;
      padding: 0.4rem;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: $bg-tertiary;
        border-color: $text-secondary;
      }

      &.edit:hover { color: $blue-bright; border-color: $blue-bright; }
      &.delete:hover { color: $error; border-color: $error; }
    }
  }

  .no-results {
    text-align: center;
    padding: 2rem;
    color: $text-muted;
    font-style: italic;
  }
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid $border-color;
  font-size: 0.9rem;
  color: $text-secondary;

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    button {
      background-color: $bg-tertiary;
      border: 1px solid $border-color;
      color: $text-secondary;
      padding: 0.4rem 0.8rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover:not(:disabled) {
        background-color: $bg-secondary;
        color: $text-primary;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    span {
      padding: 0 0.5rem;
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>