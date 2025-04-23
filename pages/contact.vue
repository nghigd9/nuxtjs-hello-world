<template>
  <div class="container">
    <section class="contact-hero">
      <h1 class="contact-title">Get in Touch</h1>
      <p class="contact-subtitle">We'd love to hear from you. Drop us a line!</p>
    </section>
    
    <div class="contact-wrapper">
      <section class="contact-info">
        <div class="info-card">
          <div class="icon-wrapper">
            <Icon name="uil:map-marker" />
          </div>
          <h3>Our Location</h3>
          <p>123 Tech Street<br>Innovation District<br>San Francisco, CA 94103</p>
        </div>
        
        <div class="info-card">
          <div class="icon-wrapper">
            <Icon name="uil:envelope" />
          </div>
          <h3>Email Us</h3>
          <p><a href="mailto:info@yourcompany.com">info@yourcompany.com</a></p>
          <p><a href="mailto:support@yourcompany.com">support@yourcompany.com</a></p>
        </div>
        
        <div class="info-card">
          <div class="icon-wrapper">
            <Icon name="uil:phone" />
          </div>
          <h3>Call Us</h3>
          <p><a href="tel:+14155550123">(415) 555-0123</a></p>
          <p class="hours">Mon-Fri: 9am - 5pm PST</p>
        </div>
        
        <div class="info-card">
          <div class="icon-wrapper">
            <Icon name="uil:users-alt" />
          </div>
          <h3>Follow Us</h3>
          <div class="social-links">
            <a href="https://twitter.com" target="_blank" aria-label="Twitter">
              <Icon name="uil:twitter" />
            </a>
            <a href="https://facebook.com" target="_blank" aria-label="Facebook">
              <Icon name="uil:facebook" />
            </a>
            <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
              <Icon name="uil:linkedin" />
            </a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram">
              <Icon name="uil:instagram" />
            </a>
          </div>
        </div>
      </section>
      
      <section class="contact-form-section">
        <div class="form-header">
          <h2 class="text-sendus">Send Us a Message</h2>
          <p>Fill out the form below and we'll get back to you as soon as possible.</p>
        </div>
        
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Your Name <span class="required">*</span></label>
              <div class="input-wrapper">
                <Icon name="uil:user" class="input-icon" />
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  placeholder="Enter your full name"
                  :class="{ error: errors.name }"
                  required
                />
              </div>
              <p class="error-text" v-if="errors.name">{{ errors.name }}</p>
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
                  :class="{ error: errors.email }"
                  required
                />
              </div>
              <p class="error-text" v-if="errors.email">{{ errors.email }}</p>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <div class="input-wrapper">
                <Icon name="uil:phone" class="input-icon" />
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone" 
                  placeholder="Enter your phone number (optional)"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="subject">Subject <span class="required">*</span></label>
              <div class="input-wrapper">
                <Icon name="uil:subject" class="input-icon" />
                <input 
                  type="text" 
                  id="subject" 
                  v-model="form.subject" 
                  placeholder="What is this regarding?"
                  :class="{ error: errors.subject }"
                  required
                />
              </div>
              <p class="error-text" v-if="errors.subject">{{ errors.subject }}</p>
            </div>
          </div>
          
          <div class="form-group">
            <label for="message">Your Message <span class="required">*</span></label>
            <div class="input-wrapper textarea-wrapper">
              <Icon name="uil:comment-alt" class="input-icon textarea-icon" />
              <textarea 
                id="message" 
                v-model="form.message" 
                placeholder="How can we help you?"
                rows="5"
                :class="{ error: errors.message }"
                required
              ></textarea>
            </div>
            <p class="error-text" v-if="errors.message">{{ errors.message }}</p>
          </div>
          
          <div class="form-group checkbox-group">
            <div class="checkbox-wrapper">
              <input type="checkbox" id="newsletter" v-model="form.newsletter" />
              <label for="newsletter">Subscribe to our newsletter for updates</label>
            </div>
          </div>
          
          <div v-if="formError" class="form-error">
            <Icon name="uil:exclamation-circle" />
            <span>{{ formError }}</span>
          </div>
          
          <div v-if="formSuccess" class="form-success">
            <Icon name="uil:check-circle" />
            <span>{{ formSuccess }}</span>
          </div>
          
          <div class="form-actions">
            <button type="reset" class="btn-secondary" @click="resetForm">Reset</button>
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting">
                <Icon name="uil:spinner" class="spinner" />
                Sending...
              </span>
              <span v-else>
                <Icon name="uil:message" />
                Send Message
              </span>
            </button>
          </div>
        </form>
      </section>
    </div>
    
    <section class="map-section">
      <h2>Find Us Here</h2>
      <div class="map-container">
        <!-- You would use a real map integration here -->
        <div class="map-placeholder">
          <Icon name="uil:map" class="map-icon" />
          <p>Map integration would be displayed here</p>
        </div>
      </div>
      <div class="map-overlay">
        <div class="address-card">
          <h3>Our Headquarters</h3>
          <address>
            <p><Icon name="uil:building" /> 123 Tech Street</p>
            <p>Innovation District</p>
            <p>San Francisco, CA 94103</p>
            <p><Icon name="uil:clock" /> Mon-Fri: 9am - 5pm PST</p>
            <a href="https://maps.google.com" target="_blank" class="directions-link">
              <Icon name="uil:direction" />
              Get Directions
            </a>
          </address>
        </div>
      </div>
    </section>
    
    <section class="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-container">
        <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
          <div 
            class="faq-question" 
            @click="toggleFaq(index)"
            :class="{ 'active': openFaq === index }"
          >
            <h3>{{ faq.question }}</h3>
            <Icon :name="openFaq === index ? 'uil:angle-up' : 'uil:angle-down'" class="faq-icon" />
          </div>
          <div class="faq-answer" :class="{ 'active': openFaq === index }">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false
});

