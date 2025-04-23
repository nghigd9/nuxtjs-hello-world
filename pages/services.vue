<template>
  <div class="services-page">
    <div class="container">
      <h1 class="page-title">Our Services</h1>
      <p class="page-description">
        Explore our comprehensive range of solutions designed to meet your needs.
      </p>
      
      <div class="services-grid">
        <div 
          v-for="service in services" 
          :key="service.id" 
          class="service-card"
          @click="navigateToService(service.id)"
        >
          <div class="service-icon">
            <Icon :name="service.icon" size="32" />
          </div>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>
          <div class="service-link">
            <span>Learn more</span>
            <Icon name="heroicons:arrow-right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Custom websites and web applications built with the latest technologies.',
    icon: 'heroicons:code-bracket'
  },
  {
    id: 2,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: 'heroicons:device-phone-mobile'
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description: 'User-centered design to create intuitive and engaging digital experiences.',
    icon: 'heroicons:paint-brush'
  },
  {
    id: 4,
    title: 'Cloud Services',
    description: 'Scalable cloud solutions to power your business infrastructure.',
    icon: 'heroicons:cloud'
  },
  {
    id: 5,
    title: 'DevOps',
    description: 'Streamline development operations with automation and continuous integration.',
    icon: 'heroicons:server'
  },
  {
    id: 6,
    title: 'Consulting',
    description: 'Expert guidance to help you navigate digital transformation.',
    icon: 'heroicons:light-bulb'
  }
];

const navigateToService = (id) => {
  router.push(`/services/${id}`);
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_variables.scss';

.services-page {
  padding: 3rem 0;
  background-color: $bg-primary;
  min-height: 100vh;
  
  .page-title {
    font-size: 2.5rem;
    color: $text-primary;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 600;
    background: linear-gradient(45deg, $accent-primary, $blue-bright);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .page-description {
    font-size: 1.2rem;
    color: $text-secondary;
    text-align: center;
    max-width: 700px;
    margin: 0 auto 3rem;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .service-card {
    background-color: $bg-secondary;
    border-radius: 12px;
    padding: 1.8rem;
    transition: all 0.3s ease;
    border: 1px solid $border-color;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, $accent-primary, $blue-bright);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease;
    }
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
      background-color: $bg-tertiary;
      border-color: $accent-primary;
      
      &::before {
        transform: scaleX(1);
      }
      
      .service-icon {
        background: linear-gradient(135deg, $accent-primary, $blue-deep);
        color: $text-white;
        box-shadow: 0 0 15px rgba($accent-primary, 0.5);
      }
      
      .service-link {
        color: $accent-primary;
        transform: translateX(5px);
      }
    }
    
    .service-icon {
      background-color: $bg-tertiary;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      color: $accent-primary;
      transition: all 0.3s ease;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }
    
    .service-title {
      font-size: 1.4rem;
      color: $text-primary;
      margin-bottom: 0.8rem;
      font-weight: 600;
    }
    
    .service-description {
      color: $text-secondary;
      margin-bottom: 1.8rem;
      line-height: 1.6;
    }
    
    .service-link {
      display: flex;
      align-items: center;
      color: $text-secondary;
      font-weight: 500;
      transition: all 0.3s ease;
      
      span {
        margin-right: 0.8rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .service-card {
    padding: 1.5rem;
    
    .service-icon {
      width: 60px;
      height: 60px;
    }
  }
}
</style>