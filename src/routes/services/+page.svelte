<!-- src/routes/services/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { t } from '$lib/stores/locale.js';
  import AnimatedSection from '$lib/components/AnimatedSection.svelte';
  import { animations, createScrollObserver, animationPresets } from '$lib/utils/animations.js';
  
  let heroSection;
  let serviceDetailCards = [];
  let clientTypeCards = [];
  let sectorCards = [];
  
  onMount(() => {
    animations.init();
    
    // Hero animation
    if (heroSection) {
      animations.fadeIn(heroSection, animationPresets.hero.title);
    }
    
    // Service cards stagger animation
    if (serviceDetailCards.length > 0) {
      const servicesObserver = createScrollObserver((target) => {
        animations.staggerIn(serviceDetailCards, { 
          duration: 0.6, 
          stagger: 0.1, 
          y: 30,
          delay: 0.2 
        });
        servicesObserver.unobserve(target);
      });
      
      if (serviceDetailCards[0]) {
        servicesObserver.observe(serviceDetailCards[0].parentElement);
      }
    }
    
    // Client type cards animation
    if (clientTypeCards.length > 0) {
      const clientObserver = createScrollObserver((target) => {
        animations.staggerIn(clientTypeCards, animationPresets.card.stagger);
        clientObserver.unobserve(target);
      });
      
      if (clientTypeCards[0]) {
        clientObserver.observe(clientTypeCards[0].parentElement);
      }
    }
    
    // Sector cards animation
    if (sectorCards.length > 0) {
      const sectorObserver = createScrollObserver((target) => {
        animations.staggerIn(sectorCards, { ...animationPresets.card.stagger, delay: 0.2 });
        sectorObserver.unobserve(target);
      });
      
      if (sectorCards[0]) {
        sectorObserver.observe(sectorCards[0].parentElement);
      }
    }
    
    // Service card hover effects
    serviceDetailCards.forEach(card => {
      if (card) {
        const hoverEffect = animations.hoverScale(card, 1.05);
        card.addEventListener('mouseenter', hoverEffect.enter);
        card.addEventListener('mouseleave', hoverEffect.leave);
      }
    });
    
    // Setup scroll observer for sections
    const sectionObserver = createScrollObserver((target) => {
      target.classList.add('animate-in');
    });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      sectionObserver.observe(el);
    });
    
    return () => {
      animations.cleanup();
    };
  });
  
  // Services data from Pioneer Consultants document
  const detailedServices = [
    {
      id: 'bim',
      icon: '🏗️',
      title: 'BIM Modelling',
      description: 'Creating and managing the building\'s data throughout its entire lifecycle by allowing architects, engineers, and contractors to work from a shared 3D model.',
      features: [
        '3D Model Creation',
        'Clash Detection', 
        'Quantity Takeoffs',
        '4D Construction Sequencing',
        'Facility Management Integration'
      ]
    },
    {
      id: 'structural',
      icon: '📐',
      title: 'Structural Calculations',
      description: 'Accurate and compliant structural calculations for new constructions, extensions, and refurbishments.',
      features: [
        'Load Analysis',
        'Structural Design',
        'Foundation Design',
        'Seismic Analysis',
        'Compliance Verification'
      ]
    },
    {
      id: 'drawings',
      icon: '📋',
      title: 'Building Drawings',
      description: 'Detailed architectural plans for all construction phases.',
      features: [
        'Floor Plans',
        'Elevations',
        'Sections',
        'Construction Details',
        'As-Built Drawings'
      ]
    },
    {
      id: 'interior',
      icon: '🎨',
      title: 'Interior Design',
      description: 'Thoughtfully crafted interiors that balance elegance with everyday liveability.',
      features: [
        'Space Planning',
        'Material Selection',
        'Lighting Design',
        'Furniture Layout',
        'Color Consultation'
      ]
    },
    {
      id: 'visualization',
      icon: '🖼️',
      title: '3D Building Visualisation',
      description: 'High-quality, immersive 3D renderings that bring designs to life and support confident decision-making.',
      features: [
        'Photorealistic Renders',
        'Virtual Walkthroughs',
        'Animation Services',
        'VR/AR Integration',
        'Marketing Materials'
      ]
    },
    {
      id: 'web',
      icon: '💻',
      title: 'Construction Web Design',
      description: 'Tailored websites for construction businesses—modern, user-friendly, and search engine optimised.',
      features: [
        'Responsive Design',
        'SEO Optimization',
        'Portfolio Showcase',
        'Lead Generation',
        'Content Management'
      ]
    }
  ];
  
  // Services by client type from Pioneer Consultants document
  const clientServices = [
    'Employer agent',
    'Bid preparation and administration',
    'Contractor procurement and management',
    'Contract management',
    'Regular project reporting'
  ];
  
  const contractorServices = [
    'Full range of Quantity surveying activities',
    'Tender preparation',
    'Preparing bill of quantities',
    'Preparing time schedules',
    'BIM modeling',
    'Preparing financial reports',
    'Contract handling and legal compliance'
  ];
  
  const consultancyServices = [
    'Proposal development',
    'Architectural drawings',
    'Structural design with calculations',
    'Structural detailing',
    'Interior design'
  ];