const errors = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const formError = ref('');
const formSuccess = ref('');
const isSubmitting = ref(false);

// FAQ section
const faqs = ref([
  {
    question: "What are your business hours?",
    answer: "Our office is open Monday through Friday from 9:00 AM to 5:00 PM Pacific Standard Time. We are closed on major holidays."
  },
  {
    question: "How quickly can I expect a response?",
    answer: "We strive to respond to all inquiries within 24-48 hours during business days. For urgent matters, please call our support line."
  },
  {
    question: "Do you offer technical support?",
    answer: "Yes, we offer technical support for all our products and services. You can reach our support team via email or phone during business hours."
  },
  {
    question: "Can I schedule a consultation?",
    answer: "Absolutely! You can request a consultation through our contact form, and one of our team members will get in touch to schedule a meeting."
  },
]);

const openFaq = ref(null);

const toggleFaq = (index) => {
  if (openFaq.value === index) {
    openFaq.value = null;
  } else {
    openFaq.value = index;
  }
};

// Form validation
const validateForm = () => {
  let valid = true;
  errors.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  // Name validation
  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required';
    valid = false;
  } else if (form.value.name.trim().length < 2) {
    errors.value.name = 'Name must be at least 2 characters';
    valid = false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required';
    valid = false;
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address';
    valid = false;
  }
  
  // Subject validation
  if (!form.value.subject.trim()) {
    errors.value.subject = 'Subject is required';
    valid = false;
  }
  
  // Message validation
  if (!form.value.message.trim()) {
    errors.value.message = 'Message is required';
    valid = false;
  } else if (form.value.message.trim().length < 10) {
    errors.value.message = 'Message must be at least 10 characters';
    valid = false;
  }
  
  return valid;
};

const submitForm = async () => {
  formError.value = '';
  formSuccess.value = '';
  
  if (!validateForm()) {
    formError.value = 'Please correct the errors in the form.';
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // This would be your actual API call in a real application
    // Example: await $fetch('/api/contact', { method: 'POST', body: form.value });
    
    // Simulate server delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    formSuccess.value = 'Your message has been sent successfully! We will get back to you soon.';
    resetForm();
  } catch (error) {
    console.error('Error submitting form:', error);
    formError.value = 'There was a problem sending your message. Please try again later.';
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false
  };
  errors.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  formError.value = '';
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use 'sass:color';


.contact-hero {
  text-align: center;
  padding: 4rem 0 2rem;
  background: linear-gradient(to bottom, $bg-secondary, $bg-primary);
  border-radius: 12px;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, $primary-color, $accent-secondary, $blue-bright, $accent-primary);
    z-index: 5;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba($accent-primary, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }
}

