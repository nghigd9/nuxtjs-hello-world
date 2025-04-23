<template>
  <div class="admin-dashboard">
    <h1 class="page-title">Dashboard Overview</h1>

    <!-- Summary Cards -->
    <section class="summary-cards">
      <div class="summary-card users">
        <div class="card-icon">
          <Icon name="uil:users-alt" />
        </div>
        <div class="card-content">
          <span class="card-value">1,234</span>
          <span class="card-label">Total Users</span>
        </div>
        <div class="card-trend up">
          <Icon name="uil:arrow-growth" />
          <span>+5.2%</span>
        </div>
      </div>
      <div class="summary-card orders">
        <div class="card-icon">
          <Icon name="uil:shopping-cart-alt" />
        </div>
        <div class="card-content">
          <span class="card-value">567</span>
          <span class="card-label">New Orders</span>
        </div>
        <div class="card-trend down">
          <Icon name="uil:chart-down" />
          <span>-1.8%</span>
        </div>
      </div>
      <div class="summary-card revenue">
        <div class="card-icon">
          <Icon name="uil:usd-circle" />
        </div>
        <div class="card-content">
          <span class="card-value">$15,890</span>
          <span class="card-label">Total Revenue</span>
        </div>
        <div class="card-trend up">
          <Icon name="uil:arrow-growth" />
          <span>+12.5%</span>
        </div>
      </div>
      <div class="summary-card visitors">
        <div class="card-icon">
          <Icon name="uil:chart-line" />
        </div>
        <div class="card-content">
          <span class="card-value">8,450</span>
          <span class="card-label">Unique Visitors</span>
        </div>
        <div class="card-trend up">
          <Icon name="uil:arrow-growth" />
          <span>+8.1%</span>
        </div>
      </div>
    </section>

    <!-- Charts Section -->
    <section class="charts-section">
      <div class="chart-container sales-overview">
        <h2 class="chart-title">Sales Overview</h2>
        <div class="chart-placeholder">
          <Icon name="uil:graph-bar" />
          <span>Sales Chart Placeholder</span>
          <!-- Chart component would go here -->
        </div>
      </div>
      <div class="chart-container user-registrations">
        <h2 class="chart-title">User Registrations</h2>
        <div class="chart-placeholder">
          <Icon name="uil:chart-pie" />
          <span>User Chart Placeholder</span>
          <!-- Chart component would go here -->
        </div>
      </div>
    </section>

    <!-- Recent Activity -->
    <section class="recent-activity">
      <h2 class="section-title">Recent Activity</h2>
      <div class="activity-list">
        <div class="activity-item">
          <div class="activity-icon user">
            <Icon name="uil:user-plus" />
          </div>
          <div class="activity-details">
            <span class="activity-text">New user registered: <strong>John Doe</strong></span>
            <span class="activity-time">2 minutes ago</span>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon order">
            <Icon name="uil:receipt" />
          </div>
          <div class="activity-details">
            <span class="activity-text">New order placed: <strong>#ORD-12345</strong></span>
            <span class="activity-time">15 minutes ago</span>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon product">
            <Icon name="uil:tag-alt" />
          </div>
          <div class="activity-details">
            <span class="activity-text">Product updated: <strong>Awesome Gadget v2</strong></span>
            <span class="activity-time">1 hour ago</span>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon comment">
            <Icon name="uil:comment-alt-message" />
          </div>
          <div class="activity-details">
            <span class="activity-text">New comment on post: <strong>"Latest Updates"</strong></span>
            <span class="activity-time">3 hours ago</span>
          </div>
        </div>
      </div>
      <div class="view-all-link">
        <NuxtLink to="/admin/activity">View All Activity</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
// This page will likely use the admin layout
definePageMeta({
  layout: 'admin', // Assuming you have layouts/admin.vue
});

// In a real app, you would fetch dashboard data here
// const { data: summary } = await useFetch('/api/admin/dashboard/summary');
// const { data: salesData } = await useFetch('/api/admin/dashboard/sales');
// etc.
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/admin' as *; // Import common admin styles if needed

.admin-dashboard {
  animation: fadeIn 0.5s ease-out;
}

.page-title {
  font-size: 1.8rem;
  color: $text-primary;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

// Summary Cards
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.summary-card {
  background-color: $bg-secondary;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid $border-color;
  box-shadow: $shadow-soft;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }

  .card-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    flex-shrink: 0;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .card-value {
    font-size: 1.6rem;
    font-weight: 700;
    color: $text-primary;
    line-height: 1.2;
  }

  .card-label {
    font-size: 0.85rem;
    color: $text-secondary;
    margin-top: 0.2rem;
  }

  .card-trend {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;

    .icon {
      margin-right: 0.2rem;
      font-size: 0.9rem;
    }

    &.up {
      color: $success;
      background-color: rgba($success, 0.1);
    }
    &.down {
      color: $error;
      background-color: rgba($error, 0.1);
    }
  }

  // Specific card colors
  &.users .card-icon { background-color: rgba($blue-bright, 0.2); color: $blue-bright; }
  &.orders .card-icon { background-color: rgba($orange-accent, 0.2); color: $orange-accent; }
  &.revenue .card-icon { background-color: rgba($success, 0.2); color: $success; }
  &.visitors .card-icon { background-color: rgba($purple-accent, 0.2); color: $purple-accent; }
}

// Charts Section
.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.chart-container {
  background-color: $bg-secondary;
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid $border-color;
  box-shadow: $shadow-soft;
  min-height: 300px; // Ensure charts have some height
  display: flex;
  flex-direction: column;
}

.chart-title {
  font-size: 1.1rem;
  color: $text-primary;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.chart-placeholder {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $text-muted;
  border: 2px dashed $border-color;
  border-radius: 8px;
  background-color: rgba($bg-primary, 0.5);

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.6;
  }
  span {
    font-size: 0.9rem;
  }
}

// Recent Activity
.recent-activity {
  background-color: $bg-secondary;
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid $border-color;
  box-shadow: $shadow-soft;
}

.section-title {
  font-size: 1.1rem;
  color: $text-primary;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid $border-color;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;

  &.user { background-color: rgba($blue-bright, 0.2); color: $blue-bright; }
  &.order { background-color: rgba($orange-accent, 0.2); color: $orange-accent; }
  &.product { background-color: rgba($purple-accent, 0.2); color: $purple-accent; }
  &.comment { background-color: rgba($yellow-accent, 0.2); color: $yellow-accent; }
}

.activity-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.activity-text {
  font-size: 0.9rem;
  color: $text-secondary;
  line-height: 1.4;

  strong {
    color: $text-primary;
    font-weight: 600;
  }
}

.activity-time {
  font-size: 0.75rem;
  color: $text-muted;
  margin-top: 0.2rem;
}

.view-all-link {
  text-align: center;
  margin-top: 1rem;

  a {
    color: $primary-color;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: lighten($primary-color, 10%);
      text-decoration: underline;
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>