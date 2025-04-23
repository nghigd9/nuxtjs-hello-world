<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">We Build <span class="text-gradient">Digital Experiences</span> That Matter</h1>
            <p class="hero-description">Our team of passionate developers and designers creates innovative web solutions that help businesses succeed in the digital landscape.</p>
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">10+</div>
                <div class="stat-label">Years Experience</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">200+</div>
                <div class="stat-label">Projects Completed</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">Happy Clients</div>
              </div>
            </div>
            <div class="hero-actions">
              <button class="btn-primary">
                <Icon name="uil:users-alt" />
                Meet Our Team
              </button>
              <button class="btn-outline">
                <Icon name="uil:envelope" />
                Contact Us
              </button>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://picsum.photos/id/28/800/600" alt="Our team at work" class="main-image">
            <div class="image-accent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">OUR MISSION</span>
          <h2 class="section-title">Creating Digital Solutions With Purpose</h2>
          <p class="section-subtitle">We believe in technology that enhances human experiences and solves real problems</p>
        </div>
        
        <div class="mission-content">
          <div class="mission-video">
            <img src="https://picsum.photos/id/160/800/450" alt="Our mission" class="video-thumbnail">
            <button class="play-button">
              <Icon name="uil:play" />
            </button>
          </div>
          
          <div class="mission-points">
            <div class="mission-point">
              <div class="point-icon">
                <Icon name="uil:rocket" />
              </div>
              <div class="point-content">
                <h3>Innovation</h3>
                <p>We constantly push the boundaries of what's possible with cutting-edge technology and creative thinking.</p>
              </div>
            </div>
            
            <div class="mission-point">
              <div class="point-icon">
                <Icon name="uil:users-alt" />
              </div>
              <div class="point-content">
                <h3>Collaboration</h3>
                <p>We work closely with our clients, treating their challenges as our own and finding solutions together.</p>
              </div>
            </div>
            
            <div class="mission-point">
              <div class="point-icon">
                <Icon name="uil:chart-growth" />
              </div>
              <div class="point-content">
                <h3>Results-Driven</h3>
                <p>Our focus is always on delivering tangible outcomes that drive growth and success for our clients.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">OUR STORY</span>
          <h2 class="section-title">The Journey So Far</h2>
          <p class="section-subtitle">From humble beginnings to industry leadership</p>
        </div>
        
        <div class="story-timeline">
          <div class="timeline-item">
            <div class="timeline-date">
              <span>2015</span>
            </div>
            <div class="timeline-content">
              <h3>Company Founded</h3>
              <p>Started with a small team of three developers working from a coffee shop with a vision to create impactful digital solutions.</p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-date">
              <span>2017</span>
            </div>
            <div class="timeline-content">
              <h3>First Major Client</h3>
              <p>Secured our first enterprise client and delivered a project that exceeded expectations, establishing our reputation in the industry.</p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-date">
              <span>2019</span>
            </div>
            <div class="timeline-content">
              <h3>Team Expansion</h3>
              <p>Grew to a team of 15 specialists across development, design, and strategy, allowing us to take on more complex projects.</p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-date">
              <span>2021</span>
            </div>
            <div class="timeline-content">
              <h3>International Recognition</h3>
              <p>Received multiple industry awards for our innovative approach to user experience and technical excellence.</p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-date">
              <span>2023</span>
            </div>
            <div class="timeline-content">
              <h3>Global Expansion</h3>
              <p>Opened new offices in Europe and Asia to better serve our growing international client base.</p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-date">
              <span>Today</span>
            </div>
            <div class="timeline-content">
              <h3>Industry Leaders</h3>
              <p>Now recognized as industry leaders, we continue to push the boundaries of what's possible in digital innovation.</p>
            </div>
          </div>
          
          <div class="timeline-line"></div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">OUR TEAM</span>
          <h2 class="section-title">Meet The Experts</h2>
          <p class="section-subtitle">The talented individuals behind our success</p>
        </div>
        
        <div class="team-grid">
          <div 
            v-for="member in team" 
            :key="member.id"
            class="team-member"
            @mouseenter="hoveredMember = member.id"
            @mouseleave="hoveredMember = null"
          >
            <div class="member-image">
              <img :src="member.photo" :alt="member.name">
              <div class="member-overlay" :class="{ 'active': hoveredMember === member.id }">
                <div class="member-social">
                  <a 
                    v-for="social in member.social" 
                    :key="social.name" 
                    :href="social.url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="social-icon"
                  >
                    <Icon :name="social.icon" />
                  </a>
                </div>
              </div>
            </div>
            <div class="member-details">
              <h3>{{ member.name }}</h3>
              <div class="member-position">{{ member.position }}</div>
              <p class="member-bio">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">OUR VALUES</span>
          <h2 class="section-title">What We Stand For</h2>
          <p class="section-subtitle">The principles that guide our work and decisions every day</p>
        </div>
        
        <div class="values-grid">
          <div 
            v-for="(value, index) in values" 
            :key="index"
            class="value-card"
          >
            <div class="value-icon">
              <Icon :name="value.icon" />
            </div>
            <h3>{{ value.title }}</h3>
            <p>{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Culture Section -->
    <section class="culture-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">OUR CULTURE</span>
          <h2 class="section-title">Life At Our Company</h2>
          <p class="section-subtitle">We believe in creating an environment where talent can thrive</p>
        </div>
        
        <div class="culture-photos">
          <div class="photo-item large">
            <img src="https://picsum.photos/id/301/600/400" alt="Team collaboration">
            <div class="photo-overlay">Team Building Retreat</div>
          </div>
          <div class="photo-item">
            <img src="https://picsum.photos/id/6/300/300" alt="Office space">
            <div class="photo-overlay">Our Creative Space</div>
          </div>
          <div class="photo-item">
            <img src="https://picsum.photos/id/60/300/300" alt="Team meeting">
            <div class="photo-overlay">Brainstorming Session</div>
          </div>
          <div class="photo-item">
            <img src="https://picsum.photos/id/180/300/300" alt="Team lunch">
            <div class="photo-overlay">Team Celebration</div>
          </div>
          <div class="photo-item">
            <img src="https://picsum.photos/id/20/300/300" alt="Office environment">
            <div class="photo-overlay">Focus Time</div>
          </div>
        </div>
        
        <div class="culture-highlights">
          <div class="culture-highlight">
            <div class="highlight-icon">
              <Icon name="uil:coffee" />
            </div>
            <h4>Work-Life Balance</h4>
            <p>We prioritize well-being and encourage a healthy balance between professional and personal life.</p>
          </div>
          
          <div class="culture-highlight">
            <div class="highlight-icon">
              <Icon name="uil:book-open" />
            </div>
            <h4>Continuous Learning</h4>
            <p>We provide resources and time for our team to keep growing their skills and knowledge.</p>
          </div>
          
          <div class="culture-highlight">
            <div class="highlight-icon">
              <Icon name="uil:comments" />
            </div>
            <h4>Open Communication</h4>
            <p>Everyone's voice matters. We encourage open dialogue and the sharing of ideas at all levels.</p>
          </div>
          
          <div class="culture-highlight">
            <div class="highlight-icon">
              <Icon name="uil:trophy" />
            </div>
            <h4>Recognition</h4>
            <p>We celebrate achievements and recognize the exceptional contributions of our team members.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">TESTIMONIALS</span>
          <h2 class="section-title">What Our Clients Say</h2>
          <p class="section-subtitle">The experiences of those who have worked with us</p>
        </div>
        
        <div class="testimonials-slider">
          <div class="testimonial-card">
            <div class="quote-mark">
              <Icon name="uil:quote-right" />
            </div>
            <p class="testimonial-content">
              "Working with this team has been an absolute pleasure. Their technical expertise is matched only by their dedication to understanding our business needs. The result was a website that exceeded our expectations."
            </p>
            <div class="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah Johnson" class="author-image">
              <div>
                <h4>Sarah Johnson</h4>
                <p>Marketing Director, TechCorp</p>
              </div>
            </div>
          </div>
          
          <div class="slider-controls">
            <button class="control-button">
              <Icon name="uil:arrow-left" />
            </button>
            <div class="slider-dots">
              <span class="dot active"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            <button class="control-button">
              <Icon name="uil:arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Clients Section -->
    <section class="clients-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">OUR CLIENTS</span>
          <h2 class="section-title">Companies That Trust Us</h2>
          <p class="section-subtitle">We've had the privilege of working with amazing organizations</p>
        </div>
        
        <div class="clients-grid">
          <div class="client-logo">
            <img src="https://picsum.photos/id/237/150/80" alt="Client logo">
          </div>
          <div class="client-logo">
            <img src="https://picsum.photos/id/237/150/80" alt="Client logo">
          </div>
          <div class="client-logo">
            <img src="https://picsum.photos/id/237/150/80" alt="Client logo">
          </div>
          <div class="client-logo">
            <img src="https://picsum.photos/id/237/150/80" alt="Client logo">
          </div>
          <div class="client-logo">
            <img src="https://picsum.photos/id/237/150/80" alt="Client logo">
          </div>
          <div class="client-logo">
            <img src="https://picsum.photos/id/237/150/80" alt="Client logo">
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Work With Us?</h2>
          <p>Let's discuss how we can help bring your digital vision to life</p>
          <div class="cta-buttons">
            <button class="btn-primary">
              <Icon name="uil:message" />
              Contact Us
            </button>
            <button class="btn-outline">
              <Icon name="uil:info-circle" />
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// State for interactions
const hoveredMember = ref(null);

// Sample team members (using existing data)
const team = ref([
  {
    id: 1,
    name: "Alex Johnson",
    position: "Founder & CEO",
    bio: "Alex has over 15 years of experience in web development and has led numerous successful projects.",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
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
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
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
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
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
    photo: "https://randomuser.me/api/portraits/women/17.jpg",
    social: [
      { name: "linkedin", icon: "uil:linkedin", url: "#" },
      { name: "twitter", icon: "uil:twitter", url: "#" }
    ]
  }
]);

// Company values (using existing data)
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

// Section header styles
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  .section-badge {
    display: inline-block;
    background: linear-gradient(90deg, rgba($accent-primary, 0.1), rgba($accent-secondary, 0.1));
    color: $accent-primary;
    padding: 0.4rem 1rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 1.2rem;
  }
  
  .section-title {
    font-size: 2.5rem;
    color: $text-white-light;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .section-subtitle {
    color: $text-secondary;
    font-size: 1.2rem;
    line-height: 1.6;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
}

// Button styles
.btn-primary {
  background: linear-gradient(45deg, $accent-primary, $accent-secondary);
  color: $bg-primary;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 1.8rem;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba($accent-primary, 0.25);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba($accent-primary, 0.35);
  }
  
  &:active {
    transform: translateY(-1px);
  }
}

.btn-outline {
  background-color: transparent;
  color: $text-white-light;
  border: 1px solid rgba($text-white-light, 0.3);
  border-radius: 8px;
  padding: 0.9rem 1.8rem;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: rgba($text-white-light, 0.05);
    border-color: rgba($text-white-light, 0.5);
    transform: translateY(-3px);
  }
  
  &:active {
    transform: translateY(-1px);
  }
}