.contact-title {
  font-size: 3rem;
  margin: 0;
  background: linear-gradient(45deg, $primary-color, $blue-bright);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  text-shadow: 0 2px 10px rgba($primary-color, 0.3);
  position: relative;
  z-index: 2;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.contact-subtitle {
  font-size: 1.3rem;
  margin-top: 1.2rem;
  color: $text-secondary;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-bottom: 4rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 2fr;
  }
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.info-card {
  background-color: $bg-secondary;
  border-radius: 12px;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid $border-color;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, rgba($accent-primary, 0.3), rgba($blue-bright, 0.5));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
    border-color: rgba($accent-primary, 0.4);
    
    &::before {
      transform: scaleX(1);
    }
    
    .icon-wrapper {
      transform: scale(1.1);
      background: linear-gradient(135deg, rgba($primary-color, 0.2), rgba($accent-primary, 0.2));
      box-shadow: 0 0 20px rgba($accent-primary, 0.4);
      
      svg {
        filter: drop-shadow(0 0 3px rgba($accent-primary, 0.7));
      }
    }
  }
  
  h3 {
    color: $text-white;
    margin: 1.2rem 0 0.7rem;
    font-weight: 600;
  }
  
  p {
    color: $text-secondary;
    margin: 0.4rem 0;
    
    a {
      color: $accent-primary;
      text-decoration: none;
      transition: all 0.2s ease;
      position: relative;
      padding-bottom: 2px;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: $accent-primary;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
      }
      
      &:hover {
        color: lighten($accent-primary, 10%);
        text-shadow: 0 0 8px rgba($accent-primary, 0.6);
        
        &::after {
          transform: scaleX(1);
        }
      }
    }
  }
  
  .hours {
    font-size: 0.9rem;
    color: $text-muted;
    margin-top: 0.5rem;
  }
}

.icon-wrapper {
  width: 70px;
  height: 70px;
  background: linear-gradient(45deg, rgba($primary-color, 0.1), rgba($accent-primary, 0.1));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary-color;
  font-size: 1.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: $bg-tertiary;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-secondary;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba($accent-primary, 0.2), rgba($blue-bright, 0.2));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      background-color: $bg-primary;
      color: $primary-color;
      transform: translateY(-5px);
      border-color: rgba($accent-primary, 0.5);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4), 0 0 10px rgba($accent-primary, 0.3);
      
      &::before {
        opacity: 1;
      }
    }
  }
}

.contact-form-section {
  background-color: $bg-secondary;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  border: 1px solid $border-color;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, $primary-color, $blue-bright, $accent-primary);
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba($primary-color, 0.05) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
}

.form-header {
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 2;
    
  h2 {
    color: $text-white;
    font-size: 2rem;
    margin-bottom: 0.8rem;
    background: linear-gradient(45deg, $text-white, $text-white-light);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
  
  p {
    color: $text-secondary;
    font-size: 1.1rem;
    max-width: 80%;
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  
  label {
    color: $text-white;
    font-weight: 600;
    font-size: 1rem;
    
    .required {
      color: $error;
      margin-left: 4px;
      font-size: 1.2rem;
    }
  }
}

.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  
  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: $text-muted;
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }
  
  .textarea-icon {
    top: 1.2rem;
    transform: none;
  }
  
  input, textarea {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid $border-color;
    border-radius: 10px;
    background-color: rgba($bg-tertiary, 0.6);
    color: $text-white;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: $primary-color;
      background-color: rgba($bg-tertiary, 1);
      box-shadow: 0 0 0 4px rgba($primary-color, 0.15), 0 5px 15px rgba(0, 0, 0, 0.2);
      
      & + .input-icon {
        color: $primary-color;
        transform: translateY(-50%) scale(1.1);
      }
    }
    
    &::placeholder {
      color: $text-muted;
    }
    
    &.error {
      border-color: $error;
      
      &:focus {
        box-shadow: 0 0 0 4px rgba($error, 0.15), 0 5px 15px rgba(0, 0, 0, 0.2);
      }
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 140px;
    padding-top: 1.2rem;
    line-height: 1.6;
    
    &:focus + .textarea-icon {
      transform: scale(1.1);
    }
  }
}

.error-text {
  color: $error;
  font-size: 0.85rem;
  margin: 0.2rem 0 0 0.2rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '⚠';
    margin-right: 5px;
  }
}

.checkbox-group {
  margin-top: 0.5rem;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid $border-color;
    border-radius: 6px;
    background-color: rgba($bg-tertiary, 0.6);
    position: relative;
    cursor: pointer;
    
    &:checked {
      background-color: $primary-color;
      border-color: $primary-color;
      box-shadow: 0 0 10px rgba($primary-color, 0.4);
      
      &::after {
        content: "✓";
        position: absolute;
        color: $bg-primary;
        font-size: 0.9rem;
        font-weight: bold;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 4px rgba($primary-color, 0.15);
    }
  }
  
  label {
    font-weight: normal;
    color: $text-secondary;
    font-size: 1rem;
    cursor: pointer;
  }
}

.form-error, .form-success {
  padding: 1.2rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  animation: fadeIn 0.4s ease;
}

.form-error {
  background-color: rgba($error, 0.15);
  border-left: 4px solid $error;
  color: lighten($error, 10%);
  box-shadow: 0 5px 15px rgba($error, 0.2);
}

.form-success {
  background-color: rgba($success, 0.15);
  border-left: 4px solid $success;
  color: lighten($success, 10%);
  box-shadow: 0 5px 15px rgba($success, 0.2);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 1.5rem;
}

