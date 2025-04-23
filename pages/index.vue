<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Explore the World of <span>Modern Development</span></h1>
          <p class="hero-description">Discover insights, tutorials, and best practices from industry experts to elevate your development skills.</p>
          <div class="hero-actions">
            <button class="btn-primary">
              <Icon name="uil:rocket" />
              Get Started
            </button>
            <button class="btn-outline">
              <Icon name="uil:file-alt" />
              Browse Topics
            </button>
          </div>
        </div>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">200+</span>
            <span class="stat-label">Articles</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">50k+</span>
            <span class="stat-label">Readers</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">24</span>
            <span class="stat-label">Categories</span>
          </div>
        </div>
        <div class="scroll-indicator">
          <Icon name="uil:angle-down" />
        </div>
      </div>
    </section>
    
    <!-- Featured Blog Post -->
    <section class="featured-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Post</h2>
          <p class="section-description">Our carefully selected article of the week</p>
        </div>
        
        <div class="featured-post">
          <div class="featured-content">
            <div class="post-category">TRENDING</div>
            <h3 class="post-title">{{ featuredPost.title }}</h3>
            <p class="post-excerpt">{{ featuredPost.excerpt }}</p>
            <div class="post-meta">
              <div class="author-info">
                <img :src="featuredPost.authorAvatar" :alt="featuredPost.author" class="author-avatar">
                <span>{{ featuredPost.author }}</span>
              </div>
              <div class="post-date">
                <Icon name="uil:calendar-alt" />
                {{ formatDate(featuredPost.date) }}
              </div>
            </div>
            <NuxtLink :to="`/blog/${featuredPost.slug}`" class="post-link">
              Read Article
              <Icon name="uil:arrow-right" />
            </NuxtLink>
          </div>
          <div class="featured-image">
            <img :src="featuredPost.image" :alt="featuredPost.title">
            <div class="image-overlay"></div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Latest Blog Posts -->
    <section class="blog-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Latest Articles</h2>
          <p class="section-description">Stay updated with our newest content</p>
          <div class="filter-bar">
            <button 
              class="filter-button"
              :class="{ active: currentFilter === 'all' }"
              @click="currentFilter = 'all'"
            >
              All
            </button>
            <button 
              v-for="category in uniqueCategories" 
              :key="category"
              class="filter-button"
              :class="{ active: currentFilter === category }"
              @click="currentFilter = category"
            >
              {{ category }}
            </button>
          </div>
        </div>
        
        <div class="blog-grid">
          <div 
            v-for="blog in filteredBlogs" 
            :key="blog.id" 
            class="blog-card"
            @mouseover="hoveredBlog = blog.id"
            @mouseleave="hoveredBlog = null"
          >
            <div class="card-image">
              <img :src="blog.image" :alt="blog.title">
              <div class="image-overlay"></div>
              <div class="card-category">{{ blog.category }}</div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ blog.title }}</h3>
              <p class="card-excerpt">{{ blog.excerpt }}</p>
              <div class="card-meta">
                <div class="meta-author">
                  <Icon name="uil:user" />
                  {{ blog.author }}
                </div>
                <div class="meta-date">
                  <Icon name="uil:calendar-alt" />
                  {{ formatDate(blog.date) }}
                </div>
              </div>
              <NuxtLink :to="`/blog/${blog.slug}`" class="card-link" :class="{ 'hovered': hoveredBlog === blog.id }">
                Read More
                <Icon name="uil:arrow-right" class="link-icon" />
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <div class="pagination">
          <button class="pagination-button">
            <Icon name="uil:angle-left" />
          </button>
          <button class="pagination-button active">1</button>
          <button class="pagination-button">2</button>
          <button class="pagination-button">3</button>
          <span class="pagination-ellipsis">...</span>
          <button class="pagination-button">12</button>
          <button class="pagination-button">
            <Icon name="uil:angle-right" />
          </button>
        </div>
      </div>
    </section>
    
    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Explore Topics</h2>
          <p class="section-description">Browse content by categories that interest you</p>
        </div>
        
        <div class="categories-grid">
          <div 
            v-for="(category, index) in categories" 
            :key="index"
            class="category-card"
            :style="{ backgroundImage: `url(${category.image})` }"
          >
            <div class="category-content">
              <div class="category-icon">
                <Icon :name="category.icon" />
              </div>
              <h3 class="category-title">{{ category.name }}</h3>
              <p class="category-count">{{ category.count }} Articles</p>
            </div>
            <NuxtLink :to="`/blog/category/${category.slug}`" class="category-link">
              Explore
              <Icon name="uil:arrow-right" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-wrapper">
          <div class="newsletter-content">
            <h2>Stay in the Loop</h2>
            <p>Get the latest articles, tutorials, and updates delivered directly to your inbox.</p>
          </div>
          <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
            <div class="form-group">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                v-model="newsletterEmail"
                required
              >
              <button type="submit" class="submit-button">
                <span>Subscribe</span>
                <Icon name="uil:arrow-right" />
              </button>
            </div>
            <p class="privacy-text">No spam, we promise! Read our <a href="#">Privacy Policy</a></p>
          </form>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-wrapper">
          <div class="cta-content">
            <h2>Ready to Contribute?</h2>
            <p>Share your knowledge with our growing community. Become a contributor today!</p>
            <button class="cta-button">
              <Icon name="uil:edit" />
              Start Writing
            </button>
          </div>
          <div class="cta-image">
            <img src="https://picsum.photos/id/25/600/400" alt="Contribute to our blog">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Sample blog data (using existing data)
