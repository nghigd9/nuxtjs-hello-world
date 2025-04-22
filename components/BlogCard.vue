<template>
  <div class="blog-card">
    <div class="blog-image">
      <img :src="blog.image" :alt="blog.title">
      <div class="blog-category">{{ blog.category }}</div>
    </div>
    
    <div class="blog-content">
      <h3 class="blog-title">
        <NuxtLink :to="`/blog/${blog.slug}`">{{ blog.title }}</NuxtLink>
      </h3>
      
      <div class="blog-meta">
        <span class="blog-date">{{ formatDate(blog.date) }}</span>
        <span class="blog-author">by {{ blog.author }}</span>
      </div>
      
      <p class="blog-excerpt">{{ blog.excerpt }}</p>
      
      <NuxtLink :to="`/blog/${blog.slug}`" class="read-more">
        Read More
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  blog: {
    type: Object,
    required: true
  }
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use 'sass:color';

.blog-card {
  background-color: $bg-secondary;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
}

.blog-image {
  position: relative;
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }
  
  .blog-category {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: $primary-color;
    color: $text-white;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 5px 10px;
    border-radius: 4px;
    text-transform: uppercase;
  }
}

.blog-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.blog-title {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  line-height: 1.4;
  
  a {
    color: $text-white-light;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: $primary-color;
    }
  }
}

.blog-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 0.85rem;
  color: $text-muted;
  margin-bottom: 1rem;
}

.blog-excerpt {
  color: $text-secondary;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
}

.read-more {
  align-self: flex-start;
  color: $primary-color;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: color 0.2s ease;
  
  &:hover {
    color: color.adjust($primary-color, $lightness: 10%);
    
    &::after {
      margin-left: 10px;
    }
  }
  
  &::after {
    content: "→";
    margin-left: 5px;
    transition: margin-left 0.2s ease;
  }
}
</style>