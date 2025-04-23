<template>
  <div class="container">
    <div class="blog-post-wrapper">
      <!-- Main Content Area -->
      <article class="blog-content">
        <div class="post-header">
          <div class="post-meta">
            <div class="categories">
              <NuxtLink 
                v-for="category in post.categories" 
                :key="category" 
                :to="`/blog/category/${category.toLowerCase().replace(' ', '-')}`"
                class="category-badge"
              >
                {{ category }}
              </NuxtLink>
            </div>
            
            <h1 class="post-title">{{ post.title }}</h1>
            
            <div class="post-info">
              <div class="author-info">
                <img :src="post.author.avatar" :alt="post.author.name" class="author-avatar" />
                <div>
                  <span class="author-name">{{ post.author.name }}</span>
                  <span class="post-date">
                    <Icon name="uil:calendar-alt" />
                    {{ formatDate(post.publishedAt) }}
                  </span>
                </div>
              </div>
              
              <div class="post-stats">
                <span class="stat">
                  <Icon name="uil:eye" />
                  {{ post.views }} views
                </span>
                <span class="stat">
                  <Icon name="uil:clock" />
                  {{ post.readingTime }} min read
                </span>
              </div>
            </div>
          </div>
          
          <div class="featured-image">
            <img :src="post.featuredImage" :alt="post.title" />
            <div class="image-caption" v-if="post.imageCaption">{{ post.imageCaption }}</div>
          </div>
        </div>
        
        <div class="post-content">
          <p class="lead">{{ post.excerpt }}</p>
          
          <div v-html="post.content"></div>
          
          <!-- Code block example -->
          <div class="code-block">
            <div class="code-header">
              <span>Example.js</span>
              <button class="copy-button">
                <Icon name="uil:copy" />
                Copy
              </button>
            </div>
            <pre><code>function hello() {
  console.log("Hello, world!");
  return true;
}</code></pre>
          </div>
          
          <!-- Blockquote -->
          <blockquote>
            <p>"{{ post.quote.text }}"</p>
            <footer>— {{ post.quote.author }}</footer>
          </blockquote>
          
          <h2>Key Takeaways</h2>
          <ul class="takeaways">
            <li v-for="(takeaway, index) in post.takeaways" :key="index">
              <Icon name="uil:check-circle" class="takeaway-icon" />
              <span>{{ takeaway }}</span>
            </li>
          </ul>
        </div>
        
        <div class="post-tags">
          <span class="tags-label">Tagged with:</span>
          <div class="tags-list">
            <NuxtLink 
              v-for="tag in post.tags" 
              :key="tag" 
              :to="`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`"
              class="tag"
            >
              #{{ tag }}
            </NuxtLink>
          </div>
        </div>
        
        <div class="post-footer">
          <div class="social-share">
            <span>Share this article:</span>
            <div class="share-buttons">
              <a href="#" @click.prevent="shareOnTwitter" aria-label="Share on Twitter">
                <Icon name="uil:twitter" />
              </a>
              <a href="#" @click.prevent="shareOnFacebook" aria-label="Share on Facebook">
                <Icon name="uil:facebook" />
              </a>
              <a href="#" @click.prevent="shareOnLinkedIn" aria-label="Share on LinkedIn">
                <Icon name="uil:linkedin" />
              </a>
              <a href="#" @click.prevent="copyLink" aria-label="Copy link">
                <Icon name="uil:link" />
              </a>
            </div>
          </div>
          
          <div class="post-actions">
            <button class="action-button like">
              <Icon name="uil:heart" />
              <span>{{ post.likes }}</span>
            </button>
            <button class="action-button bookmark">
              <Icon name="uil:bookmark" />
            </button>
            <button class="action-button comments">
              <Icon name="uil:comment" />
              <span>{{ post.comments.length }}</span>
            </button>
          </div>
        </div>
        
        <div class="about-author">
          <img :src="post.author.avatar" :alt="post.author.name" class="author-avatar-large" />
          <div class="author-bio">
            <h3>{{ post.author.name }}</h3>
            <p class="author-title">{{ post.author.title }}</p>
            <p>{{ post.author.bio }}</p>
            <div class="author-social">
              <a v-for="(link, network) in post.author.social" :key="network" :href="link" target="_blank">
                <Icon :name="`uil:${network}`" />
              </a>
            </div>
          </div>
        </div>
        
        <div class="post-comments">
          <h2>Comments ({{ post.comments.length }})</h2>
          <div class="comment" v-for="(comment, index) in post.comments" :key="index">
            <img :src="comment.avatar" :alt="comment.name" class="comment-avatar" />
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-author">{{ comment.name }}</span>
                <span class="comment-date">{{ formatDate(comment.date) }}</span>
              </div>
              <p>{{ comment.content }}</p>
              <div class="comment-actions">
                <button class="comment-action">
                  <Icon name="uil:thumbs-up" />
                  <span>{{ comment.likes }}</span>
                </button>
                <button class="comment-action">
                  <Icon name="uil:reply" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
          
          <div class="comment-form">
            <h3>Leave a comment</h3>
            <form @submit.prevent="submitComment">
              <div class="form-group">
                <label for="comment">Your message</label>
                <textarea id="comment" rows="4" placeholder="Write your comment..." v-model="newComment"></textarea>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="name">Your name</label>
                  <input type="text" id="name" placeholder="Enter your name" v-model="commentName" />
                </div>
                <div class="form-group">
                  <label for="email">Your email</label>
                  <input type="email" id="email" placeholder="Enter your email" v-model="commentEmail" />
                </div>
              </div>
              <button type="submit" class="submit-button">
                <Icon name="uil:message" />
                Post Comment
              </button>
            </form>
          </div>
        </div>
        
        <div class="post-navigation">
          <NuxtLink to="/blog/previous-post" class="prev-post" v-if="post.prevPost">
            <span class="nav-label">
              <Icon name="uil:arrow-left" />
              Previous Article
            </span>
            <span class="nav-title">{{ post.prevPost.title }}</span>
          </NuxtLink>
          <div class="spacer" v-if="post.prevPost && post.nextPost"></div>
          <NuxtLink to="/blog/next-post" class="next-post" v-if="post.nextPost">
            <span class="nav-label">
              Next Article
              <Icon name="uil:arrow-right" />
            </span>
            <span class="nav-title">{{ post.nextPost.title }}</span>
          </NuxtLink>
        </div>
      </article>
      
      <!-- Sidebar -->
      <aside class="blog-sidebar">
        <div class="sidebar-section author-card">
          <img :src="post.author.avatar" :alt="post.author.name" class="author-avatar" />
          <h3>{{ post.author.name }}</h3>
          <p class="author-title">{{ post.author.title }}</p>
          <button class="follow-button">
            <Icon name="uil:plus" />
            Follow
          </button>
        </div>
        
        <div class="sidebar-section table-of-contents">
          <h3>Table of Contents</h3>
          <ul>
            <li v-for="(item, index) in post.tableOfContents" :key="index">
              <a :href="`#${item.anchor}`" :class="{ 'subheading': item.level > 2 }">
                {{ item.title }}
              </a>
            </li>
          </ul>
        </div>
        
        <div class="sidebar-section similar-posts">
          <h3>Similar Posts</h3>
          <div class="similar-post" v-for="(similar, index) in similarPosts" :key="index">
            <NuxtLink :to="`/blog/${similar.slug}`">
              <img :src="similar.image" :alt="similar.title" class="similar-post-image" />
              <h4>{{ similar.title }}</h4>
            </NuxtLink>
            <div class="similar-post-meta">
              <span class="similar-post-date">
                <Icon name="uil:calendar-alt" />
                {{ formatDate(similar.date) }}
              </span>
              <span class="similar-post-views">
                <Icon name="uil:eye" />
                {{ similar.views }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="sidebar-section popular-tags">
          <h3>Popular Tags</h3>
          <div class="tags-cloud">
            <NuxtLink 
              v-for="(tag, index) in popularTags" 
              :key="index"
              :to="`/blog/tag/${tag.name.toLowerCase().replace(' ', '-')}`"
              class="tag"
              :style="{ fontSize: `${tag.size}rem` }"
            >
              #{{ tag.name }}
            </NuxtLink>
          </div>
        </div>
        
        <div class="sidebar-section newsletter">
          <h3>Newsletter</h3>
          <p>Get the latest posts delivered to your inbox</p>
          <form @submit.prevent="subscribeNewsletter">
            <div class="form-group">
              <input type="email" placeholder="Your email address" v-model="newsletterEmail" />
              <button type="submit">
                <Icon name="uil:arrow-right" />
              </button>
            </div>
          </form>
          <p class="newsletter-note">No spam ever, we promise</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const slug = route.params.slug;

// Form data
const newComment = ref('');
const commentName = ref('');
const commentEmail = ref('');
const newsletterEmail = ref('');

// Fetch blog post data
// In a real app, this would be an API call using the slug
const post = reactive({
  title: "Understanding Modern JavaScript Features: ES6 and Beyond",
  slug: "understanding-modern-javascript-features",
  excerpt: "Explore the powerful features introduced in ES6 (ECMAScript 2015) and later versions that have transformed how we write JavaScript.",
  publishedAt: "2023-11-15T08:30:00Z",
  readingTime: 8,
  views: 3542,
  likes: 218,
  featuredImage: "https://picsum.photos/id/0/1200/600",
  imageCaption: "JavaScript code on a modern laptop screen",
  categories: ["Development", "JavaScript"],
  tags: ["JavaScript", "ES6", "Web Development", "Programming", "Frontend"],
  author: {
    name: "Alex Morgan",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Senior Frontend Developer",
    bio: "Alex has been developing web applications for over 8 years, specializing in JavaScript and modern frameworks. She loves teaching and sharing her knowledge through writing.",
    social: {
      twitter: "https://twitter.com/alexmorgan",
      github: "https://github.com/alexmorgan",
      linkedin: "https://linkedin.com/in/alexmorgan"
    }
  },
  content: `<p>JavaScript has evolved dramatically since the introduction of ES6 (ECMAScript 2015). These modern features have made the language more powerful, expressive, and developer-friendly.</p>
            <h2>Arrow Functions</h2>
            <p>Arrow functions provide a more concise syntax for writing functions and automatically bind the current scope, solving many traditional issues with 'this'.</p>
            <h2>Destructuring Assignment</h2>
            <p>Destructuring allows you to extract values from objects and arrays in a more elegant way, making your code cleaner and more readable.</p>
            <h2>Spread and Rest Operators</h2>
            <p>These versatile operators let you work with iterables like arrays in more flexible ways, from combining arrays to gathering function arguments.</p>`,
  quote: {
    text: "Good code is its own best documentation. As you're about to add a comment, ask yourself, 'How can I improve the code so that this comment isn't needed?'",
    author: "Steve McConnell"
  },
  takeaways: [
    "ES6 features make JavaScript code more concise and readable",
    "Arrow functions solve common scoping issues",
    "Destructuring simplifies working with complex data structures",
    "Modern JavaScript enhances developer productivity"
  ],
  tableOfContents: [
    { title: "Introduction", anchor: "introduction", level: 2 },
    { title: "Arrow Functions", anchor: "arrow-functions", level: 2 },
    { title: "Basic Syntax", anchor: "basic-syntax", level: 3 },
    { title: "Implicit Returns", anchor: "implicit-returns", level: 3 },
    { title: "Destructuring Assignment", anchor: "destructuring-assignment", level: 2 },
    { title: "Spread and Rest Operators", anchor: "spread-and-rest-operators", level: 2 },
    { title: "Conclusion", anchor: "conclusion", level: 2 }
  ],
  comments: [
    {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      date: "2023-11-16T10:24:00Z",
      content: "Great overview! I found the section on destructuring particularly helpful as I've been trying to make my code cleaner. Would love to see a follow-up on async/await patterns.",
      likes: 12
    },
    {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      date: "2023-11-16T14:45:00Z",
      content: "I've been using these features for a while now, but I never fully understood the spread operator until reading your explanation. Thanks for making it so clear!",
      likes: 8
    }
  ],
  prevPost: {
    title: "Building Responsive Layouts with CSS Grid",
    slug: "building-responsive-layouts-css-grid"
  },
  nextPost: {
    title: "Getting Started with TypeScript: A Beginner's Guide",
    slug: "getting-started-with-typescript"
  }
});

// Similar posts data
const similarPosts = [
  {
    title: "10 JavaScript One-Liners That Will Impress Your Colleagues",
    slug: "javascript-one-liners",
    image: "https://picsum.photos/id/180/300/200",
    date: "2023-11-10T14:30:00Z",
    views: 2541
  },
  {
    title: "Mastering Async/Await in JavaScript",
    slug: "mastering-async-await-javascript",
    image: "https://picsum.photos/id/0/300/200",
    date: "2023-11-05T09:15:00Z",
    views: 3127
  },
  {
    title: "The Complete Guide to ES6 Modules",
    slug: "complete-guide-es6-modules",
    image: "https://picsum.photos/id/48/300/200",
    date: "2023-10-28T11:45:00Z",
    views: 1892
  },
  {
    title: "JavaScript Design Patterns You Should Know",
    slug: "javascript-design-patterns",
    image: "https://picsum.photos/id/160/300/200",
    date: "2023-10-22T16:20:00Z",
    views: 2364
  }
];

// Popular tags
const popularTags = [
  { name: "JavaScript", size: 1.4 },
  { name: "CSS", size: 1.2 },
  { name: "React", size: 1.3 },
  { name: "Vue", size: 1.1 },
  { name: "HTML", size: 1.0 },
  { name: "Frontend", size: 1.2 },
  { name: "TypeScript", size: 1.1 },
  { name: "WebDev", size: 1.3 },
  { name: "Coding", size: 1.0 },
  { name: "Programming", size: 1.2 }
];

// Helper function to format dates
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Social sharing functions
const shareOnTwitter = () => {
  const text = `Check out this article: ${post.title}`;
  const url = window.location.href;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
};

const shareOnFacebook = () => {
  const url = window.location.href;
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
};

const shareOnLinkedIn = () => {
  const url = window.location.href;
  const title = post.title;
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
};

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
  alert('Link copied to clipboard!');
};

