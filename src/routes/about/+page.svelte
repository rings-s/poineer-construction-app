<script>
    import { onMount } from 'svelte';
    import { t } from '$lib/stores/locale.js';
    import AnimatedSection from '$lib/components/AnimatedSection.svelte';
    import gsap from 'gsap';
    
    let timelineRef;
    
    onMount(() => {
      // Animate timeline items
      gsap.from('.timeline-item', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: 'power2.out'
      });
      
      // Animate timeline line
      gsap.from('.timeline-line', {
        height: 0,
        duration: 2,
        delay: 0.3,
        ease: 'power2.inOut'
      });
    });
    
    const milestones = [
      { year: '1998', title: 'Company Founded', description: 'Started with a vision to transform construction consultancy' },
      { year: '2005', title: 'First Major Project', description: 'Completed our first million-pound infrastructure project' },
      { year: '2010', title: 'International Expansion', description: 'Expanded operations to serve clients across the Middle East' },
      { year: '2015', title: 'BIM Innovation', description: 'Pioneered BIM modeling services in the region' },
      { year: '2020', title: 'Digital Transformation', description: 'Launched cutting-edge 3D visualization and web services' },
      { year: '2024', title: 'Industry Leader', description: 'Recognized as a leading construction consultancy firm' }
    ];
    
    const values = [
      { icon: '🎯', title: 'Excellence', description: 'Committed to delivering the highest quality in every project' },
      { icon: '🤝', title: 'Integrity', description: 'Building trust through transparency and ethical practices' },
      { icon: '💡', title: 'Innovation', description: 'Embracing new technologies to create better solutions' },
      { icon: '🌱', title: 'Sustainability', description: 'Designing for a greener, more sustainable future' }
    ];
  </script>
  
  <svelte:head>
    <title>About - Pioneer Consultants Limited</title>
    <meta name="description" content="Learn about Pioneer Consultants Limited - combining creative vision with viability in construction consultancy." />
  </svelte:head>
  
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800">
      <div class="container mx-auto px-4">
        <AnimatedSection>
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="mb-6">{$t('about.title')}</h1>
            <p class="text-xl text-neutral-600 dark:text-neutral-300">
              {$t('about.description1')}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
    
    <!-- Vision & Mission -->
    <AnimatedSection>
      <section class="py-20">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-12">
            <div class="glass-card animate-on-scroll">
              <div class="text-4xl mb-4">🔭</div>
              <h2 class="text-3xl font-bold mb-4">Our Vision</h2>
              <p class="text-neutral-600 dark:text-neutral-300">
                To be the most trusted and innovative construction consultancy firm, 
                setting new standards in design excellence and project delivery across the globe.
              </p>
            </div>
            
            <div class="glass-card animate-on-scroll animation-delay-200">
              <div class="text-4xl mb-4">🎯</div>
              <h2 class="text-3xl font-bold mb-4">Our Mission</h2>
              <p class="text-neutral-600 dark:text-neutral-300">
                {$t('about.description2')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
    
    <!-- Core Values -->
    <AnimatedSection>
      <section class="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div class="container mx-auto px-4">
          <h2 class="text-center mb-12">Our Core Values</h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each values as value, i}
              <div class="text-center animate-on-scroll" style="animation-delay: {i * 100}ms">
                <div class="text-5xl mb-4">{value.icon}</div>
                <h3 class="text-xl font-bold mb-2">{value.title}</h3>
                <p class="text-neutral-600 dark:text-neutral-300">{value.description}</p>
              </div>
            {/each}
          </div>
        </div>
      </section>
    </AnimatedSection>
    
    <!-- Timeline -->
    <AnimatedSection>
      <section class="py-20">
        <div class="container mx-auto px-4">
          <h2 class="text-center mb-12">Our Journey</h2>
          
          <div bind:this={timelineRef} class="max-w-4xl mx-auto relative">
            <!-- Timeline line -->
            <div class="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-200 dark:bg-primary-800 top-0 bottom-0"></div>
            
            {#each milestones as milestone, i}
              <div class="timeline-item flex items-start mb-12 {i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}">
                <div class="flex-1 {i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}">
                  <h3 class="text-2xl font-bold text-primary-600 mb-2">{milestone.year}</h3>
                  <h4 class="text-xl font-semibold mb-2">{milestone.title}</h4>
                  <p class="text-neutral-600 dark:text-neutral-300">{milestone.description}</p>
                </div>
                
                <div class="relative z-10">
                  <div class="w-4 h-4 bg-primary-600 rounded-full ring-4 ring-white dark:ring-neutral-900"></div>
                </div>
                
                <div class="flex-1"></div>
              </div>
            {/each}
          </div>
        </div>
      </section>
    </AnimatedSection>
    
    <!-- Team Section -->
    <AnimatedSection>
      <section class="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="mb-4">Our Expert Team</h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              A dedicated team of professionals committed to excellence in every project
            </p>
          </div>
          
          <div class="grid md:grid-cols-4 gap-8">
            {#each Array(4) as _, i}
              <div class="text-center animate-on-scroll" style="animation-delay: {i * 100}ms">
                <div class="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full
                            flex items-center justify-center text-white text-3xl font-bold">
                  T{i + 1}
                </div>
                <h4 class="font-semibold">Team Member</h4>
                <p class="text-neutral-600 dark:text-neutral-300">Position</p>
              </div>
            {/each}
          </div>
        </div>
      </section>
    </AnimatedSection>
  </div>