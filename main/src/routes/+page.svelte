<script>
  import Hero from '$lib/components/Hero.svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import AnimatedSection from '$lib/components/AnimatedSection.svelte';
  import { onMount } from 'svelte';
  import { t } from '$lib/stores/locale.js';
  
  const services = [
    {
      title: 'BIM Modelling',
      description: 'Creating and managing the building\'s data throughout its entire lifecycle.',
      icon: '🏗️',
      link: '/services#bim'
    },
    {
      title: 'Structural Design',
      description: 'Accurate and compliant structural calculations for all construction types.',
      icon: '📐',
      link: '/services#structural'
    },
    {
      title: 'Interior Design',
      description: 'Thoughtfully crafted interiors that balance elegance with liveability.',
      icon: '🎨',
      link: '/services#interior'
    },
    {
      title: '3D Visualization',
      description: 'High-quality, immersive 3D renderings that bring designs to life.',
      icon: '🖼️',
      link: '/services#visualization'
    }
  ];
  
  let stats = [
    { value: 0, target: 150, suffix: '+', label: 'Projects Completed' },
    { value: 0, target: 25, suffix: '+', label: 'Years Experience' },
    { value: 0, target: 98, suffix: '%', label: 'Client Satisfaction' },
    { value: 0, target: 50, suffix: '+', label: 'Expert Team' }
  ];
  
  onMount(() => {
    // Animate stats on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('#stats-section');
    if (statsSection) observer.observe(statsSection);
    
    return () => observer.disconnect();
  });
  
  function animateStats() {
    stats.forEach((stat, index) => {
      const duration = 2000;
      const start = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        stat.value = Math.floor(progress * stat.target);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          stat.value = stat.target;
        }
      };
      
      setTimeout(() => requestAnimationFrame(animate), index * 200);
    });
    
    stats = stats; // Trigger reactivity
  }
</script>

<svelte:head>
  <title>Pioneer Consultants Limited - Bringing Vision to Reality</title>
  <meta name="description" content="Pioneer Consultants Limited specializes in innovative construction consultancy, BIM modeling, structural design, and project management services." />
</svelte:head>

<Hero />

<!-- About Section -->
<AnimatedSection>
  <section class="py-20 bg-neutral-50 dark:bg-neutral-900">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="animate-on-scroll">
          <h2 class="mb-6 text-neutral-900 dark:text-white">{$t('about.title')}</h2>
          <p class="text-neutral-600 dark:text-neutral-300 mb-6">
            {$t('about.description1')}
          </p>
          <p class="text-neutral-600 dark:text-neutral-300 mb-8">
            {$t('about.description2')}
          </p>
          <a href="/about" class="btn-primary inline-block">
            {$t('about.cta')}
          </a>
        </div>
        
        <div class="relative animate-on-scroll animation-delay-200">
          <div class="glass-card">
            <div class="aspect-video bg-gradient-to-br from-primary-400 to-accent-400 rounded-lg"></div>
          </div>
          <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-400 rounded-lg opacity-20 -z-10"></div>
        </div>
      </div>
    </div>
  </section>
</AnimatedSection>

<!-- Services Section -->
<AnimatedSection>
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 animate-on-scroll">
        <h2 class="mb-4 text-neutral-900 dark:text-white">{$t('services.title')}</h2>
        <p class="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          {$t('services.subtitle')}
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each services as service, i}
          <div class="animate-on-scroll" style="animation-delay: {i * 100}ms">
            <ServiceCard {...service} />
          </div>
        {/each}
      </div>
    </div>
  </section>
</AnimatedSection>

<!-- Stats Section -->
<AnimatedSection>
  <section id="stats-section" class="py-20 gradient-bg text-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        {#each stats as stat}
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2">
              {stat.value}{stat.suffix}
            </div>
            <div class="text-lg opacity-90">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>
</AnimatedSection>

<!-- CTA Section -->
<AnimatedSection>
  <section class="py-20 bg-neutral-50 dark:bg-neutral-900">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center glass-card animate-on-scroll">
        <h2 class="mb-6 text-neutral-900 dark:text-white">{$t('cta.title')}</h2>
        <p class="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
          {$t('cta.subtitle')}
        </p>
        <a href="/contact" class="btn-primary inline-block">
          {$t('cta.button')}
        </a>
      </div>
    </div>
  </section>
</AnimatedSection>