// Form submission methods
const submitComment = () => {
  if (!newComment.value || !commentName.value || !commentEmail.value) {
    alert('Please fill in all fields');
    return;
  }
  
  // Add comment to the list (in a real app, this would be an API call)
  post.comments.push({
    name: commentName.value,
    avatar: "https://randomuser.me/api/portraits/lego/1.jpg", // Default avatar
    date: new Date().toISOString(),
    content: newComment.value,
    likes: 0
  });
  
  // Reset form
  newComment.value = '';
  commentName.value = '';
  commentEmail.value = '';
  
  alert('Comment submitted successfully!');
};

const subscribeNewsletter = () => {
  if (!newsletterEmail.value) {
    alert('Please enter your email');
    return;
  }
  
  // In a real app, this would be an API call
  alert(`Thank you for subscribing with ${newsletterEmail.value}!`);
  newsletterEmail.value = '';
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.blog-post-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 2fr 1fr;
  }
}

// Main Content Styles
.blog-content {
  background-color: $bg-secondary;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.post-header {
  .post-meta {
    padding: 2rem 2rem 0;
  }
  
  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.2rem;
    
    .category-badge {
      background: linear-gradient(45deg, rgba($accent-primary, 0.2), rgba($accent-secondary, 0.2));
      color: $accent-primary;
      padding: 0.4rem 1rem;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        background: linear-gradient(45deg, rgba($accent-primary, 0.3), rgba($accent-secondary, 0.3));
        transform: translateY(-2px);
      }
    }
  }
  
  .post-title {
    font-size: 2.5rem;
    margin: 0 0 1.5rem;
    line-height: 1.2;
    color: $text-white-light;
    
    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }
  
  .post-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    
    .author-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .author-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      div {
        display: flex;
        flex-direction: column;
        
        .author-name {
          color: $text-white-light;
          font-weight: 600;
        }
        
        .post-date {
          color: $text-secondary;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
      }
    }
    
    .post-stats {
      display: flex;
      gap: 1.2rem;
      
      .stat {
        color: $text-secondary;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }
    }
  }
  
  .featured-image {
    width: 100%;
    position: relative;
    
    img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    .image-caption {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: linear-gradient(to top, rgba($bg-primary, 0.9), transparent);
      color: $text-secondary;
      padding: 3rem 2rem 1rem;
      font-size: 0.9rem;
      font-style: italic;
    }
  }
}

