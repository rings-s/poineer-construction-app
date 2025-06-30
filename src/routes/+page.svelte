<!-- src/routes/+page.svelte -->
<script>
  import Hero from '$lib/components/Hero.svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import AnimatedSection from '$lib/components/AnimatedSection.svelte';
  import { onMount } from 'svelte';
  import { t } from '$lib/stores/locale.js';
  import { animations, createScrollObserver, animationPresets } from '$lib/utils/animations.js';
  
  // Services data from Pioneer Consultants document
  const services = [
    {
      title: 'BIM Modelling',
      description: 'Creating and managing the building\'s data throughout its entire lifecycle by allowing architects, engineers, and contractors to work from a shared 3D model.',
      icon: '🏗️',
      link: '/services#bim'
    },
    {
      title: 'Structural Calculations',
      description: 'Accurate and compliant structural calculations for new constructions, extensions, and refurbishments.',
      icon: '📐', 
      link: '/services#structural'
    },
    {
      title: 'Interior Design',
      description: 'Thoughtfully crafted interiors that balance elegance with everyday liveability.',
      icon: '🎨',
      link: '/services#interior'
    },
    {
      title: '3D Building Visualisation',
      description: 'High-quality, immersive 3D renderings that bring designs to life and support confident decision-making.',
      icon: '🖼️',
      link: '/services#visualization'
    }
  ];
  
  let stats = [
    { value: 0, target: 150, suffix: '+', label: 'Projects Completed' },
    { value: 0, target: 25, suffix: '+', label: 'Years Experience' },
    { value: 0, target: 98, suffix: '%', label: 'Client Satisfaction' },
    { value: 0, target: 50, suffix: '+', label: 'Expert Team Members' }
  ];
  
  let aboutImageRef;
  let statsSection;
  let serviceCards = [];
  let aboutSection;
  let ctaSection;
  
  onMount(() => {
    // Initialize animations
    animations.init();
    
    // Setup scroll observer for stats animation
    const statsObserver = createScrollObserver((target) => {
      animateStats();
      statsObserver.unobserve(target);
    }, { threshold: 0.5 });
    
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
    
    // Setup scroll observer for sections
    const sectionObserver = createScrollObserver((target) => {
      target.classList.add('animate-in');
    });
    
    // Observe all sections with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      sectionObserver.observe(el);
    });
    
    // About image hover effect
    if (aboutImageRef) {
      const hoverEffect = animations.hoverScale(aboutImageRef, 1.05);
      aboutImageRef.addEventListener('mouseenter', hoverEffect.enter);
      aboutImageRef.addEventListener('mouseleave', hoverEffect.leave);
    }
    
    // Service cards stagger animation
    if (serviceCards.length > 0) {
      const cardsObserver = createScrollObserver((target) => {
        animations.staggerIn(serviceCards, animationPresets.card.stagger);
        cardsObserver.unobserve(target);
      });
      
      if (serviceCards[0]) {
        cardsObserver.observe(serviceCards[0].parentElement);
      }
    }
    
    return () => {
      statsObserver.disconnect();
      sectionObserver.disconnect();
      animations.cleanup();
    };
  });
  
  function animateStats() {
    stats.forEach((stat, index) => {
      const statElement = document.querySelector(`[data-stat="${index}"]`);
      if (statElement) {
        animations.animateCounter(statElement, stat.target, {
          suffix: stat.suffix,
          delay: index * 0.2,
          duration: 2
        });
      }
    });
  }
</script>

<svelte:head>
  <title>Pioneer Consultants Limited - Bringing Vision to Reality</title>
  <meta name="description" content="Pioneer Consultants Limited specializes in innovative construction consultancy, BIM modeling, structural design, and project management services across the West Midlands." />
</svelte:head>

<Hero />

<!-- About Section -->
<section bind:this={aboutSection} class="py-20 bg-neutral-50 dark:bg-neutral-900">
  <div class="container mx-auto px-4">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div class="animate-on-scroll">
        <h2 class="mb-6">Who We Are</h2>
        <p class="text-neutral-600 dark:text-neutral-300 mb-6">
          Pioneer Consultants combines creative vision with viability. We provide comprehensive technical support throughout every stage of your project, from initial concept through to closure.
        </p>
        <p class="text-neutral-600 dark:text-neutral-300 mb-8">
          Our team combines professional design expertise with a commitment to delivering practical, inspiring solutions for every client across the West Midlands and surrounding areas.
        </p>
        <a href="/about" class="btn-primary inline-block">
          Learn More About Us
        </a>
      </div>
      
      <div class="relative animate-on-scroll">
        <div class="glass-card p-0 overflow-hidden">
          <div bind:this={aboutImageRef} 
               class="aspect-video bg-gradient-to-br from-primary-400 to-accent-400 rounded-lg 
                      flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300">
            PCL
          </div>
        </div>
        <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-400 rounded-lg opacity-20 -z-10"></div>
        <div class="absolute -top-6 -left-6 w-24 h-24 bg-primary-400 rounded-full opacity-10 -z-10"></div>
      </div>
    </div>
  </div>
</section>

<!-- Services Section -->
<section class="py-20">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12 animate-on-scroll">
      <h2 class="mb-4">Our Services</h2>
      <p class="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
        Comprehensive project management, cost control & design support with extensive expertise tailored to contractors, consultants, and clients.
      </p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each services as service, i}
        <div bind:this={serviceCards[i]} class="animate-on-scroll">
          <ServiceCard {...service} />
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Stats Section -->
<section bind:this={statsSection} class="py-20 gradient-bg text-white relative overflow-hidden">
  <!-- Animated background shapes -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-10 left-10 w-40 h-40 bg-white rounded-full animate-pulse-slow"></div>
    <div class="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full animate-pulse-slow animation-delay-200"></div>
  </div>
  
  <div class="container mx-auto px-4 relative z-10">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      {#each stats as stat, index}
        <div class="text-center">
          <div class="text-4xl md:text-5xl font-bold mb-2" data-stat={index}>
            0{stat.suffix}
          </div>
          <div class="text-lg opacity-90">{stat.label}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Sectors Section -->
<section class="py-20 bg-neutral-50 dark:bg-neutral-900">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="mb-4 animate-on-scroll">Sectors We Work In</h2>
      <p class="text-xl text-neutral-600 dark:text-neutral-300 animate-on-scroll">
        Delivering excellence across multiple construction sectors
      </p>
    </div>
    
    <div class="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
      <div class="text-center p-8 neumorphic-card animate-on-scroll hover:scale-105 transition-transform duration-300">
        <div class="text-6xl mb-4">🏗️</div>
        <h3 class="text-2xl font-bold">Infrastructure</h3>
        <p class="text-neutral-600 dark:text-neutral-300 mt-2">
          Roads, bridges, utilities, and public works projects
        </p>
      </div>
      
      <div class="text-center p-8 neumorphic-card animate-on-scroll hover:scale-105 transition-transform duration-300">
        <div class="text-6xl mb-4">🏢</div>
        <h3 class="text-2xl font-bold">Construction</h3>
        <p class="text-neutral-600 dark:text-neutral-300 mt-2">
          Commercial, residential, and industrial buildings
        </p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section bind:this={ctaSection} class="py-20">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto text-center">
      <div class="glass-card animate-on-scroll">
        <h2 class="mb-6">Ready to Start Your Project?</h2>
        <p class="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
          Let's transform your vision into reality together. Our expert team is ready to help you create something extraordinary.
        </p>
        <a href="/contact" class="btn-primary inline-block">
          Get in Touch
        </a>
      </div>
    </div>
  </div>
</section>