// Section spacing
section {
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 4rem 0;
  }
}

// Hero Section
.hero-section {
  padding-top: 5rem;
  padding-bottom: 5rem;
  background: linear-gradient(45deg, rgba($bg-primary, 0.9) 0%, rgba($gray-800, 0.9) 100%),
              url('https://picsum.photos/id/140/1920/1080') no-repeat center/cover;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, $accent-primary, transparent);
    opacity: 0.5;
  }
  
  .hero-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;
    
    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .hero-text {
    max-width: 600px;
    
    .hero-title {
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      line-height: 1.2;
      margin-bottom: 1.5rem;
      color: $text-white;
      font-weight: 700;
      
      .text-gradient {
        background: linear-gradient(45deg, $accent-primary, $blue-bright);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline;
      }
    }
    
    .hero-description {
      color: $text-secondary;
      font-size: 1.2rem;
      line-height: 1.7;
      margin-bottom: 2.5rem;
    }
    
    .hero-stats {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
      margin-bottom: 2.5rem;
      
      .stat-item {
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: $accent-primary;
          margin-bottom: 0.3rem;
        }
        
        .stat-label {
          color: $text-secondary;
          font-size: 0.9rem;
        }
      }
    }
    
    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
  }
  
  .hero-image {
    position: relative;
    
    .main-image {
      width: 100%;
      height: auto;
      border-radius: 10px;
      filter: brightness(0.9);
      z-index: 1;
      position: relative;
    }
    
    .image-accent {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 20px;
      left: 20px;
      border-radius: 10px;
      background: rgba($accent-primary, 0.2);
      z-index: 0;
    }
  }
}