.post-content {
  padding: 2rem;
  color: $text-secondary;
  line-height: 1.7;
  
  .lead {
    font-size: 1.2rem;
    color: $text-white-light;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid $border-color;
  }
  
  h2 {
    color: $text-white-light;
    font-size: 1.8rem;
    margin: 2.5rem 0 1rem;
  }
  
  h3 {
    color: $text-white-light;
    font-size: 1.4rem;
    margin: 2rem 0 1rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  .code-block {
    margin: 2rem 0;
    background-color: $bg-tertiary;
    border-radius: 8px;
    overflow: hidden;
    
    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.7rem 1.2rem;
      background-color: darken($bg-tertiary, 3%);
      color: $text-secondary;
      font-family: monospace;
      font-size: 0.9rem;
      
      .copy-button {
        background-color: transparent;
        border: none;
        color: $text-secondary;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        cursor: pointer;
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
        transition: all 0.2s ease;
        
        &:hover {
          background-color: rgba($bg-primary, 0.4);
          color: $text-white-light;
        }
      }
    }
    
    pre {
      padding: 1.2rem;
      margin: 0;
      overflow-x: auto;
      font-family: monospace;
      
      code {
        color: $syntax-string;
      }
    }
  }
  
  blockquote {
    margin: 2rem 0;
    padding: 1.5rem 2rem;
    border-left: 4px solid $accent-primary;
    background-color: rgba($bg-tertiary, 0.5);
    border-radius: 0 8px 8px 0;
    
    p {
      color: $text-white-light;
      font-style: italic;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    
    footer {
      color: $text-secondary;
    }
  }
  
  .takeaways {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    
    li {
      display: flex;
      align-items: flex-start;
      gap: 0.8rem;
      margin-bottom: 0.8rem;
      padding: 0.5rem 0;
      
      .takeaway-icon {
        color: $success;
        font-size: 1.3rem;
        flex-shrink: 0;
      }
    }
  }
}

.post-tags {
  padding: 2rem;
  border-top: 1px solid $border-color;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  
  .tags-label {
    color: $text-secondary;
    font-size: 0.9rem;
  }
  
  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    .tag {
      color: $accent-secondary;
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.2s;
      
      &:hover {
        color: lighten($accent-secondary, 10%);
        transform: translateY(-2px);
      }
    }
  }
}