const blogs = ref([
  {
    id: 1,
    title: "Getting Started with Nuxt 3",
    slug: "getting-started-with-nuxt-3",
    excerpt: "Learn how to set up and create your first Nuxt 3 project with all the latest features.",
    image: "https://picsum.photos/id/0/800/600",
    date: "2025-04-10",
    author: "John Doe",
    category: "Development"
  },
  {
    id: 2,
    title: "SCSS Best Practices",
    slug: "scss-best-practices",
    excerpt: "Discover the best practices for organizing and writing efficient SCSS in your projects.",
    image: "https://picsum.photos/id/3/800/600",
    date: "2025-04-05",
    author: "Jane Smith",
    category: "Design"
  },
  {
    id: 3,
    title: "Modern Web Development Patterns",
    slug: "modern-web-development-patterns",
    excerpt: "Explore the latest patterns and practices in modern web development.",
    image: "https://picsum.photos/id/24/800/600",
    date: "2025-03-28",
    author: "Alex Johnson",
    category: "Architecture"
  },
  {
    id: 4,
    title: "Building Responsive UIs",
    slug: "building-responsive-uis",
    excerpt: "Tips and tricks for building beautiful, responsive user interfaces that work on any device.",
    image: "https://picsum.photos/id/60/800/600",
    date: "2025-03-20",
    author: "Sarah Williams",
    category: "UI/UX"
  },
  {
    id: 5,
    title: "API Integration Strategies",
    slug: "api-integration-strategies",
    excerpt: "Best approaches for integrating third-party APIs into your Nuxt applications.",
    image: "https://picsum.photos/id/48/800/600",
    date: "2025-03-15",
    author: "Mike Chen",
    category: "Backend"
  },
  {
    id: 6,
    title: "Performance Optimization Tips",
    slug: "performance-optimization-tips",
    excerpt: "Learn how to optimize your web application for maximum performance and user experience.",
    image: "https://picsum.photos/id/42/800/600",
    date: "2025-03-10",
    author: "Emma Davis",
    category: "Performance"
  }
]);

// State variables
const hoveredBlog = ref(null);
const currentFilter = ref('all');
const newsletterEmail = ref('');

// Featured post
const featuredPost = reactive({
  title: "The Future of Web Development: AI-Driven Applications",
  slug: "future-web-development-ai",
  excerpt: "Discover how artificial intelligence is revolutionizing the way we build web applications and what this means for developers in the coming years.",
  image: "https://picsum.photos/id/180/1200/600",
  date: "2025-04-12",
  author: "Maria Rodriguez",
  authorAvatar: "https://randomuser.me/api/portraits/women/64.jpg",
  category: "Technology"
});

