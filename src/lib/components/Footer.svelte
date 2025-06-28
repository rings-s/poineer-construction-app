<script>
    import { t } from '$lib/stores/locale.js';
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    
    const currentYear = new Date().getFullYear();
    
    const footerLinks = {
      company: [
        { label: 'About Us', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' }
      ],
      services: [
        { label: 'BIM Modelling', href: '/services#bim' },
        { label: 'Structural Design', href: '/services#structural' },
        { label: 'Interior Design', href: '/services#interior' },
        { label: '3D Visualization', href: '/services#visualization' }
      ],
      legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Sitemap', href: '/sitemap' }
      ]
    };
    
    const socialLinks = [
      { label: 'LinkedIn', icon: '🔗', href: '#' },
      { label: 'Instagram', icon: '📷', href: '#' },
      { label: 'Twitter', icon: '🐦', href: '#' }
    ];
    
    onMount(() => {
      // Dynamically import ScrollTrigger to avoid SSR issues
      import('gsap/ScrollTrigger').then((module) => {
        const ScrollTrigger = module.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate footer on scroll
        gsap.from('.footer-content', {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: 'footer',
            start: 'top 80%',
            once: true
          }
        });
      });
    });
  </script>
  
  <footer class="bg-neutral-900 text-white pt-16 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8 mb-12">
        <!-- Company Info -->
        <div class="footer-content">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">P</span>
            </div>
            <span class="font-sans font-bold text-xl">Pioneer Consultants</span>
          </div>
          <p class="text-neutral-300 mb-4">
            {$t('footer.description')}
          </p>
          <div class="flex space-x-4">
            {#each socialLinks as social}
              <a href={social.href} 
                 class="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center
                        hover:bg-primary-600 transition-all duration-300 hover:scale-110"
                 aria-label={social.label}>
                <span>{social.icon}</span>
              </a>
            {/each}
          </div>
        </div>
        
        <!-- Company Links -->
        <div class="footer-content">
          <h4 class="font-semibold mb-4 text-white">{$t('footer.company')}</h4>
          <ul class="space-y-2">
            {#each footerLinks.company as link}
              <li>
                <a href={link.href} class="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
        
        <!-- Services Links -->
        <div class="footer-content">
          <h4 class="font-semibold mb-4 text-white">{$t('footer.services')}</h4>
          <ul class="space-y-2">
            {#each footerLinks.services as link}
              <li>
                <a href={link.href} class="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div class="footer-content">
          <h4 class="font-semibold mb-4 text-white">{$t('footer.contact')}</h4>
          <ul class="space-y-2 text-neutral-300">
            <li class="flex items-center space-x-2">
              <span>📧</span>
              <a href="mailto:info@pioneerconsultants.com" 
                 class="hover:text-primary-400 transition-colors duration-300">
                info@pioneerconsultants.com
              </a>
            </li>
            <li class="flex items-center space-x-2">
              <span>📞</span>
              <span>+44 (0) 123 456 7890</span>
            </li>
            <li class="flex items-start space-x-2">
              <span>📍</span>
              <span>Serving clients across the West Midlands and surrounding areas</span>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="border-t border-neutral-800 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-neutral-400 text-sm mb-4 md:mb-0">
            © {currentYear} Pioneer Consultants Limited. {$t('footer.rights')}
          </p>
          <div class="flex space-x-6 text-sm">
            {#each footerLinks.legal as link}
              <a href={link.href} class="text-neutral-400 hover:text-primary-400 transition-colors duration-300">
                {link.label}
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </footer>