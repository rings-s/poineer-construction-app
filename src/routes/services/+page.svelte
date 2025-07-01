<script>
  import { t } from '$lib/stores/locale.js';
  
  const services = [
    {
      id: 'bim',
      icon: `<svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`,
      title: 'services.bim.title',
      description: 'services.bim.description'
    },
    {
      id: 'structural',
      icon: `<svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
      title: 'services.structural.title',
      description: 'services.structural.description'
    },
    {
      id: 'drawings',
      icon: `<svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
      title: 'services.drawings.title',
      description: 'services.drawings.description'
    },
    {
      id: 'interior',
      icon: `<svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z"></path></svg>`,
      title: 'services.interior.title',
      description: 'services.interior.description'
    },
    {
      id: 'visualization',
      icon: `<svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`,
      title: 'services.visualization.title',
      description: 'services.visualization.description'
    },
    {
      id: 'web',
      icon: `<svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>`,
      title: 'services.web.title',
      description: 'services.web.description'
    }
  ];

  const clientTypes = [
    {
      icon: `<svg style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`,
      title: 'services.clientTypes.clients.title',
      description: 'services.clientTypes.clients.description'
    },
    {
      icon: `<svg style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>`,
      title: 'services.clientTypes.contractors.title',
      description: 'services.clientTypes.contractors.description'
    },
    {
      icon: `<svg style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h2v2a2 2 0 01-2 2h-1v11c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V10H6a2 2 0 01-2-2V6h2z"></path></svg>`,
      title: 'services.clientTypes.consultancies.title',
      description: 'services.clientTypes.consultancies.description'
    }
  ];
</script>

<svelte:head>
  <title>Services - Pioneer Consultants Limited</title>
  <meta name="description" content="Comprehensive project management, cost control, and design support services for the construction industry across the West Midlands." />
</svelte:head>

<!-- Hero Section -->
<section class="section">
  <div class="container">
    <div style="text-align: center;">
      <h1 style="font-size: 2.5rem; margin-bottom: var(--space-4);">{$t('services.title')}</h1>
      <p style="font-size: 1rem; color: var(--text-gray); max-width: 35rem; margin: 0 auto;">
        {$t('services.subtitle')}
      </p>
    </div>
  </div>
</section>

<!-- Main Services Grid -->
<section class="section" style="background: var(--bg-gray);">
  <div class="container-wide">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr)); gap: var(--space-6);">
      {#each services as service}
        <div class="card" id={service.id}>
          <div style="color: var(--text-dark); margin-bottom: var(--space-4); opacity: 0.8;">
            {@html service.icon}
          </div>
          <h3 style="margin-bottom: var(--space-3); font-size: 1.125rem; font-weight: 600; color: var(--text-dark);">
            {$t(service.title)}
          </h3>
          <p style="color: var(--text-gray); font-size: 0.875rem; line-height: 1.5; margin: 0;">
            {$t(service.description)}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Client Types Section -->
<section class="section">
  <div class="container-wide">
    <div style="text-align: center; margin-bottom: var(--space-12);">
      <h2 style="margin-bottom: var(--space-4);">{$t('services.clientTypes.title')}</h2>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); gap: var(--space-8);">
      {#each clientTypes as clientType}
        <div class="card" style="text-align: center;">
          <div style="color: var(--text-dark); margin-bottom: var(--space-4); display: flex; justify-content: center; opacity: 0.8;">
            {@html clientType.icon}
          </div>
          <h3 style="margin-bottom: var(--space-4); font-size: 1.25rem; font-weight: 600; color: var(--text-dark);">
            {$t(clientType.title)}
          </h3>
          <p style="color: var(--text-gray); font-size: 0.875rem; line-height: 1.5; margin: 0;">
            {$t(clientType.description)}
          </p>
        </div>
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
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-8); max-width: 50rem; margin: 0 auto;">
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
<section class="section" style="background: var(--text-dark); color: var(--text-light);">
  <div class="container">
    <div style="text-align: center;">
      <h2 style="margin-bottom: var(--space-4); color: var(--text-light);">{$t('services.cta.title')}</h2>
      <p style="font-size: 1rem; margin-bottom: var(--space-6); color: var(--text-gray);">
        {$t('services.cta.subtitle')}
      </p>
      <a href="/contact" class="btn-primary" style="background: var(--text-light); color: var(--text-dark);">
        {$t('services.cta.button')}
      </a>
    </div>
  </div>
</section>