.post-footer {
  padding: 1.5rem 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  background-color: rgba($bg-tertiary, 0.5);
  
  .social-share {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: $text-secondary;
    
    .share-buttons {
      display: flex;
      gap: 0.7rem;
      
      a {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $text-secondary;
        background-color: rgba($bg-tertiary, 0.8);
        border-radius: 50%;
        transition: all 0.2s ease;
        
        &:hover {
          color: $text-white-light;
          background-color: $bg-tertiary;
          transform: translateY(-2px);
        }
      }
    }
  }
  
  .post-actions {
    display: flex;
    gap: 0.8rem;
    
    .action-button {
      background-color: transparent;
      border: none;
      color: $text-secondary;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      padding: 0.5rem 0.8rem;
      border-radius: 50px;
      transition: all 0.2s;
      
      &:hover {
        background-color: rgba($bg-tertiary, 0.8);
        color: $text-white-light;
      }
      
      &.like:hover {
        color: $error;
      }
    }
  }
}

.about-author {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border-top: 1px solid $border-color;
  text-align: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }
  
  .author-avatar-large {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid $border-color;
  }
  
  .author-bio {
    h3 {
      color: $text-white-light;
      margin: 0 0 0.3rem;
      font-size: 1.4rem;
    }
    
    .author-title {
      color: $accent-primary;
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }
    
    p {
      color: $text-secondary;
      margin-bottom: 1.2rem;
    }
    
    .author-social {
      display: flex;
      gap: 1rem;
      justify-content: center;
      
      @media (min-width: 768px) {
        justify-content: flex-start;
      }
      
      a {
        width: 36px;
        height: 36px;
        background-color: $bg-tertiary;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $text-secondary;
        transition: all 0.3s;
        
        &:hover {
          color: $text-white-light;
          transform: translateY(-3px);
          
          &:nth-child(1) {
            background-color: #1da1f2; // Twitter
          }
          &:nth-child(2) {
            background-color: #24292e; // GitHub
          }
          &:nth-child(3) {
            background-color: #0077b5; // LinkedIn
          }
        }
      }
    }
  }
}

