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
      
      // Animate map placeholder
      gsap.from('.map-container', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power2.out'
      });
    });
    
    const contactInfo = [
      {
        icon: '📧',
        title: 'Email Us',
        content: 'info@pioneerconsultants.com',
        link: 'mailto:info@pioneerconsultants.com'
      },
      {
        icon: '📞',
        title: 'Call Us',
        content: '+44 (0) 123 456 7890',
        link: 'tel:+441234567890'
      },
      {
        icon: '📍',
        title: 'Visit Us',
        content: 'Serving clients across the West Midlands and surrounding areas',
        link: null
      }
    ];
    
    const officeHours = [
      { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
      { day: 'Sunday', hours: 'Closed' }
    ];
  </script>
  
  <svelte:head>
    <title>Contact - Pioneer Consultants Limited</title>
    <meta name="description" content="Get in touch with Pioneer Consultants Limited for your construction consultancy needs." />
  </svelte:head>
  
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800">
      <div class="container mx-auto px-4">
        <AnimatedSection>
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="mb-6">Let's Start Your Next Project Together</h1>
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
          <div class="grid md:grid-cols-3 gap-8 mb-16">
            {#each contactInfo as info, i}
              <div class="contact-card text-center p-8 neumorphic-card hover:scale-105 transition-transform duration-300">
                <div class="text-5xl mb-4">{info.icon}</div>
                <h3 class="text-xl font-bold mb-2">{info.title}</h3>
                {#if info.link}
                  <a href={info.link} 
                     class="text-primary-600 hover:text-primary-700 dark:text-primary-400 
                            dark:hover:text-primary-300 transition-colors">
                    {info.content}
                  </a>
                {:else}
                  <p class="text-neutral-600 dark:text-neutral-300">{info.content}</p>
                {/if}
              </div>
            {/each}
          </div>
          
          <!-- Contact Form and Office Hours -->
          <div class="grid lg:grid-cols-3 gap-12">
            <!-- Contact Form - Takes 2 columns -->
            <div class="lg:col-span-2">
              <ContactForm />
            </div>
            
            <!-- Office Hours -->
            <div>
              <div class="glass-card animate-on-scroll">
                <h3 class="text-2xl font-bold mb-6">Office Hours</h3>
                <div class="space-y-4">
                  {#each officeHours as schedule}
                    <div class="flex justify-between items-center py-3 border-b border-neutral-200 dark:border-neutral-700">
                      <span class="font-medium text-neutral-700 dark:text-neutral-300">{schedule.day}</span>
                      <span class="text-neutral-600 dark:text-neutral-400">{schedule.hours}</span>
                    </div>
                  {/each}
                </div>
                
                <div class="mt-8">
                  <h4 class="font-semibold mb-3">Emergency Support</h4>
                  <p class="text-neutral-600 dark:text-neutral-300 text-sm">
                    For urgent matters outside office hours, please call our emergency line at 
                    <a href="tel:+447000000000" class="text-primary-600 dark:text-primary-400">
                      +44 (0) 700 000 0000
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
    
    <!-- Map Section -->
    <AnimatedSection>
      <section class="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-center mb-8">Our Service Area</h2>
            <div class="map-container aspect-video bg-neutral-200 dark:bg-neutral-800 rounded-lg 
                        flex items-center justify-center overflow-hidden shadow-xl">
              <!-- Replace with actual map integration -->
              <div class="text-center">
                <div class="text-6xl mb-4">🗺️</div>
                <p class="text-neutral-500 dark:text-neutral-400">Interactive Map Coming Soon</p>
                <p class="text-sm text-neutral-400 dark:text-neutral-500 mt-2">
                  We serve clients across the West Midlands and surrounding areas
                </p>
              </div>
            </div>
            
            <!-- Service Areas List -->
            <div class="mt-12 grid md:grid-cols-3 gap-6">
              <div class="text-center">
                <h4 class="font-semibold mb-2">Birmingham</h4>
                <p class="text-neutral-600 dark:text-neutral-300 text-sm">City Centre & Surrounding Areas</p>
              </div>
              <div class="text-center">
                <h4 class="font-semibold mb-2">Coventry</h4>
                <p class="text-neutral-600 dark:text-neutral-300 text-sm">Full Coverage</p>
              </div>
              <div class="text-center">
                <h4 class="font-semibold mb-2">Wolverhampton</h4>
                <p class="text-neutral-600 dark:text-neutral-300 text-sm">Complete Service Area</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
    
    <!-- FAQ Section -->
    <AnimatedSection>
      <section class="py-20">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto">
            <h2 class="text-center mb-12">Frequently Asked Questions</h2>
            
            <div class="space-y-6">
              <details class="glass-card group">
                <summary class="cursor-pointer font-semibold text-lg flex items-center justify-between">
                  How long does a typical project take?
                  <span class="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p class="mt-4 text-neutral-600 dark:text-neutral-300">
                  Project timelines vary depending on scope and complexity. Most residential projects 
                  take 3-6 months, while commercial projects can range from 6-18 months.
                </p>
              </details>
              
              <details class="glass-card group">
                <summary class="cursor-pointer font-semibold text-lg flex items-center justify-between">
                  Do you offer free consultations?
                  <span class="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p class="mt-4 text-neutral-600 dark:text-neutral-300">
                  Yes, we offer a free initial consultation to discuss your project requirements 
                  and provide a preliminary assessment.
                </p>
              </details>
              
              <details class="glass-card group">
                <summary class="cursor-pointer font-semibold text-lg flex items-center justify-between">
                  What areas do you serve?
                  <span class="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p class="mt-4 text-neutral-600 dark:text-neutral-300">
                  We primarily serve the West Midlands region, but we also take on projects 
                  throughout the UK and internationally for select clients.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  </div>