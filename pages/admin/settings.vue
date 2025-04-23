<template>
  <div class="admin-settings-page">
    <h1 class="page-title">Settings</h1>

    <div class="settings-container">
      <!-- Tabs or Navigation (Optional but recommended for many settings) -->
      <div class="settings-nav">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['nav-button', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          <Icon :name="tab.icon" />
          <span>{{ tab.name }}</span>
        </button>
      </div>

      <!-- Settings Content Area -->
      <div class="settings-content">
        <!-- Profile Settings -->
        <section v-if="activeTab === 'profile'" class="settings-section">
          <h2 class="section-title">Profile Settings</h2>
          <form @submit.prevent="saveProfileSettings">
            <div class="form-grid">
              <div class="form-group">
                <label for="adminName">Name</label>
                <input type="text" id="adminName" v-model="profileSettings.name" placeholder="Your Name" />
              </div>
              <div class="form-group">
                <label for="adminEmail">Email</label>
                <input type="email" id="adminEmail" v-model="profileSettings.email" placeholder="your.email@example.com" />
              </div>
            </div>
            <div class="form-group">
              <label for="adminAvatar">Avatar URL</label>
              <input type="text" id="adminAvatar" v-model="profileSettings.avatar" placeholder="https://example.com/avatar.jpg" />
              <!-- Add file upload component later -->
            </div>
            <button type="submit" class="btn-save">Save Profile</button>
          </form>
        </section>

        <!-- Appearance Settings -->
        <section v-if="activeTab === 'appearance'" class="settings-section">
          <h2 class="section-title">Appearance</h2>
          <form @submit.prevent="saveAppearanceSettings">
            <div class="form-group">
              <label for="siteTheme">Site Theme</label>
              <select id="siteTheme" v-model="appearanceSettings.theme">
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
                <option value="system">System Default</option>
              </select>
            </div>
             <div class="form-group">
                <label for="adminLogo">Admin Logo URL</label>
                <input type="text" id="adminLogo" v-model="appearanceSettings.logoUrl" placeholder="URL for admin panel logo" />
              </div>
            <button type="submit" class="btn-save">Save Appearance</button>
          </form>
        </section>

        <!-- Security Settings -->
        <section v-if="activeTab === 'security'" class="settings-section">
          <h2 class="section-title">Security</h2>
          <form @submit.prevent="saveSecuritySettings">
             <div class="form-group">
                <label for="currentPassword">Current Password</label>
                <input type="password" id="currentPassword" v-model="securitySettings.currentPassword" />
              </div>
             <div class="form-group">
                <label for="newPassword">New Password</label>
                <input type="password" id="newPassword" v-model="securitySettings.newPassword" />
              </div>
             <div class="form-group">
                <label for="confirmPassword">Confirm New Password</label>
                <input type="password" id="confirmPassword" v-model="securitySettings.confirmPassword" />
              </div>
             <div class="form-group checkbox-group">
                <input type="checkbox" id="enable2fa" v-model="securitySettings.enable2FA" />
                <label for="enable2fa">Enable Two-Factor Authentication (2FA)</label>
              </div>
            <button type="submit" class="btn-save">Update Security Settings</button>
          </form>
        </section>

         <!-- Add more sections like Notifications, API Keys, etc. -->

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Set the layout for this page
definePageMeta({
  layout: 'admin',
});

const tabs = [
  { id: 'profile', name: 'Profile', icon: 'uil:user-circle' },
  { id: 'appearance', name: 'Appearance', icon: 'uil:palette' },
  { id: 'security', name: 'Security', icon: 'uil:shield-check' },
  // Add more tabs as needed
];

const activeTab = ref(tabs[0].id); // Default to the first tab

// Placeholder settings data - replace with API calls to fetch/save
const profileSettings = ref({
  name: 'Admin User',
  email: 'admin@example.com',
  avatar: '',
});

const appearanceSettings = ref({
  theme: 'dark',
  logoUrl: '',
});

const securitySettings = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  enable2FA: false,
});

// Placeholder save functions
const saveProfileSettings = () => {
  console.log('Saving profile settings:', profileSettings.value);
  // Add API call here
  alert('Profile settings saved (placeholder)');
};

const saveAppearanceSettings = () => {
  console.log('Saving appearance settings:', appearanceSettings.value);
  // Add API call here
  alert('Appearance settings saved (placeholder)');
};

const saveSecuritySettings = () => {
  console.log('Saving security settings:', securitySettings.value);
  // Add API call here
  alert('Security settings saved (placeholder)');
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/admin' as *; // Import common admin styles

.admin-settings-page {
  animation: fadeIn 0.5s ease-out;
}

.page-title {
  font-size: 1.8rem;
  color: $text-primary;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.settings-container {
  display: flex;
  gap: 2rem;
  background-color: $bg-secondary;
  border-radius: 8px;
  border: 1px solid $border-color;
  box-shadow: $shadow-soft;
  overflow: hidden; // Contain children

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
}

.settings-nav {
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  border-right: 1px solid $border-color;
  min-width: 200px; // Ensure nav has some width

  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
    border-right: none;
    border-bottom: 1px solid $border-color;
    padding: 0.5rem 1rem;
    min-width: auto;
  }

  .nav-button {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.9rem 1.5rem;
    background: none;
    border: none;
    color: $text-secondary;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s ease, color 0.2s ease;
    white-space: nowrap;

    .icon {
      font-size: 1.2rem;
    }

    &:hover {
      background-color: $bg-tertiary;
      color: $text-primary;
    }

    &.active {
      background-color: rgba($primary-color, 0.1);
      color: $primary-color;
      font-weight: 600;
      position: relative;

      // Active indicator line
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background-color: $primary-color;

        @media (max-width: 768px) {
          width: auto;
          height: 3px;
          left: 0;
          right: 0;
          bottom: 0;
          top: auto;
        }
      }
    }

     @media (max-width: 768px) {
        padding: 0.7rem 1rem;
        border-radius: 6px;
     }
  }
}

.settings-content {
  flex-grow: 1;
  padding: 2rem;

  @media (max-width: 768px) {
     padding: 1.5rem;
  }
}

.settings-section {
  animation: sectionFadeIn 0.4s ease-out;
}

.section-title {
  font-size: 1.3rem;
  color: $text-primary;
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid $border-color;
  font-weight: 600;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: $text-secondary;
    font-weight: 500;
    font-size: 0.9rem;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  select {
    width: 100%;
    padding: 0.7rem 1rem;
    background-color: $bg-tertiary;
    border: 1px solid $border-color;
    border-radius: 6px;
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

  select {
    cursor: pointer;
  }
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: $primary-color; // Use browser default styling with accent color
  }
  label {
    color: $text-secondary;
    font-weight: normal;
    cursor: pointer;
  }
}

.btn-save {
  background: linear-gradient(45deg, $primary-color, lighten($primary-color, 10%));
  color: $bg-primary;
  border: none;
  border-radius: 6px;
  padding: 0.8rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start; // Don't stretch full width
  margin-top: 1rem;
  box-shadow: 0 3px 10px rgba($primary-color, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba($primary-color, 0.3);
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes sectionFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>