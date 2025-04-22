<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <NuxtLink to="/">
            <Icon name="logos:nuxt-icon" class="logo-icon" />
            <span>YourLogo</span>
          </NuxtLink>
        </div>
        
        <div class="header-actions">
          <button class="search-button" @click="toggleSearch" aria-label="Search">
            <Icon name="uil:search" class="icon-search" />
          </button>
          
          <button class="mobile-toggle" @click="toggleMenu" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <nav class="nav-menu" :class="{ 'is-open': isMenuOpen }">
          <ul>
            <li>
              <NuxtLink to="/">
                <Icon name="uil:home-alt" class="nav-icon" />
                <span>Home</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about">
                <Icon name="uil:info-circle" class="nav-icon" />
                <span>About</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services">
                <Icon name="uil:setting" class="nav-icon" />
                <span>Services</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact">
                <Icon name="uil:envelope" class="nav-icon" />
                <span>Contact</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
const isMenuOpen = ref(false);
const { toggleSearch } = useSearch();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Close menu when clicking outside on mobile
onMounted(() => {
  document.addEventListener('click', (event) => {
    const header = document.querySelector('.header');
    const isClickInside = header.contains(event.target);
    
    if (!isClickInside && isMenuOpen.value) {
      isMenuOpen.value = false;
    }
  });
});

// Clean up event listeners
onUnmounted(() => {
  // Nothing to clean up now that search modal is handled elsewhere
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use 'sass:color';

.header {
  background-color: $bg-secondary;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  
  a {
    color: $primary-color;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      color: color.adjust($primary-color, $lightness: -10%);
    }
  }
}

.logo-icon {
  font-size: 1.75rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-button {
  background: transparent;
  border: none;
  color: $text-secondary;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    color: $primary-color;
  }
  
  .icon-search {
    font-size: 1.5rem;
  }
}

.nav-menu {
  ul {
    display: flex;
    gap: 2rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    a {
      color: $text-secondary;
      text-decoration: none;
      transition: color 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      padding-bottom: 5px;
      
      &:hover {
        color: $primary-color;
      }
      
      &.router-link-active, &.router-link-exact-active {
        color: $primary-color;
        font-weight: 600;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: $primary-color;
          border-radius: 2px;
        }
        
        .nav-icon {
          transform: scale(1.1);
        }
      }
      
      .nav-icon {
        font-size: 1.25rem;
        transition: transform 0.2s ease;
      }
    }
  }
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: $primary-color;
    border-radius: 3px;
    transition: all 0.3s ease;
  }
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
    z-index: 101;
    
    &:hover span {
      background-color: color.adjust($primary-color, $lightness: -10%);
    }
  }
  
  .is-open + .mobile-toggle {
    span:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    
    span:nth-child(2) {
      opacity: 0;
    }
    
    span:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }
  }
  
  .nav-menu {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    background-color: $bg-tertiary;
    padding: 5rem 2rem 2rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    
    &.is-open {
      transform: translateX(0);
    }
    
    ul {
      flex-direction: column;
      gap: 1.5rem;
    }
    
    li a {
      font-size: 1.1rem;
      
      .nav-icon {
        font-size: 1.4rem;
        min-width: 24px;
      }
    }
  }
}
</style>