// Mission Section
.mission-section {
  background-color: $bg-primary;
  
  .mission-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;
    
    @media (min-width: 992px) {
      grid-template-columns: 1.2fr 0.8fr;
    }
  }
  
  .mission-video {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px $shadow-strong;
    
    .video-thumbnail {
      width: 100%;
      display: block;
      height: auto;
      transition: transform 0.3s ease;
    }
    
    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba($accent-primary, 0.9);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $text-white;
      font-size: 1.8rem;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
      
      &:hover {
        transform: translate(-50%, -50%) scale(1.1);
        background: $accent-primary;
      }
    }
    
    &:hover {
      .video-thumbnail {
        transform: scale(1.03);
      }
    }
  }
  
  .mission-points {
    .mission-point {
      display: flex;
      align-items: flex-start;
      margin-bottom: 2rem;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .point-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, rgba($accent-primary, 0.1), rgba($accent-secondary, 0.1));
        color: $accent-primary;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin-right: 1.2rem;
        flex-shrink: 0;
      }
      
      .point-content {
        h3 {
          color: $text-white-light;
          margin: 0 0 0.5rem;
          font-size: 1.3rem;
        }
        
        p {
          color: $text-secondary;
          margin: 0;
          line-height: 1.6;
        }
      }
    }
  }
}

