<template>
  <div class="container">
    <div class="auth-wrapper">
      <div class="auth-form-container">
        <div class="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <Icon name="uil:envelope" class="input-icon" />
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <Icon name="uil:lock" class="input-icon" />
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="form.password" 
                placeholder="Enter your password"
                required
              />
              <button 
                type="button" 
                class="password-toggle" 
                @click="togglePassword"
              >
                <Icon :name="showPassword ? 'uil:eye-slash' : 'uil:eye'" />
              </button>
            </div>
          </div>
          
          <div class="form-options">
            <div class="remember-me">
              <input type="checkbox" id="remember" v-model="form.remember" />
              <label for="remember">Remember me</label>
            </div>
            <NuxtLink to="/forgot-password" class="forgot-link">
              Forgot password?
            </NuxtLink>
          </div>
          
          <div v-if="error" class="error-message">
            <Icon name="uil:exclamation-circle" />
            <span>{{ error }}</span>
          </div>
          
          <button type="submit" class="submit-button" :disabled="loading">
            <span v-if="loading">
              <Icon name="uil:spinner" class="spinner" />
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>
        
        <div class="auth-divider">
          <span>or continue with</span>
        </div>
        
        <div class="social-logins">
          <button class="social-button google">
            <Icon name="logos:google-icon" />
            <span>Google</span>
          </button>
          <button class="social-button github">
            <Icon name="uil:github" />
            <span>GitHub</span>
          </button>
        </div>
        
        <div class="auth-footer">
          Don't have an account?
          <NuxtLink to="/register" class="auth-link">Sign up</NuxtLink>
        </div>
      </div>
      
      <div class="auth-image">
        <img src="https://picsum.photos/id/1/600/800" alt="Login image" />
        <div class="auth-overlay">
          <h2>Discover Amazing Features</h2>
          <p>Join our platform and explore all the powerful tools we offer.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  email: '',
  password: '',
  remember: false
});

const showPassword = ref(false);
const loading = ref(false);
const error = ref('');

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    // Here you would integrate with your authentication API
    // Example: await $fetch('/api/auth/login', { method: 'POST', body: form.value });
    
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, show an error for incorrect credentials
    // In a real app, this would be handled by your API response
    if (form.value.email !== 'demo@example.com' || form.value.password !== 'password') {
      throw new Error('Invalid email or password');
    }
    
    console.log('Login successful:', form.value);
    
    // Redirect to dashboard or home page
    navigateTo('/');
  } catch (err) {
    console.error('Login error:', err);
    error.value = err.message || 'Failed to sign in. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/auth.scss'
</style>