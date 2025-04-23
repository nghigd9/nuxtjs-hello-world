<template>
  <div class="admin-products-page">
    <h1 class="page-title">Manage Products</h1>

    <!-- Toolbar: Search and Add Button -->
    <div class="toolbar">
      <div class="search-wrapper">
        <Icon name="uil:search" class="search-icon" />
        <input type="text" v-model="searchQuery" placeholder="Search products by name or SKU..." />
      </div>
      <button class="btn-add-product">
        <Icon name="uil:plus" />
        Add New Product
      </button>
    </div>

    <!-- Products Table -->
    <div class="table-container">
      <table class="products-table">
        <thead>
          <tr>
            <th><input type="checkbox" @change="toggleSelectAll" :checked="allSelected" /></th>
            <th>Product</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredProducts.length === 0">
            <td colspan="8" class="no-results">No products found matching your search.</td>
          </tr>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td><input type="checkbox" v-model="selectedProducts" :value="product.id" /></td>
            <td>
              <div class="product-info">
                <img :src="product.image || '/images/product-placeholder.png'" alt="Product Image" class="product-image" />
                <span>{{ product.name }}</span>
              </div>
            </td>
            <td>{{ product.sku }}</td>
            <td>{{ product.category }}</td>
            <td>{{ formatCurrency(product.price) }}</td>
            <td>
              <span :class="['stock-status', getStockStatusClass(product.stock)]">
                {{ product.stock }} units
              </span>
            </td>
            <td>
              <span :class="['status-badge', product.status.toLowerCase()]">
                <Icon :name="product.status === 'Published' ? 'uil:check-circle' : 'uil:edit-alt'" />
                {{ product.status }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="btn-action view" title="View Product">
                  <Icon name="uil:eye" />
                </button>
                <button class="btn-action edit" title="Edit Product">
                  <Icon name="uil:edit" />
                </button>
                <button class="btn-action delete" title="Delete Product">
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
      <span>Showing 1-{{ filteredProducts.length }} of {{ products.length }}</span>
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
const selectedProducts = ref([]);

// Placeholder product data - replace with API call
const products = ref([
  { id: 101, name: 'Wireless Noise-Cancelling Headphones', sku: 'WNC-HP-BLK', category: 'Electronics', price: 199.99, stock: 55, status: 'Published', image: '/images/products/headphones.jpg' },
  { id: 102, name: 'Organic Cotton T-Shirt', sku: 'OCT-TS-WHT-M', category: 'Apparel', price: 24.95, stock: 120, status: 'Published', image: null },
  { id: 103, name: 'Smart Coffee Maker', sku: 'SCM-KITCH-SS', category: 'Home Goods', price: 89.50, stock: 8, status: 'Published', image: '/images/products/coffeemaker.jpg' },
  { id: 104, name: 'Yoga Mat - Eco Friendly', sku: 'YGM-ECO-BLU', category: 'Sports', price: 35.00, stock: 0, status: 'Draft', image: null },
  { id: 105, name: 'Advanced JavaScript Book', sku: 'BK-JS-ADV-HC', category: 'Books', price: 49.99, stock: 30, status: 'Published', image: '/images/products/book.jpg' },
]);

// Computed property for filtering products
const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products.value;
  }
  const lowerQuery = searchQuery.value.toLowerCase();
  return products.value.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.sku.toLowerCase().includes(lowerQuery)
  );
});

// Computed property to check if all products are selected
const allSelected = computed(() => {
  return filteredProducts.value.length > 0 && selectedProducts.value.length === filteredProducts.value.length;
});

// Function to toggle select all checkboxes
const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedProducts.value = filteredProducts.value.map(product => product.id);
  } else {
    selectedProducts.value = [];
  }
};

// Helper function to format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

// Helper function to determine stock status class
const getStockStatusClass = (stock) => {
  if (stock > 20) return 'in-stock';
  if (stock > 0) return 'low-stock';
  return 'out-of-stock';
};

// Add functions for Add/Edit/Delete/View actions later
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/admin' as *; // Import common admin styles

.admin-products-page {
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

.btn-add-product {
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
  overflow-x: auto;
  border: 1px solid $border-color;
  box-shadow: $shadow-soft;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px; // Adjust as needed

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

  .product-info {
    display: flex;
    align-items: center;
    gap: 1rem;

    .product-image {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      object-fit: cover;
      background-color: $bg-tertiary; // Placeholder background
      border: 1px solid $border-color;
    }
    span {
      color: $text-primary;
      font-weight: 500;
      white-space: nowrap; // Prevent wrapping for now
    }
  }

  .stock-status {
    font-weight: 500;
    &.in-stock { color: $success; }
    &.low-stock { color: $warning; }
    &.out-of-stock { color: $error; }
  }

  .status-badge {
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

    &.published { background-color: rgba($success, 0.2); color: $success; }
    &.draft { background-color: rgba($text-muted, 0.2); color: $text-muted; }
    // Add other statuses like 'archived' etc.
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

      &.view:hover { color: $primary-color; border-color: $primary-color; }
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