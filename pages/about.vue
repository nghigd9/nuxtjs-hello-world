<template>
  <div class="container">
    <section class="about-hero">
      <h1 class="about-title">About Our Company</h1>
      <p class="about-subtitle">Get to know who we are and what drives us</p>
    </section>
    
    <section class="about-section">
      <h2 class="section-title">Our Story</h2>
      <div class="about-content">
        <div class="about-image">
          <img src="https://picsum.photos/id/28/800/600" alt="Our office">
        </div>
        <div class="about-text">
          <p>Founded in 2020, our company has been at the forefront of web development innovation. We started with a simple mission: to create beautiful, functional websites that deliver real value to our clients.</p>
          <p>Over the years, we've grown from a small team of passionate developers to a full-service digital agency with expertise across the entire web development spectrum.</p>
          <p>Today, we're proud to work with clients from various industries, helping them achieve their digital goals through custom web solutions that stand out in a crowded online world.</p>
        </div>
      </div>
    </section>
    
    <section class="about-section">
      <h2 class="section-title">Our Team</h2>
      <div class="team-grid">
        <div class="team-member" v-for="member in team" :key="member.id">
          <div class="member-image">
            <img :src="member.photo" :alt="member.name">
          </div>
          <h3 class="member-name">{{ member.name }}</h3>
          <p class="member-title">{{ member.position }}</p>
          <p class="member-bio">{{ member.bio }}</p>
          <div class="member-social">
            <a v-for="social in member.social" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer">
              <Icon :name="social.icon" class="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <section class="about-section">
      <h2 class="section-title">Our Values</h2>
      <div class="values-grid">
        <div class="value-item" v-for="(value, index) in values" :key="index">
          <div class="value-icon">
            <Icon :name="value.icon" class="value-icon-svg" />
          </div>
          <h3>{{ value.title }}</h3>
          <p>{{ value.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Sample team members
const team = ref([
  {
    id: 1,
    name: "Alex Johnson",
    position: "Founder & CEO",
    bio: "Alex has over 15 years of experience in web development and has led numerous successful projects.",
    photo: "https://picsum.photos/id/1005/300/300",
    social: [
      { name: "twitter", icon: "uil:twitter", url: "#" },
      { name: "linkedin", icon: "uil:linkedin", url: "#" },
      { name: "github", icon: "uil:github", url: "#" }
    ]
  },
  {
    id: 2,
    name: "Sarah Williams",
    position: "Lead Designer",
    bio: "Sarah brings creative vision and user-centered design principles to every project she works on.",
    photo: "https://picsum.photos/id/1011/300/300",
    social: [
      { name: "twitter", icon: "uil:twitter", url: "#" },
      { name: "dribbble", icon: "uil:dribbble", url: "#" }
    ]
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "Full Stack Developer",
    bio: "Michael is passionate about creating clean, efficient code and staying on top of emerging technologies.",
    photo: "https://picsum.photos/id/1012/300/300",
    social: [
      { name: "github", icon: "uil:github", url: "#" },
      { name: "linkedin", icon: "uil:linkedin", url: "#" }
    ]
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    position: "Project Manager",
    bio: "Emily ensures projects are delivered on time and within scope while maintaining clear client communication.",
    photo: "https://picsum.photos/id/1027/300/300",
    social: [
      { name: "linkedin", icon: "uil:linkedin", url: "#" },
      { name: "twitter", icon: "uil:twitter", url: "#" }
    ]
  }
]);

// Company values
const values = ref([
  {
    icon: "uil:star",
    title: "Excellence",
    description: "We strive for excellence in every aspect of our work, from code quality to client relationships."
  },
  {
    icon: "uil:heart",
    title: "Passion",
    description: "Our team brings enthusiasm and dedication to every project, fueling innovation and creative solutions."
  },
  {
    icon: "uil:users-alt",
    title: "Collaboration",
    description: "We believe in the power of teamwork and partnership, both internally and with our clients."
  },
  {
    icon: "uil:shield",
    title: "Integrity",
    description: "Honesty and transparency are foundational to how we conduct business and build trust."
  },
  {
    icon: "uil:arrow-growth",
    title: "Continuous Growth",
    description: "We're committed to learning and improving, staying ahead of industry trends and technologies."
  },
  {
    icon: "uil:smile",
    title: "Client Satisfaction",
    description: "Our ultimate goal is to exceed expectations and deliver results that make our clients happy."
  }
]);
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.about-hero {
  text-align: center;
  padding: 4rem 0 2rem;
  background-color: $bg-primary;
  border-radius: 8px;
  color: $text-white;
  margin-bottom: 3rem;
}

.about-title {
  font-size: 2.5rem;
  margin: 0;
  color: $primary-color;
}

.about-subtitle {
  font-size: 1.2rem;
  margin-top: 1rem;
  color: $text-secondary;
}

.about-section {
  margin-bottom: 4rem;
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

.about-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.about-image {
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
}

.about-text {
  p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    color: $text-primary;
    font-size: 1.1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.team-member {
  background-color: $bg-secondary;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
}

.member-image {
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }
}

.member-name {
  margin: 1rem 0 0.25rem;
  padding: 0 1rem;
  font-size: 1.25rem;
  color: $text-white-light;
}

.member-title {
  padding: 0 1rem;
  color: $primary-color;
  font-weight: bold;
  margin: 0 0 0.75rem;
}

.member-bio {
  padding: 0 1rem;
  color: $text-secondary;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.member-social {
  display: flex;
  padding: 0 1rem 1rem;
  gap: 1rem;
  
  a {
    color: $text-secondary;
    transition: color 0.2s ease;
    
    &:hover {
      color: $primary-color;
    }
    
    .social-icon {
      font-size: 1.2rem;
    }
  }
}

.values-grid {
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

.value-item {
  background-color: $bg-secondary;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    
    .value-icon {
      background-color: $primary-color;
      color: $text-white;
    }
  }
  
  h3 {
    color: $text-white-light;
    margin: 1rem 0 0.5rem;
  }
  
  p {
    color: $text-secondary;
    margin: 0;
    line-height: 1.6;
  }
}

.value-icon {
  width: 70px;
  height: 70px;
  background-color: rgba($primary-color, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  transition: all 0.3s ease;
  color: $primary-color;
  
  .value-icon-svg {
    font-size: 2rem;
  }
}
</style>