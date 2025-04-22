<template>
  <div class="container">
    <div class="hello">
      Hello World from Nuxt 3 + SCSS!
    </div>
    
    <section class="blog-section">
      <h2 class="section-title">Latest Blog Posts</h2>
      
      <div class="blog-grid">
        <BlogCard 
          v-for="blog in blogs" 
          :key="blog.id" 
          :blog="blog" 
        />
      </div>
    </section>
  </div>
</template>

<script setup>
// Sample blog data
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
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.hello {
  color: $primary-color;
  font-size: 24px;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 3rem;
}

.blog-section {
  margin: 3rem 0 5rem;
}

.section-title {
  font-size: 2rem;
  color: $text-primary;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  
  &::after {
    content: "";
    display: block;
    width: 60px;
    height: 4px;
    background-color: $primary-color;
    margin: 0.5rem auto 0;
    border-radius: 2px;
  }
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

</style>