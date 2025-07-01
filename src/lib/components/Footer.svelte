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
    { label: 'LinkedIn', icon: '🔗', href: '#' },
    { label: 'Instagram', icon: '📷', href: '#' },
    { label: 'Twitter', icon: '🐦', href: '#' }
  ];
</script>
  
<footer class="section bg-dark text-light">
  <div class="container">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-8);">
      <!-- Company Info -->
      <div>
        <div class="text-accent" style="font-weight: 600;">
          Pioneer Consultants
        </div>
        <p class="m-4">
          {$t('footer.description')}
        </p>
        <div style="display: flex; gap: var(--space-3);">
          {#each socialLinks as social}
            <a href={social.href} 
               class="text-light"
               aria-label={social.label}>
              <span>{social.icon}</span>
            </a>
          {/each}
        </div>
      </div>
      
      <!-- Company Links -->
      <div>
        <h4 class="subtitle text-light m-3">{$t('footer.company')}</h4>
        <div class="space-3">
          {#each footerLinks.company as link}
            <div>
              <a href={link.href} class="text-light">
                {$t(link.label)}
              </a>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Services Links -->
      <div>
        <h4 class="subtitle text-light m-3">{$t('footer.services')}</h4>
        <div class="space-3">
          {#each footerLinks.services as link}
            <div>
              <a href={link.href} class="text-light">
                {$t(link.label)}
              </a>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Contact Info -->
      <div>
        <h4 class="subtitle text-light m-3">{$t('footer.contact')}</h4>
        <div class="space-3">
          <div>
            <a href="mailto:info@pioneerconsultants.com" class="text-light">
              info@pioneerconsultants.com
            </a>
          </div>
          <div class="text-light">
            +44 (0) 123 456 7890
          </div>
          <div class="text-light">
            West Midlands and surrounding areas
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div style="border-top: 1px solid var(--text-light); padding-top: var(--space-4); margin-top: var(--space-8);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <p class="text-light">
          © {currentYear} Pioneer Consultants Limited. {$t('footer.rights')}
        </p>
        <div style="display: flex; gap: var(--space-4);">
          {#each footerLinks.legal as link}
            <a href={link.href} class="text-light">
              {$t(link.label)}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</footer>