// Story Section
.story-section {
  background: radial-gradient(circle at 80% 10%, rgba($accent-primary, 0.03) 0%, transparent 70%),
              radial-gradient(circle at 20% 70%, rgba($blue-deep, 0.03) 0%, transparent 70%),
              $bg-secondary;
  
  .story-timeline {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    
    .timeline-line {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      background: linear-gradient(to bottom, $accent-primary, $accent-secondary);
      opacity: 0.3;
      
      @media (max-width: 768px) {
        left: 2rem;
      }
    }
    
    .timeline-item {
      display: flex;
      margin-bottom: 3rem;
      position: relative;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      &:nth-child(odd) {
        .timeline-date {
          order: 1;
          text-align: right;
          padding-right: 2rem;
          
          &::after {
            right: -9px;
          }
          
          @media (max-width: 768px) {
            order: 0;
            text-align: left;
            padding-right: 0;
            padding-left: 4rem;
            
            &::after {
              left: 2rem;
              right: auto;
            }
          }
        }
        
        .timeline-content {
          order: 2;
          padding-left: 2rem;
          
          @media (max-width: 768px) {
            padding-left: 4rem;
          }
        }
        
        @media (max-width: 768px) {
          flex-direction: column;
        }
      }
      
      &:nth-child(even) {
        flex-direction: row-reverse;
        
        .timeline-date {
          order: 2;
          text-align: left;
          padding-left: 2rem;
          
          &::after {
            left: -9px;
          }
          
          @media (max-width: 768px) {
            order: 0;
            text-align: left;
            padding-left: 4rem;
            
            &::after {
              left: 2rem;
            }
          }
        }
        
        .timeline-content {
          order: 1;
          padding-right: 2rem;
          text-align: right;
          
          @media (max-width: 768px) {
            order: 1;
            padding-right: 0;
            padding-left: 4rem;
            text-align: left;
          }
        }
        
        @media (max-width: 768px) {
          flex-direction: column;
        }
      }
    }
    
    .timeline-date {
      width: 50%;
      display: flex;
      align-items: center;
      position: relative;
      
      @media (max-width: 768px) {
        width: 100%;
      }
      
      &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: $bg-primary;
        border: 2px solid $accent-primary;
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
      }
      
      span {
        background: linear-gradient(45deg, rgba($accent-primary, 0.1), rgba($accent-secondary, 0.1));
        color: $text-white-light;
        padding: 0.5rem 1.2rem;
        border-radius: 50px;
        font-weight: 600;
        font-size: 1.1rem;
        display: inline-block;
      }
    }
    
    .timeline-content {
      width: 50%;
      
      @media (max-width: 768px) {
        width: 100%;
      }
      
      h3 {
        color: $accent-primary;
        margin: 0 0 1rem;
        font-size: 1.3rem;
      }
      
      p {
        color: $text-secondary;
        margin: 0;
        line-height: 1.6;
      }
    }
  }
}