.post-comments {
  padding: 2.5rem;
  border-top: 1px solid $border-color;
  
  h2 {
    color: $text-white-light;
    margin-bottom: 2rem;
    font-size: 1.8rem;
  }
  
  .comment {
    display: flex;
    gap: 1.5rem;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid rgba($border-color, 0.5);
    
    .comment-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    
    .comment-content {
      flex-grow: 1;
      
      .comment-header {
        margin-bottom: 0.7rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        
        .comment-author {
          color: $text-white-light;
          font-weight: 600;
        }
        
        .comment-date {
          color: $text-muted;
          font-size: 0.9rem;
        }
      }
      
      p {
        color: $text-secondary;
        margin-bottom: 1rem;
        line-height: 1.6;
      }
      
      .comment-actions {
        display: flex;
        gap: 1.5rem;
        
        .comment-action {
          background: transparent;
          border: none;
          color: $text-muted;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          cursor: pointer;
          padding: 0.4rem 0;
          transition: all 0.2s;
          
          &:hover {
            color: $text-white-light;
          }
        }
      }
    }
  }
  
  .comment-form {
    background-color: rgba($bg-tertiary, 0.3);
    padding: 2rem;
    border-radius: 8px;
    
    h3 {
      color: $text-white-light;
      margin-bottom: 1.5rem;
      font-size: 1.4rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      label {
        display: block;
        color: $text-secondary;
        margin-bottom: 0.6rem;
        font-weight: 600;
      }
      
      input, textarea {
        width: 100%;
        background-color: rgba($bg-tertiary, 0.7);
        border: 2px solid $border-color;
        border-radius: 8px;
        padding: 0.9rem 1.2rem;
        color: $text-white;
        font-size: 1rem;
        transition: all 0.3s;
        
        &:focus {
          outline: none;
          border-color: $primary-color;
          box-shadow: 0 0 0 3px rgba($primary-color, 0.2);
        }
        
        &::placeholder {
          color: $text-muted;
        }
      }
      
      textarea {
        resize: vertical;
      }
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      
      @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .submit-button {
      background: linear-gradient(45deg, $primary-color, lighten($primary-color, 10%));
      color: $bg-primary;
      border: none;
      border-radius: 8px;
      padding: 0.9rem 1.5rem;
      font-weight: 600;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.7rem;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba($primary-color, 0.3);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
}

.post-navigation {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 2.5rem;
  border-top: 1px solid $border-color;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  a {
    padding: 1.5rem;
    border-radius: 8px;
    background-color: rgba($bg-tertiary, 0.3);
    text-decoration: none;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    
    &:hover {
      background-color: rgba($bg-tertiary, 0.6);
      transform: translateY(-3px);
    }
  }
  
  .prev-post {
    .nav-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: $text-secondary;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    
    .nav-title {
      color: $text-white-light;
      font-weight: 600;
    }
  }
  
  .next-post {
    text-align: right;
    
    .nav-label {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5rem;
      color: $text-secondary;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    
    .nav-title {
      color: $text-white-light;
      font-weight: 600;
    }
  }
  
  .spacer {
    width: 1px;
    height: 100%;
    background-color: $border-color;
    margin: 0 1rem;
  }
}

// Sidebar Styles
.blog-sidebar {
  align-self: start;
  position: sticky;
  top: 2rem;
}

.sidebar-section {
  background-color: $bg-secondary;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  
  h3 {
    color: $text-white-light;
    margin: 0 0 1.5rem;
    font-size: 1.2rem;
    font-weight: 600;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid rgba($border-color, 0.5);
    position: relative;
    
    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 50px;
      height: 2px;
      background-color: $primary-color;
    }
  }
}

.author-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  .author-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid $primary-color;
    margin-bottom: 1.2rem;
  }
  
  h3 {
    border: none;
    padding: 0;
    margin-bottom: 0.3rem;
    
    &::after {
      display: none;
    }
  }
  
  .author-title {
    color: $text-secondary;
    margin-bottom: 1.5rem;
  }
  
  .follow-button {
    background-color: $primary-color;
    color: $bg-primary;
    border: none;
    border-radius: 50px;
    padding: 0.7rem 1.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      background-color: lighten($primary-color, 5%);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba($primary-color, 0.3);
    }
  }
}

