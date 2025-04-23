<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <NuxtLink to="/">YourLogo</NuxtLink>
          <p class="footer-tagline">Your site tagline here</p>
        </div>

        <div class="footer-links">
          <div class="footer-column">
            <h4>Navigation</h4>
            <ul>
              <li><NuxtLink to="/">Home</NuxtLink></li>
              <li><NuxtLink to="/about">About</NuxtLink></li>
              <li><NuxtLink to="/services">Services</NuxtLink></li>
              <li><NuxtLink to="/contact">Contact</NuxtLink></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><NuxtLink to="/blog">Blog</NuxtLink></li>
              <li><NuxtLink to="">FAQ</NuxtLink></li>
              <li><NuxtLink to="">Documentation</NuxtLink></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>Contact</h4>
            <ul>
              <li>hello@yourdomain.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Street Name, City</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Your Company. All rights reserved.</p>
        <div class="social-links">
          <a href="#" aria-label="Twitter"><span>Twitter</span></a>
          <a href="#" aria-label="GitHub"><span>GitHub</span></a>
          <a href="#" aria-label="LinkedIn"><span>LinkedIn</span></a>
        </div>
        <div class="footer-links">
          <button @click="reportError" class="report-button">
            <Icon name="uil:bug" class="report-icon" />
            Report an issue
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { reportError } = useErrorReport();
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use 'sass:color';

.footer {
  background-color: $bg-secondary;
  color: $text-secondary;
  padding: 3rem 0 1.5rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;
}

.footer-logo {
  flex: 1;
  min-width: 250px;
  
  a {
    font-size: 1.5rem;
    color: $primary-color;
    font-weight: bold;
    text-decoration: none;
    &:hover {
      color: color.adjust($primary-color, $lightness: -10%);
    }
  }
}

.footer-tagline {
  margin-top: 0.5rem;
  color: $text-muted;
}

.footer-links {
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-left: 20px;
}

.footer-column {
  flex: 1;
  min-width: 160px;
  
  h4 {
    color: $text-white;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 0.5rem;
      
      a {
        color: $text-secondary;
        text-decoration: none;
        transition: color 0.2s ease;
        
        &:hover {
          color: $primary-color;
        }
      }
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid $border-color;
  
  p {
    margin: 0;
    font-size: 0.9rem;
    color: $text-muted;
  }
}

.social-links {
  display: flex;
  gap: 1rem;
  
  a {
    color: $text-secondary;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: $primary-color;
    }
    
    span {
      margin-left: 0.5rem;
    }
  }
}

.report-button {
  background: transparent;
  border: none;
  color: $text-muted;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  transition: color 0.2s;
  
  &:hover {
    color: $primary-color;
  }
  
  .report-icon {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 2rem;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 2rem;
  }
  
  .footer-column {
    min-width: 100%;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style>