// Team Section
.team-section {
  background: $bg-primary;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, $border-color, transparent);
    opacity: 0.5;
  }
  
  .team-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2.5rem;
    
    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 992px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .team-member {
    background-color: $bg-secondary;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 25px $shadow-strong;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    }
    
    .member-image {
      position: relative;
      height: 250px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      .member-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, rgba($bg-primary, 0.9), transparent);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 1.5rem;
        opacity: 0;
        transition: all 0.3s ease;
        
        &.active {
          opacity: 1;
        }
        
        .member-social {
          display: flex;
          gap: 1rem;
          
          .social-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba($bg-secondary, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            color: $text-white-light;
            backdrop-filter: blur(3px);
            transition: all 0.3s ease;
            
            &:hover {
              background-color: $accent-primary;
              transform: translateY(-3px);
            }
          }
        }
      }
    }
    
    .member-details {
      padding: 1.5rem;
      
      h3 {
        color: $text-white-light;
        margin: 0 0 0.3rem;
        font-size: 1.3rem;
      }
      
      .member-position {
        color: $accent-primary;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        font-weight: 600;
      }
      
      .member-bio {
        color: $text-secondary;
        font-size: 0.95rem;
        line-height: 1.6;
        margin: 0;
      }
    }
  }
}

// Values Section
.values-section {
  background: $bg-secondary;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, $border-color, transparent);
    opacity: 0.5;
  }
  
  .values-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
    
    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .value-card {
    background: linear-gradient(45deg, rgba($bg-tertiary, 0.5), rgba($bg-tertiary, 0.3));
    border-radius: 10px;
    padding: 2rem;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    &:hover {
      border-color: rgba($accent-primary, 0.3);
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      
      .value-icon {
        background: linear-gradient(45deg, $accent-primary, $accent-secondary);
        color: $bg-primary;
        transform: rotateY(180deg);
      }
    }
    
    .value-icon {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: linear-gradient(45deg, rgba($accent-primary, 0.1), rgba($accent-secondary, 0.1));
      color: $accent-primary;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      transition: all 0.5s ease;
    }
    
    h3 {
      color: $text-white-light;
      margin: 0 0 1rem;
      font-size: 1.3rem;
    }
    
    p {
      color: $text-secondary;
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0;
    }
  }
}