.table-of-contents {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 0.8rem;
      
      a {
        color: $text-secondary;
        text-decoration: none;
        transition: all 0.2s;
        display: block;
        padding: 0.5rem 0;
        border-left: 2px solid transparent;
        padding-left: 0.8rem;
        
        &.subheading {
          padding-left: 2rem;
          font-size: 0.95rem;
          color: $text-muted;
        }
        
        &:hover {
          color: $text-white-light;
          border-left-color: $primary-color;
        }
      }
    }
  }
}

.similar-posts {
  .similar-post {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba($border-color, 0.5);
    
    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border: none;
    }
    
    a {
      display: block;
      text-decoration: none;
      margin-bottom: 0.7rem;
      
      &:hover {
        h4 {
          color: $primary-color;
        }
        
        .similar-post-image {
          transform: scale(1.05);
        }
      }
      
      .similar-post-image {
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 1rem;
        transition: transform 0.3s ease;
      }
      
      h4 {
        color: $text-white-light;
        margin: 0;
        font-size: 1.1rem;
        line-height: 1.4;
        transition: color 0.2s;
      }
    }
    
    .similar-post-meta {
      display: flex;
      justify-content: space-between;
      
      span {
        color: $text-muted;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
      }
    }
  }
}

.popular-tags {
  .tags-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    
    .tag {
      color: $accent-primary;
      text-decoration: none;
      transition: all 0.2s;
      
      &:hover {
        color: lighten($accent-primary, 15%);
        transform: scale(1.1);
      }
    }
  }
}

.newsletter {
  p {
    color: $text-secondary;
    margin-bottom: 1.2rem;
  }
  
  .form-group {
    position: relative;
    
    input {
      width: 100%;
      background-color: rgba($bg-tertiary, 0.7);
      border: 2px solid $border-color;
      border-radius: 50px;
      padding: 0.8rem 1rem;
      padding-right: 3rem;
      color: $text-white;
      transition: all 0.3s;
      
      &:focus {
        outline: none;
        border-color: $primary-color;
        box-shadow: 0 0 0 3px rgba($primary-color, 0.2);
      }
      
      &::placeholder {
        color: $text-muted;
      }
    }
    
    button {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      background-color: $primary-color;
      color: $bg-primary;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        background-color: lighten($primary-color, 5%);
        transform: translateY(-50%) scale(1.05);
      }
    }
  }
  
  .newsletter-note {
    text-align: center;
    color: $text-muted;
    font-size: 0.85rem;
    margin-top: 1rem;
  }
}
</style>