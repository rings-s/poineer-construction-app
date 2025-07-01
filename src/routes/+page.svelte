<script>
  import Hero from '$lib/components/Hero.svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import { t } from '$lib/stores/locale.js';
  
  const services = [
    {
      title: 'services.bim.title',
      description: 'services.bim.description',
      icon: `<svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`,
      link: '/services#bim'
    },
    {
      title: 'services.structural.title',
      description: 'services.structural.description',
      icon: `<svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
      link: '/services#structural'
    },
    {
      title: 'services.interior.title',
      description: 'services.interior.description',
      icon: `<svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z"></path></svg>`,
      link: '/services#interior'
    },
    {
      title: 'services.visualization.title',
      description: 'services.visualization.description',
      icon: `<svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`,
      link: '/services#visualization'
    }
  ];
</script>

<svelte:head>
  <title>Pioneer Consultants Limited - Bringing Vision to Reality</title>
  <meta name="description" content="Pioneer Consultants Limited specializes in innovative construction consultancy, BIM modeling, structural design, and project management services across the West Midlands." />
</svelte:head>

<Hero />

<!-- About Section -->
<section class="section" style="background: var(--bg-gray);">
  <div class="container-wide">
    <div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-12); align-items: center;">
      <div>
        <h2 style="margin-bottom: var(--space-4);">{$t('about.title')}</h2>
        <p style="font-size: 1rem; margin-bottom: var(--space-4); color: var(--text-gray);">
          {$t('about.description1')}
        </p>
        <p style="font-size: 1rem; margin-bottom: var(--space-6); color: var(--text-gray);">
          {$t('about.description2')}
        </p>
        <a href="/about" class="btn-primary">
          {$t('about.cta')}
        </a>
      </div>
      
      <div style="display: flex; align-items: center; justify-content: center; min-height: 16rem; background: var(--text-dark); color: var(--text-light); border-radius: var(--space-2); font-size: 3rem; font-weight: 700;">
        PCL
      </div>
    </div>
  </div>
</section>

<!-- Services Section -->
<section class="section">
  <div class="container-wide">
    <div style="text-align: center; margin-bottom: var(--space-12);">
      <h2 style="margin-bottom: var(--space-4);">{$t('services.title')}</h2>
      <p style="font-size: 1rem; max-width: 35rem; margin: 0 auto; color: var(--text-gray);">
        {$t('services.subtitle')}
      </p>
    </div>
    
    <div class="grid-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: var(--space-5);">
      {#each services as service}
        <ServiceCard {...service} />
      {/each}
    </div>
  </div>
</section>



<!-- Sectors Section -->
<section class="section" style="background: var(--bg-gray);">
  <div class="container-wide">
    <div style="text-align: center; margin-bottom: var(--space-12);">
      <h2 style="margin-bottom: var(--space-4);">{$t('services.sectors.title')}</h2>
      <p style="font-size: 1rem; max-width: 35rem; margin: 0 auto; color: var(--text-gray);">
        {$t('services.sectors.subtitle')}
      </p>
    </div>
    
    <div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-8); max-width: 50rem; margin: 0 auto;">
      <div class="card" style="text-align: center;">
        <div style="width: 4rem; height: 4rem; background: var(--text-dark); margin: 0 auto var(--space-4); border-radius: var(--space-2); display: flex; align-items: center; justify-content: center;">
          <svg style="width: 2rem; height: 2rem; color: var(--text-light);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
        </div>
        <h3 style="margin-bottom: var(--space-3);">
          {$t('services.sectors.infrastructure.title')}
        </h3>
        <p style="color: var(--text-gray);">
          {$t('services.sectors.infrastructure.description')}
        </p>
      </div>
      
      <div class="card" style="text-align: center;">
        <div style="width: 4rem; height: 4rem; background: var(--text-dark); margin: 0 auto var(--space-4); border-radius: var(--space-2); display: flex; align-items: center; justify-content: center;">
          <svg style="width: 2rem; height: 2rem; color: var(--text-light);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <h3 style="margin-bottom: var(--space-3);">
          {$t('services.sectors.construction.title')}
        </h3>
        <p style="color: var(--text-gray);">
          {$t('services.sectors.construction.description')}
        </p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section">
  <div class="container">
    <div style="text-align: center;">
      <h2 style="margin-bottom: var(--space-4);">{$t('cta.title')}</h2>
      <p style="font-size: 1rem; margin-bottom: var(--space-6); color: var(--text-gray);">
        {$t('cta.subtitle')}
      </p>
      <a href="/contact" class="btn-primary">
        {$t('cta.button')}
      </a>
    </div>
  </div>
</section>