// Categories
const categories = [
  {
    name: "Development",
    slug: "development",
    count: 42,
    icon: "uil:brackets-curly",
    image: "https://picsum.photos/id/1/500/300"
  },
  {
    name: "Design",
    slug: "design",
    count: 28,
    icon: "uil:palette",
    image: "https://picsum.photos/id/117/500/300"
  },
  {
    name: "UI/UX",
    slug: "ui-ux",
    count: 19,
    icon: "uil:layer-group",
    image: "https://picsum.photos/id/200/500/300"
  },
  {
    name: "Backend",
    slug: "backend",
    count: 31,
    icon: "uil:server",
    image: "https://picsum.photos/id/160/500/300"
  },
  {
    name: "Architecture",
    slug: "architecture",
    count: 15,
    icon: "uil:channel",
    image: "https://picsum.photos/id/6/500/300"
  },
  {
    name: "Performance",
    slug: "performance",
    count: 22,
    icon: "uil:tachometer-fast",
    image: "https://picsum.photos/id/64/500/300"
  }
];

// Get unique categories for filter
const uniqueCategories = computed(() => {
  return [...new Set(blogs.value.map(blog => blog.category))];
});

// Filter blogs by category
const filteredBlogs = computed(() => {
  if (currentFilter.value === 'all') {
    return blogs.value;
  } else {
    return blogs.value.filter(blog => blog.category === currentFilter.value);
  }
});

// Format date for display
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Newsletter subscription
const subscribeNewsletter = () => {
  // In a real app, this would call an API to handle subscription
  alert(`Thank you for subscribing with ${newsletterEmail.value}!`);
  newsletterEmail.value = '';
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

// Hero section
.hero-section {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
  background: linear-gradient(120deg, rgba($bg-primary, 0.9) 0%, rgba($gray-800, 0.9) 100%),
              url('https://picsum.photos/id/160/1920/1080') no-repeat center/cover;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, $green-soft, transparent);
    opacity: 0.5;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, $accent-primary, transparent);
    opacity: 0.5;
  }
  
  .hero-content {
    max-width: 800px;
    margin-bottom: 3rem;
    position: relative;
    
    .hero-title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: $text-white-light;
      font-weight: 800;
      
      span {
        background: linear-gradient(45deg, $accent-primary, $blue-bright);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: $primary-color;
        position: relative;
        display: inline-block;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, $accent-primary, transparent);
          opacity: 0.7;
        }
      }
    }
    
    .hero-description {
      font-size: 1.2rem;
      color: $text-secondary;
      margin-bottom: 2.5rem;
      max-width: 90%;
      line-height: 1.7;
    }
    
    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
  }
  
  .hero-stats {
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
    margin-top: 3rem;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: -1.5rem;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(to right, $border-color, transparent);
      opacity: 0.5;
    }
    
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      
      .stat-number {
        font-size: 2.2rem;
        font-weight: 700;
        background: linear-gradient(45deg, $text-white, $accent-primary);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.3rem;
      }
      
      .stat-label {
        color: $text-muted;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
  
  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    animation: bounce 2s infinite;
    color: $text-secondary;
    font-size: 2rem;
    cursor: pointer;
  }
}

// Featured section
.featured-section {
  padding: 5rem 0;
  background-color: $bg-primary;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to bottom, $bg-secondary, $bg-primary);
    opacity: 0.7;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  
  .section-title {
    font-size: 2.2rem;
    color: $text-white-light;
    margin-bottom: 0.5rem;
    position: relative;
    display: inline-block;
    font-weight: 700;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, $accent-primary, $blue-bright);
      border-radius: 3px;
    }
  }
  
  .section-description {
    color: $text-secondary;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  
  .filter-bar {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
    
    .filter-button {
      background: transparent;
      border: 1px solid $border-color;
      color: $text-secondary;
      padding: 0.5rem 1.2rem;
      border-radius: 50px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: $accent-primary;
        color: $text-white;
      }
      
      &.active {
        background-color: $accent-primary;
        color: $bg-primary;
        border-color: $accent-primary;
      }
    }
  }
}