.btn-primary, .btn-secondary {
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(45deg, $primary-color, $accent-primary);
  color: $bg-primary;
  border: none;
  box-shadow: 0 8px 20px rgba($primary-color, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 25px rgba($primary-color, 0.4);
    
    &::after {
      transform: translateX(100%);
    }
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  .spinner {
    animation: spin 1.2s linear infinite;
  }
}

.btn-secondary {
  background-color: transparent;
  color: $text-secondary;
  border: 2px solid $border-color;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $bg-tertiary;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    border-color: $text-white-light;
    color: $text-white;
    
    &::before {
      transform: scaleX(1);
    }
  }
}

.map-section {
  margin: 5rem 0;
  position: relative;
  
  h2 {
    text-align: center;
    color: $text-white;
    margin-bottom: 2.5rem;
    font-size: 2rem;
    background: linear-gradient(45deg, $text-white, $text-white-light);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 25%;
      width: 50%;
      height: 2px;
      background: linear-gradient(90deg, transparent, $accent-primary, transparent);
    }
  }
}

.map-container {
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid $border-color;
}

.map-placeholder {
  background: linear-gradient(135deg, $bg-secondary, $bg-tertiary);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $text-secondary;
  
  .map-icon {
    font-size: 5rem;
    color: $accent-primary;
    margin-bottom: 1.5rem;
    opacity: 0.7;
    filter: drop-shadow(0 0 10px rgba($accent-primary, 0.3));
    animation: pulse 3s infinite ease-in-out;
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.7;
  }
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.7;
  }
  50% { 
    transform: scale(1.05); 
    opacity: 0.9;
  }
}

.map-overlay {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  z-index: 10;
  
  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
  }
}

.address-card {
  background-color: $bg-secondary;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  min-width: 300px;
  backdrop-filter: blur(5px);
  border: 1px solid $border-color;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba($accent-primary, 0.05), transparent);
    pointer-events: none;
  }
  
  h3 {
    color: $text-white;
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.4rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 40px;
      height: 2px;
      background-color: $accent-primary;
    }
  }
  
  address {
    font-style: normal;
    
    p {
      color: $text-secondary;
      margin: 0.7rem 0;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      
      svg {
        color: $accent-primary;
        font-size: 1.1rem;
      }
    }
    
    .directions-link {
      display: inline-flex;
      align-items: center;
      gap: 0.8rem;
      color: $primary-color;
      text-decoration: none;
      font-weight: 600;
      margin-top: 1.5rem;
      padding: 0.6rem 1rem;
      background-color: rgba($bg-tertiary, 0.8);
      border-radius: 8px;
      transition: all 0.3s ease;
      border: 1px solid transparent;
      
      svg {
        transition: transform 0.3s ease;
      }
      
      &:hover {
        background-color: rgba($bg-tertiary, 1);
        color: lighten($primary-color, 10%);
        border-color: rgba($primary-color, 0.3);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba($primary-color, 0.1);
        
        svg {
          transform: translateX(3px);
        }
      }
    }
  }
}

.faq-section {
  margin: 6rem 0;
  
  h2 {
    text-align: center;
    color: $text-white;
    margin-bottom: 3rem;
    font-size: 2rem;
    background: linear-gradient(45deg, $text-white, $text-white-light);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 25%;
      width: 50%;
      height: 2px;
      background: linear-gradient(90deg, transparent, $accent-primary, transparent);
    }
  }
}

.faq-container {
  max-width: 850px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  background-color: $bg-secondary;
  border: 1px solid $border-color;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
  }
}

.faq-question {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: transparent;
    transition: background-color 0.3s ease;
  }
  
  &:hover {
    background-color: rgba($bg-tertiary, 0.7);
    
    h3 {
      color: lighten($text-white-light, 10%);
    }
    
    .faq-icon {
      color: $accent-primary;
    }
  }
  
  &.active {
    background-color: $bg-tertiary;
    
    &::before {
      background-color: $accent-primary;
    }
    
    h3 {
      color: $accent-primary;
    }
    
    .faq-icon {
      transform: rotate(180deg);
      color: $accent-primary;
    }
  }
  
  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: $text-white;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .faq-icon {
    font-size: 1.4rem;
    color: $text-secondary;
    transition: all 0.3s ease;
  }
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1), padding 0.3s ease;
  
  &.active {
    max-height: 1000px;
    padding: 0 2rem 2rem;
    transition: max-height 1s ease-in-out, padding 0.3s ease;
  }
  
  p {
    color: $text-secondary;
    margin: 0;
    line-height: 1.7;
    font-size: 1.05rem;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>