// Culture Section
.culture-section {
  background: $bg-primary;
  
  .culture-photos {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 200px);
    gap: 1.5rem;
    margin-bottom: 3rem;
    
    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 200px);
    }
    
    @media (max-width: 640px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(5, 200px);
    }
    
    .photo-item {
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      
      &.large {
        grid-column: span 2;
        grid-row: span 2;
        
        @media (max-width: 640px) {
          grid-column: span 1;
        }
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      .photo-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        background: linear-gradient(to top, rgba($bg-primary, 0.8), transparent);
        color: $text-white;
        font-weight: 600;
        transform: translateY(100%);
        transition: transform 0.3s ease;
      }
      
      &:hover {
        img {
          transform: scale(1.05);
        }
        
        .photo-overlay {
          transform: translateY(0);
        }
      }
    }
  }
  
  .culture-highlights {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    
    @media (min-width: 992px) {
      grid-template-columns: repeat(4, 1fr);
    }
    
    .culture-highlight {
      text-align: center;
      
      .highlight-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(45deg, rgba($accent-primary, 0.1), rgba($accent-secondary, 0.1));
        color: $accent-primary;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin: 0 auto 1rem;
      }
      
      h4 {
        color: $text-white-light;
        margin: 0 0 0.7rem;
        font-size: 1.1rem;
      }
      
      p {
        color: $text-secondary;
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.6;
      }
    }
  }
}

// Testimonials Section
.testimonials-section {
  background-color: $bg-secondary;
  
  .testimonials-slider {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .testimonial-card {
    background-color: $bg-tertiary;
    border-radius: 12px;
    padding: 2.5rem;
    position: relative;
    margin-bottom: 2rem;
    
    .quote-mark {
      position: absolute;
      top: -20px;
      left: 30px;
      width: 50px;
      height: 50px;
      background: linear-gradient(45deg, $accent-primary, $accent-secondary);
      color: $bg-primary;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    
    .testimonial-content {
      color: $text-secondary;
      font-size: 1.2rem;
      line-height: 1.7;
      margin-bottom: 2rem;
      font-style: italic;
    }
    
    .testimonial-author {
      display: flex;
      align-items: center;
      
      .author-image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 1rem;
        object-fit: cover;
      }
      
      h4 {
        color: $text-white-light;
        margin: 0 0 0.3rem;
        font-size: 1.1rem;
      }
      
      p {
        color: $text-muted;
        margin: 0;
        font-size: 0.9rem;
      }
    }
  }
  
  .slider-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    
    .control-button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba($bg-tertiary, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: $text-secondary;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: $bg-tertiary;
        color: $text-white-light;
      }
    }
    
    .slider-dots {
      display: flex;
      gap: 0.5rem;
      
      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: $border-color;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &.active {
          background-color: $accent-primary;
          transform: scale(1.2);
        }
      }
    }
  }
}

// Clients Section
.clients-section {
  background-color: $bg-primary;
  
  .clients-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(6, 1fr);
    }
    
    .client-logo {
      background-color: $bg-secondary;
      border-radius: 10px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      
      img {
        max-width: 100%;
        height: auto;
        filter: grayscale(100%);
        opacity: 0.7;
        transition: all 0.3s ease;
      }
      
      &:hover {
        transform: translateY(-5px);
        
        img {
          filter: grayscale(0);
          opacity: 1;
        }
      }
    }
  }
}

// CTA Section
.cta-section {
  background: linear-gradient(45deg, rgba($bg-secondary, 0.95), rgba($bg-tertiary, 0.95)),
              url('https://picsum.photos/id/3/1200/400') no-repeat center/cover;
  text-align: center;
  padding: 5rem 0;
  
  .cta-content {
    max-width: 700px;
    margin: 0 auto;
    
    h2 {
      font-size: 2.5rem;
      color: $text-white-light;
      margin-bottom: 1rem;
    }
    
    p {
      color: $text-secondary;
      font-size: 1.2rem;
      margin-bottom: 2.5rem;
    }
    
    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
  }
}
</style>