.featured-post {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  background-color: $bg-secondary;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 30px $shadow-strong;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba($shadow-strong, 0.8);
  }
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    min-height: 450px;
  }
  
  .featured-content {
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    
    @media (min-width: 768px) {
      padding: 3.5rem;
    }
    
    .post-category {
      display: inline-block;
      background-color: rgba($orange-accent, 0.1);
      color: $orange-accent;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 1.5rem;
    }
    
    .post-title {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: $text-white-light;
      line-height: 1.3;
      font-weight: 700;
      
      @media (min-width: 768px) {
        font-size: 2.2rem;
      }
    }
    
    .post-excerpt {
      color: $text-secondary;
      margin-bottom: 2rem;
      line-height: 1.7;
      flex-grow: 1;
    }
    
    .post-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
      
      .author-info {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        
        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        span {
          color: $text-white-light;
          font-size: 0.95rem;
          font-weight: 500;
        }
      }
      
      .post-date {
        color: $text-muted;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }
    }
    
    .post-link {
      align-self: flex-start;
      color: $accent-primary;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      transition: all 0.3s;
      padding: 0.5rem 0;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: $accent-primary;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
      }
      
      &:hover {
        color: lighten($accent-primary, 10%);
        gap: 0.8rem;
        
        &::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      }
    }
  }
  
  .featured-image {
    position: relative;
    height: 250px;
    overflow: hidden;
    
    @media (min-width: 768px) {
      height: auto;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to right,
        rgba($bg-secondary, 0.8),
        transparent
      );
      
      @media (min-width: 768px) {
        background: linear-gradient(
          to right,
          rgba($bg-secondary, 0.95) 0%,
          rgba($bg-secondary, 0.5) 40%,
          transparent 100%
        );
      }
    }
  }
}

// Blog section
.blog-section {
  padding: 5rem 0;
  background-color: $bg-primary;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-card {
  background-color: $bg-secondary;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px $shadow-strong;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba($shadow-strong, 0.7);
    
    .card-image img {
      transform: scale(1.05);
    }
  }
  
  .card-image {
    position: relative;
    height: 200px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to top,
        rgba($bg-primary, 0.8),
        transparent 50%
      );
    }
    
    .card-category {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      background-color: rgba($bg-primary, 0.8);
      color: $text-white-light;
      padding: 0.3rem 0.8rem;
      border-radius: 50px;
      font-size: 0.8rem;
      backdrop-filter: blur(5px);
    }
  }
  
  .card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    
    .card-title {
      font-size: 1.3rem;
      color: $text-white-light;
      margin-bottom: 0.8rem;
      line-height: 1.4;
      transition: color 0.3s;
      
      &:hover {
        color: $accent-primary;
      }
    }
    
    .card-excerpt {
      color: $text-secondary;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
      line-height: 1.6;
      flex-grow: 1;
    }
    
    .card-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      color: $text-muted;
      font-size: 0.85rem;
      
      .meta-author, .meta-date {
        display: flex;
        align-items: center;
        gap: 0.3rem;
      }
    }
    
    .card-link {
      color: $text-secondary;
      text-decoration: none;
      text-transform: uppercase;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      align-self: flex-start;
      transition: all 0.3s;
      
      .link-icon {
        transition: transform 0.3s ease;
      }
      
      &.hovered {
        color: $accent-primary;
        
        .link-icon {
          transform: translateX(5px);
        }
      }
    }
  }
}

// Pagination
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
  
  .pagination-button {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $bg-secondary;
    border: none;
    color: $text-secondary;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background-color: $bg-tertiary;
      color: $text-white;
    }
    
    &.active {
      background-color: $accent-primary;
      color: $bg-primary;
    }
  }
  
  .pagination-ellipsis {
    color: $text-muted;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.3rem;
  }
}

