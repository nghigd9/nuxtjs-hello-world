<template>
  <div class="container">
    <div class="auth-wrapper">
      <div class="auth-form-container">
        <div class="auth-header">
          <h1>Forgot Password</h1>
          <p>Enter your email to reset your password</p>
        </div>
        
        <div v-if="!submitted">
          <form @submit.prevent="handleSubmit" class="auth-form">
            <div class="form-group">
              <label for="email">Email</label>
              <div class="input-wrapper">
                <Icon name="uil:envelope" class="input-icon" />
                <input 
                  type="email" 
                  id="email" 
                  v-model="email" 
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div v-if="error" class="error-message">
              <Icon name="uil:exclamation-circle" />
              <span>{{ error }}</span>
            </div>
            
            <button type="submit" class="submit-button" :disabled="loading">
              <span v-if="loading">
                <Icon name="uil:spinner" class="spinner" />
                Sending...
              </span>
              <span v-else>Reset Password</span>
            </button>
          </form>
        </div>
        
        <div v-else class="success-message">
          <div class="success-icon">
            <Icon name="uil:envelope-check" />
          </div>
          <h3>Check Your Email</h3>
          <p>We've sent instructions to reset your password to <strong>{{ email }}</strong>.</p>
          <p class="email-note">If you don't see the email, please check your spam folder.</p>
          
          <button @click="resendEmail" class="outline-button" :disabled="resendLoading">
            <span v-if="resendLoading">
              <Icon name="uil:spinner" class="spinner" />
              Resending...
            </span>
            <span v-else>Resend Email</span>
          </button>
        </div>
        
        <div class="auth-footer">
          <NuxtLink to="/login" class="back-link">
            <Icon name="uil:arrow-left" />
            Back to Sign In
          </NuxtLink>
        </div>
      </div>
      
      <div class="auth-image">
        <img src="https://picsum.photos/id/122/600/800" alt="Forgot password image" />
        <div class="auth-overlay">
          <h2>Reset Your Password</h2>
          <p>We'll help you get back into your account in no time.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const email = ref('');
const loading = ref(false);
const error = ref('');
const submitted = ref(false);
const resendLoading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    // Here you would integrate with your authentication API
    // Example: await $fetch('/api/auth/forgot-password', { method: 'POST', body: { email: email.value } });
    
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Password reset email sent to:', email.value);
    submitted.value = true;
  } catch (err) {
    console.error('Password reset error:', err);
    error.value = 'Failed to send reset email. Please try again.';
  } finally {
    loading.value = false;
  }
};

const resendEmail = async () => {
  resendLoading.value = true;
  
  try {
    // Here you would call your API to resend the email
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Reset email resent to:', email.value);
    
    // Show success message
    alert('Email has been resent successfully!');
  } catch (err) {
    console.error('Error resending email:', err);
  } finally {
    resendLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

// Reuse the base styling from login.vue

.success-message {
  text-align: center;
  padding: 2rem 0;
  
  .success-icon {
    font-size: 4rem;
    color: $success;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: $text-white-light;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: $text-secondary;
    margin-bottom: 1rem;
    
    strong {
      color: $text-white-light;
    }
  }
  
  .email-note {
    font-size: 0.9rem;
    color: $text-muted;
    margin-bottom: 2rem;
  }
}

.outline-button {
  background-color: transparent;
  border: 1px solid $primary-color;
  color: $primary-color;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0 auto;
  
  &:hover {
    background-color: rgba($primary-color, 0.1);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .spinner {
    animation: spin 1s linear infinite;
  }
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: $text-secondary;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
  
  &:hover {
    color: $primary-color;
  }
}
</style>