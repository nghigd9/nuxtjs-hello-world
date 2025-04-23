<template>
  <div class="container">
    <div class="auth-wrapper">
      <div class="auth-form-container">
        <div class="auth-header">
          <h1>Create Your Account</h1>
          <p>Join us and start your journey!</p>
        </div>
        
        <form @submit.prevent="handleRegister" class="auth-form">
          <div class="form-group">
            <label for="name">Full Name <span class="required">*</span></label>
            <div class="input-wrapper">
              <Icon name="uil:user" class="input-icon" />
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email Address <span class="required">*</span></label>
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
          
          <div class="form-row">
            <div class="form-group">
              <label for="password">Password <span class="required">*</span></label>
              <div class="input-wrapper">
                <Icon name="uil:lock" class="input-icon" />
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="form.password" 
                  placeholder="Password"
                  required
                />
                <button type="button" @click="togglePassword" class="password-toggle">
                  <Icon :name="showPassword ? 'uil:eye-slash' : 'uil:eye'" />
                </button>
              </div>
              <div class="password-strength" v-if="form.password">
                <div class="strength-bar" :class="strengthClass">
                  <div class="bar" :style="{ width: passwordStrength + '%' }"></div>
                </div>
                <span class="strength-text" :class="strengthClass">{{ strengthText }}</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="confirmPassword">Confirm Password <span class="required">*</span></label>
              <div class="input-wrapper">
                <Icon name="uil:check-circle" class="input-icon" />
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="confirmPassword" 
                  v-model="form.confirmPassword" 
                  placeholder="Re-enter your password"
                  required
                />
              </div>
            </div>
          </div>
          
          <div class="form-check">
            <input 
              type="checkbox" 
              id="agreeTerms" 
              v-model="form.agreeTerms"
              required
            />
            <label for="agreeTerms">
              I agree to the 
              <a href="#" @click.prevent="showTerms" class="terms-link">Terms of Service</a> and 
              <a href="#" @click.prevent="showPrivacy" class="terms-link">Privacy Policy</a>
              <span class="required">*</span>
            </label>
          </div>
          
          <div v-if="error" class="error-message">
            <Icon name="uil:exclamation-triangle" />
            <span>{{ error }}</span>
          </div>
          
          <button type="submit" class="submit-button" :disabled="loading || !isFormValid">
            <span v-if="loading">
              <Icon name="uil:spinner" class="spinner" />
              Registering...
            </span>
            <span v-else>
              <Icon name="uil:user-plus" />
              Create Account
            </span>
          </button>
        </form>
        
        <div class="auth-divider">
          <span>Or sign up with</span>
        </div>
        
        <div class="social-logins">
          <button class="social-button google">
            <Icon name="uil:google" />
            Google
          </button>
          <button class="social-button github">
            <Icon name="uil:github" />
            GitHub
          </button>
        </div>
        
        <div class="auth-footer">
          <span>Already have an account?</span>
          <NuxtLink to="/login" class="auth-link">Sign In</NuxtLink>
        </div>
      </div>
      
      <div class="auth-image">
        <img src="https://placehold.co/600x400" alt="Auth Image" />
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
});

const showPassword = ref(false);
const loading = ref(false);
const error = ref('');

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const passwordStrength = computed(() => {
  if (!form.value.password) return 0;
  
  const password = form.value.password;
  let score = 0;
  
  // Length
  if (password.length >= 8) score += 25;
  if (password.length >= 12) score += 15; // Bonus for longer
  
  // Contains lowercase
  if (/[a-z]/.test(password)) score += 15;
  
  // Contains uppercase
  if (/[A-Z]/.test(password)) score += 15;
  
  // Contains number
  if (/\d/.test(password)) score += 15;
  
  // Contains special char
  if (/[^A-Za-z0-9]/.test(password)) score += 15;
  
  return Math.min(score, 100);
});

const strengthClass = computed(() => {
  const strength = passwordStrength.value;
  if (strength < 40) return 'weak';
  if (strength < 75) return 'medium';
  return 'strong';
});

const strengthText = computed(() => {
  const strength = passwordStrength.value;
  if (strength < 40) return 'Weak';
  if (strength < 75) return 'Medium';
  return 'Strong';
});

const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.email &&
    form.value.password &&
    form.value.confirmPassword &&
    form.value.password === form.value.confirmPassword &&
    form.value.agreeTerms &&
    passwordStrength.value >= 40 // Example: require at least medium strength
  );
});

const handleRegister = async () => {
  if (!isFormValid.value) {
    if (form.value.password !== form.value.confirmPassword) {
      error.value = 'Passwords do not match.';
    } else if (!form.value.agreeTerms) {
      error.value = 'You must agree to the terms and privacy policy.';
    } else if (passwordStrength.value < 40) {
      error.value = 'Password is too weak.';
    } else {
      error.value = 'Please fill in all required fields correctly.';
    }
    return;
  }
  
  loading.value = true;
  error.value = '';
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Registration successful:', form.value);
    // Redirect or show success message
    navigateTo('/login'); // Redirect to login after successful registration
  } catch (err) {
    console.error('Registration error:', err);
    error.value = 'Failed to register. Please try again.';
  } finally {
    loading.value = false;
  }
};

const showTerms = () => {
  // Implement modal or navigation for terms
  alert('Show Terms of Service');
};

const showPrivacy = () => {
  // Implement modal or navigation for privacy policy
  alert('Show Privacy Policy');
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/auth.scss'; // Import the common styles
@use '@/assets/scss/variables' as *; // Still needed for specific styles below

// Styles specific to the register page
.password-strength {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  
  .strength-bar {
    flex-grow: 1;
    height: 8px;
    background-color: $bg-tertiary;
    border-radius: 4px;
    overflow: hidden;
    
    .bar {
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s ease, background-color 0.3s ease;
    }
  }
  
  .strength-text {
    font-size: 0.85rem;
    font-weight: 600;
    transition: color 0.3s ease;
  }
  
  .weak .bar { background-color: $error; }
  .medium .bar { background-color: $warning; }
  .strong .bar { background-color: $success; }
  
  .weak { color: $error; }
  .medium { color: $warning; }
  .strong { color: $success; }
}

.form-check {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.5rem;
  
  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid $border-color;
    border-radius: 4px;
    background-color: rgba($bg-tertiary, 0.6);
    position: relative;
    cursor: pointer;
    margin-top: 2px; // Align checkbox with first line of text
    flex-shrink: 0; // Prevent checkbox from shrinking
    
    &:checked {
      background-color: $primary-color;
      border-color: $primary-color;
      
      &::after {
        content: "✓";
        position: absolute;
        color: $bg-primary;
        font-size: 0.8rem;
        font-weight: bold;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba($primary-color, 0.2);
    }
  }
  
  label {
    font-size: 0.9rem;
    color: $text-secondary;
    line-height: 1.4;
    cursor: pointer;
    
    .terms-link {
      color: $primary-color;
      text-decoration: none;
      font-weight: 600;
      
      &:hover {
        text-decoration: underline;
        color: lighten($primary-color, 10%);
      }
    }
    
    .required {
      color: $error;
      margin-left: 4px;
    }
  }
}
</style>