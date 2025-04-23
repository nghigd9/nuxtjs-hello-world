<template>
  <div class="admin-orders-page">
    <h1 class="page-title">Manage Orders</h1>

    <!-- Toolbar: Search and Filters -->
    <div class="toolbar">
      <div class="search-wrapper">
        <Icon name="uil:search" class="search-icon" />
        <input type="text" v-model="searchQuery" placeholder="Search by Order ID or Customer..." />
      </div>
      <div class="filters">
        <select v-model="statusFilter">
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <!-- Add more filters like date range if needed -->
      </div>
    </div>

    <!-- Orders Table -->
    <div class="table-container">
      <table class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredOrders.length === 0">
            <td colspan="6" class="no-results">No orders found matching your criteria.</td>
          </tr>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td>
              <NuxtLink :to="`/admin/orders/${order.id}`" class="order-id-link">#{{ order.id }}</NuxtLink>
            </td>
            <td>{{ order.customerName }}</td>
            <td>{{ formatDate(order.orderDate) }}</td>
            <td>{{ formatCurrency(order.totalAmount) }}</td>
            <td>
              <span :class="['status-badge', order.status.toLowerCase()]">
                {{ order.status }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <NuxtLink :to="`/admin/orders/${order.id}`" class="btn-action view" title="View Order Details">
                  <Icon name="uil:eye" />
                </NuxtLink>
                <button class="btn-action update-status" title="Update Status">
                  <Icon name="uil:truck" />
                </button>
                <!-- Add more actions like print invoice etc. -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination (Placeholder) -->
    <div class="pagination">
      <span>Showing 1-{{ filteredOrders.length }} of {{ orders.length }}</span>
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
const statusFilter = ref(''); // Filter by order status

// Placeholder order data - replace with API call
const orders = ref([
  { id: 'ORD-12345', customerName: 'Alice Johnson', orderDate: '2024-04-22T10:30:00Z', totalAmount: 249.98, status: 'Processing' },
  { id: 'ORD-12346', customerName: 'Bob Smith', orderDate: '2024-04-21T14:00:00Z', totalAmount: 49.90, status: 'Shipped' },
  { id: 'ORD-12347', customerName: 'Charlie Brown', orderDate: '2024-04-21T09:15:00Z', totalAmount: 89.50, status: 'Delivered' },
  { id: 'ORD-12348', customerName: 'Diana Prince', orderDate: '2024-04-20T11:00:00Z', totalAmount: 35.00, status: 'Cancelled' },
  { id: 'ORD-12349', customerName: 'Alice Johnson', orderDate: '2024-04-19T16:45:00Z', totalAmount: 199.99, status: 'Pending' },
]);

// Computed property for filtering orders
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const lowerQuery = searchQuery.value.toLowerCase();
    const matchesSearch = !searchQuery.value ||
      order.id.toLowerCase().includes(lowerQuery) ||
      order.customerName.toLowerCase().includes(lowerQuery);

    const matchesStatus = !statusFilter.value || order.status === statusFilter.value;

    return matchesSearch && matchesStatus;
  });
});

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

// Add functions for updating status, etc. later
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/admin' as *; // Import common admin styles

.admin-orders-page {
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
  max-width: 400px; // Adjust as needed

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

.filters {
  display: flex;
  gap: 1rem;

  select {
    padding: 0.7rem 1rem;
    background-color: $bg-secondary;
    border: 1px solid $border-color;
    border-radius: 6px;
    color: $text-secondary;
    font-size: 0.9rem;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: $primary-color;
    }
  }
}

.table-container {
  background-color: $bg-secondary;
  border-radius: 8px;
  overflow-x: auto;
  border: 1px solid $border-color;
  box-shadow: $shadow-soft;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px; // Adjust as needed

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
        white-space: nowrap; // Prevent wrapping in most cells
      }
    }
  }

  .order-id-link {
    color: $primary-color;
    font-weight: 600;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .status-badge {
    padding: 0.25rem 0.7rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    display: inline-block; // Use inline-block for proper padding

    // Define status colors
    &.pending { background-color: rgba($orange-accent, 0.2); color: $orange-accent; }
    &.processing { background-color: rgba($blue-deep, 0.2); color: $blue-deep; }
    &.shipped { background-color: rgba($purple-accent, 0.2); color: $purple-accent; }
    &.delivered { background-color: rgba($success, 0.2); color: $success; }
    &.cancelled { background-color: rgba($error, 0.2); color: $error; }
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;

    .btn-action, .btn-action.view { // Ensure NuxtLink gets styled too
      background: none;
      border: 1px solid $border-color;
      color: $text-secondary;
      border-radius: 4px;
      padding: 0.4rem;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex; // For icon alignment
      align-items: center;
      justify-content: center;
      text-decoration: none; // For NuxtLink

      &:hover {
        background-color: $bg-tertiary;
        border-color: $text-secondary;
      }

      &.view:hover { color: $primary-color; border-color: $primary-color; }
      &.update-status:hover { color: $blue-bright; border-color: $blue-bright; }
      // Add other action button styles
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