// Categories section
.categories-section {
  padding: 5rem 0;
  background-color: $bg-secondary;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    left: -100px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba($accent-secondary, 0.05) 0%, transparent 70%);
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -150px;
    right: -150px;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba($accent-primary, 0.05) 0%, transparent 70%);
    z-index: 0;
  }
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.category-card {
  position: relative;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px $shadow-strong;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba($bg-primary, 0.9),
      rgba($bg-primary, 0.6)
    );
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba($shadow-strong, 0.7);
    
    .category-link {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .category-content {
    position: relative;
    z-index: 2;
    text-align: center;
    
    .category-icon {
      font-size: 2.5rem;
      color: $accent-primary;
      margin-bottom: 1rem;
    }
    
    .category-title {
      color: $text-white-light;
      margin-bottom: 0.5rem;
      font-size: 1.4rem;
      font-weight: 700;
    }
    
    .category-count {
      color: $text-secondary;
      font-size: 0.9rem;
    }
  }
  
  .category-link {
    position: absolute;
    bottom: 1.5rem;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2;
    color: $text-white;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 600;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }
}

// Newsletter section
.newsletter-section {
  padding: 5rem 0;
  background-color: $bg-primary;
}

.newsletter-wrapper {
  background: linear-gradient(180deg, rgba($bg-secondary, 1) 0%, rgba($bg-tertiary, 0.8) 100%);
  border-radius: 12px;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  box-shadow: 0 15px 30px $shadow-strong;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba($accent-primary, 0.1) 0%, transparent 70%);
    border-radius: 50%;
  }
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 3rem;
  }
  
  .newsletter-content {
    h2 {
      font-size: 2rem;
      color: $text-white-light;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    
    p {
      color: $text-secondary;
      font-size: 1.1rem;
      line-height: 1.7;
    }
  }
  
  .newsletter-form {
    .form-group {
      display: flex;
      width: 100%;
      position: relative;
      margin-bottom: 1rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
      
      input {
        flex-grow: 1;
        padding: 1rem 1.5rem;
        background-color: rgba($bg-tertiary, 0.8);
        border: 1px solid transparent;
        color: $text-white;
        font-size: 1rem;
        transition: all 0.3s;
        border-radius: 8px 0 0 8px;
        
        &:focus {
          outline: none;
          border-color: $accent-primary;
          background-color: rgba($bg-tertiary, 1);
          box-shadow: inset 0 0 0 1px $accent-primary;
        }
        
        &::placeholder {
          color: $text-muted;
        }
      }
      
      .submit-button {
        background: linear-gradient(45deg, $accent-primary, lighten($accent-primary, 10%));
        color: $bg-primary;
        border: none;
        padding: 1rem 1.8rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        &:hover {
          background: linear-gradient(45deg, lighten($accent-primary, 5%), lighten($accent-primary, 15%));
          box-shadow: 0 5px 15px rgba($accent-primary, 0.3);
        }
      }
    }
    
    .privacy-text {
      color: $text-muted;
      font-size: 0.85rem;
      text-align: center;
      
      a {
        color: $accent-secondary;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

// CTA section
.cta-section {
  padding: 5rem 0;
  background-color: $bg-secondary;
}

.cta-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  .cta-content {
    h2 {
      font-size: 2.2rem;
      color: $text-white-light;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    
    p {
      color: $text-secondary;
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 2rem;
    }
    
    .cta-button {
      background: linear-gradient(45deg, $accent-secondary, $blue-bright);
      color: $bg-primary;
      border: none;
      border-radius: 8px;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 8px 20px rgba($accent-secondary, 0.3);
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 25px rgba($accent-secondary, 0.4);
      }
      
      &:active {
        transform: translateY(-1px);
      }
    }
  }
  
  .cta-image {
    img {
      width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 15px 30px $shadow-strong;
    }
  }
}

// Button styles
.btn-primary {
  background: linear-gradient(45deg, $accent-primary, lighten($accent-primary, 10%));
  color: $bg-primary;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 20px rgba($accent-primary, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba($accent-primary, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
  }
}

.btn-outline {
  background-color: transparent;
  color: $text-white;
  border: 1px solid $text-white;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: rgba($text-white, 0.1);
    transform: translateY(-3px);
  }
  
  &:active {
    transform: translateY(-1px);
  }
}

// Animation
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-20px) translateX(-50%);
  }
  60% {
    transform: translateY(-10px) translateX(-50%);
  }
}
</style>