</script>

<svelte:head>
  <title>Services - Pioneer Consultants Limited</title>
  <meta name="description" content="Comprehensive project management, cost control, and design support services for the construction industry across the West Midlands." />
</svelte:head>

<div class="min-h-screen">
  <!-- Hero Section -->
  <section bind:this={heroSection} class="relative py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="mb-6">Our Services</h1>
        <p class="text-xl text-neutral-600 dark:text-neutral-300">
          Comprehensive project management, cost control & design support with extensive expertise 
          tailored to contractors, consultants, and clients supporting every phase of the project life cycle.
        </p>
      </div>
    </div>
  </section>
  
  <!-- Main Services Grid -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each detailedServices as service, i}
          <div bind:this={serviceDetailCards[i]} id={service.id} class="service-detail-card neumorphic-card">
            <div class="service-icon text-5xl mb-4">{service.icon}</div>
            <h3 class="text-2xl font-bold mb-3">{service.title}</h3>
            <p class="text-neutral-600 dark:text-neutral-300 mb-4">{service.description}</p>
            
            <ul class="space-y-2">
              {#each service.features as feature}
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2 mt-1">✓</span>
                  <span class="text-neutral-600 dark:text-neutral-300">{feature}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Service Categories by Client Type -->
  <section class="py-20 bg-neutral-50 dark:bg-neutral-900">
    <div class="container mx-auto px-4">
      <h2 class="text-center mb-12 animate-on-scroll">Services by Client Type</h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Client Services -->
        <div bind:this={clientTypeCards[0]} class="glass-card">
          <div class="text-4xl mb-4">👤</div>
          <h3 class="text-2xl font-bold mb-4 text-primary-600">For Clients</h3>
          <ul class="space-y-3">
            {#each clientServices as service}
              <li class="flex items-start">
                <span class="text-accent-500 mr-2 mt-1">•</span>
                <span class="text-neutral-600 dark:text-neutral-300">{service}</span>
              </li>
            {/each}
          </ul>
        </div>
        
        <!-- Contractor Services -->
        <div bind:this={clientTypeCards[1]} class="glass-card">
          <div class="text-4xl mb-4">🏗️</div>
          <h3 class="text-2xl font-bold mb-4 text-primary-600">For Contractors</h3>
          <ul class="space-y-3">
            {#each contractorServices as service}
              <li class="flex items-start">
                <span class="text-accent-500 mr-2 mt-1">•</span>
                <span class="text-neutral-600 dark:text-neutral-300">{service}</span>
              </li>
            {/each}
          </ul>
        </div>
        
        <!-- Consultancy Services -->
        <div bind:this={clientTypeCards[2]} class="glass-card">
          <div class="text-4xl mb-4">💼</div>
          <h3 class="text-2xl font-bold mb-4 text-primary-600">For Consultancies</h3>
          <ul class="space-y-3">
            {#each consultancyServices as service}
              <li class="flex items-start">
                <span class="text-accent-500 mr-2 mt-1">•</span>
                <span class="text-neutral-600 dark:text-neutral-300">{service}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Sectors -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="mb-4 animate-on-scroll">Sectors We Work In</h2>
        <p class="text-xl text-neutral-600 dark:text-neutral-300 animate-on-scroll">
          Delivering excellence across multiple construction sectors
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div bind:this={sectorCards[0]} class="text-center p-8 neumorphic-card hover:scale-105 transition-transform duration-300">
          <div class="text-6xl mb-4">🏗️</div>
          <h3 class="text-2xl font-bold">Infrastructure</h3>
          <p class="text-neutral-600 dark:text-neutral-300 mt-2">
            Roads, bridges, utilities, and public works projects
          </p>
        </div>
        
        <div bind:this={sectorCards[1]} class="text-center p-8 neumorphic-card hover:scale-105 transition-transform duration-300">
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
  <section class="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
    <div class="container mx-auto px-4 text-center">
      <div class="animate-on-scroll">
        <h2 class="mb-6 text-white">Ready to Start Your Project?</h2>
        <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Let our expert team help you bring your vision to life with our comprehensive range of services 
          across the West Midlands and surrounding areas.
        </p>
        <a href="/contact" class="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold
                                   hover:bg-neutral-100 transform hover:scale-105 transition-all duration-300
                                   inline-block shadow-lg">
          Get Your Free Consultation
        </a>
      </div>
    </div>
  </section>
</div>