<!-- src/lib/components/Footer.svelte -->
<script>
  import { t } from '$lib/stores/locale.js';
    
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    company: [
      { label: 'footer.links.about', href: '/about' },
      { label: 'footer.links.services', href: '/services' },
      { label: 'footer.links.contact', href: '/contact' }
    ],
    services: [
      { label: 'services.bim.title', href: '/services#bim' },
      { label: 'services.structural.title', href: '/services#structural' },
      { label: 'services.interior.title', href: '/services#interior' },
      { label: 'services.visualization.title', href: '/services#visualization' }
    ],
    legal: [
      { label: 'footer.links.privacy', href: '/privacy' },
      { label: 'footer.links.terms', href: '/terms' },
      { label: 'footer.links.sitemap', href: '/sitemap' }
    ]
  };
  
  const socialLinks = [
    { 
      label: 'LinkedIn', 
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"/></svg>`, 
      href: '#' 
    },
    { 
      label: 'Instagram', 
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.167 3.632 2.182 5.65 5.817 5.817C6.944 19.988 7.284 20 10 20s3.056-.012 4.123-.06c3.629-.167 5.652-2.182 5.817-5.817C19.988 13.056 20 12.716 20 10s-.012-3.056-.06-4.123C19.833 2.245 17.815.227 14.183.06 13.056.012 12.716 0 10 0zm0 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clip-rule="evenodd"/></svg>`, 
      href: '#' 
    },
    { 
      label: 'Twitter', 
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>`, 
      href: '#' 
    }
  ];
</script>
  
<footer class="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
  <div class="container-wide">
    <!-- Main Footer Content -->
    <div class="py-16">
      <div class="grid-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="lg:col-span-2">
          <div class="mb-6">
            <h3 class="text-heading-2 font-black bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-4">
              Pioneer Consultants
            </h3>
            <p class="text-body text-neutral-300 leading-relaxed max-w-md">
              {$t('footer.description')}
            </p>
          </div>
          
          <!-- Social Links -->
          <div class="flex space-x-4">
            {#each socialLinks as social}
              <a 
                href={social.href} 
                class="w-10 h-10 bg-neutral-800 hover:bg-gradient-to-br hover:from-primary-600 hover:to-accent-600 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 hover-lift"
                aria-label={social.label}
              >
                {@html social.icon}
              </a>
            {/each}
          </div>
        </div>
        
        <!-- Company Links -->
        <div>
          <h4 class="text-heading-3 font-bold text-white mb-6">{$t('footer.company')}</h4>
          <ul class="space-y-3">
            {#each footerLinks.company as link}
              <li>
                <a 
                  href={link.href} 
                  class="text-body text-neutral-300 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 inline-block transform"
                >
                  {$t(link.label)}
                </a>
              </li>
            {/each}
          </ul>
        </div>
        
        <!-- Services Links -->
        <div>
          <h4 class="text-heading-3 font-bold text-white mb-6">{$t('footer.services')}</h4>
          <ul class="space-y-3">
            {#each footerLinks.services as link}
              <li>
                <a 
                  href={link.href} 
                  class="text-body text-neutral-300 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 inline-block transform"
                >
                  {$t(link.label)}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Contact Info Bar -->
    <div class="py-8 border-t border-neutral-700">
      <div class="grid-3 gap-6 text-center lg:text-left">
        <div class="flex items-center justify-center lg:justify-start">
          <svg class="w-5 h-5 text-primary-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <a href="mailto:info@pioneerconsultants.com" class="text-body text-neutral-300 hover:text-white transition-colors duration-200">
            info@pioneerconsultants.com
          </a>
        </div>
        
        <div class="flex items-center justify-center lg:justify-start">
          <svg class="w-5 h-5 text-primary-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
         </svg>
         <a href="tel:+441234567890" class="text-body text-neutral-300 hover:text-white transition-colors duration-200">
           +44 (0) 123 456 7890
         </a>
       </div>
       
       <div class="flex items-center justify-center lg:justify-start">
         <svg class="w-5 h-5 text-primary-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
         </svg>
         <span class="text-body text-neutral-300">
           West Midlands & Surrounding Areas
         </span>
       </div>
     </div>
   </div>
   
   <!-- Bottom Bar -->
   <div class="py-6 border-t border-neutral-700">
     <div class="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
       <p class="text-caption text-neutral-400">
         © {currentYear} Pioneer Consultants Limited. {$t('footer.rights')}
       </p>
       
       <div class="flex space-x-6">
         {#each footerLinks.legal as link}
           <a 
             href={link.href} 
             class="text-caption text-neutral-400 hover:text-neutral-300 transition-colors duration-200"
           >
             {$t(link.label)}
           </a>
         {/each}
       </div>
     </div>
   </div>
 </div>
</footer>