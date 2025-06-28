<script>
    import { onMount } from 'svelte';
    import AnimatedSection from '$lib/components/AnimatedSection.svelte';
    import ContactForm from '$lib/components/ContactForm.svelte';
    import gsap from 'gsap';
    
    onMount(() => {
      // Animate contact cards
      gsap.from('.contact-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: 'power2.out'
      });
    });
  </script>
  
  <svelte:head>
    <title>Contact - Pioneer Consultants Limited</title>
    <meta name="description" content="Get in touch with Pioneer Consultants Limited for your construction consultancy needs." />
  </svelte:head>
  
  <div class="pt-20">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800">
      <div class="container mx-auto px-4">
        <AnimatedSection>
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="mb-6 text-neutral-900 dark:text-white">Let's Start Your Next Project Together</h1>
            <p class="text-xl text-neutral-600 dark:text-neutral-300">
              Ready to transform your vision into reality? Our expert team is here to help.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
    
    <!-- Contact Information -->
    <AnimatedSection>
      <section class="py-20">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-3 gap-8 mb-12">
            <div class="contact-card text-center p-8 neumorphic-card">
              <div class="text-4xl mb-4">📧</div>
              <h3 class="text-xl font-bold mb-2 text-neutral-900 dark:text-white">Email Us</h3>
              <a href="mailto:info@pioneerconsultants.com" 
                 class="text-primary-600 hover:text-primary-700 transition-colors">
                info@pioneerconsultants.com
              </a>
            </div>
            
            <div class="contact-card text-center p-8 neumorphic-card">
              <div class="text-4xl mb-4">📞</div>
              <h3 class="text-xl font-bold mb-2 text-neutral-900 dark:text-white">Call Us</h3>
              <p class="text-neutral-600 dark:text-neutral-300">+44 (0) 123 456 7890</p>
            </div>
            
            <div class="contact-card text-center p-8 neumorphic-card">
              <div class="text-4xl mb-4">📍</div>
              <h3 class="text-xl font-bold mb-2 text-neutral-900 dark:text-white">Visit Us</h3>
              <p class="text-neutral-600 dark:text-neutral-300">
                Serving clients across the West Midlands and surrounding areas
              </p>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </AnimatedSection>
    
    <!-- Map Section -->
    <AnimatedSection>
      <section class="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-center mb-8 text-neutral-900 dark:text-white">Our Service Area</h2>
            <div class="aspect-video bg-neutral-200 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
              <p class="text-neutral-500 dark:text-neutral-400">Map Integration Area</p>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  </div>