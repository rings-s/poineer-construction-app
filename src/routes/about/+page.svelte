<script>
  import { t } from '$lib/stores/locale.js';
  
  const milestones = [
    { year: '1998', title: 'about.journey.milestone1.title', description: 'about.journey.milestone1.description' },
    { year: '2005', title: 'about.journey.milestone2.title', description: 'about.journey.milestone2.description' },
    { year: '2010', title: 'about.journey.milestone3.title', description: 'about.journey.milestone3.description' },
    { year: '2015', title: 'about.journey.milestone4.title', description: 'about.journey.milestone4.description' },
    { year: '2020', title: 'about.journey.milestone5.title', description: 'about.journey.milestone5.description' },
    { year: '2024', title: 'about.journey.milestone6.title', description: 'about.journey.milestone6.description' }
  ];
  
  const values = [
    { 
      icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`, 
      title: 'about.values.excellence.title', 
      description: 'about.values.excellence.description' 
    },
    { 
      icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>`, 
      title: 'about.values.integrity.title', 
      description: 'about.values.integrity.description' 
    },
    { 
      icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`, 
      title: 'about.values.innovation.title', 
      description: 'about.values.innovation.description' 
    },
    { 
      icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`, 
      title: 'about.values.sustainability.title', 
      description: 'about.values.sustainability.description' 
    }
  ];
</script>

<svelte:head>
  <title>About - Pioneer Consultants Limited</title>
  <meta name="description" content="Learn about Pioneer Consultants Limited - combining creative vision with viability in construction consultancy across the West Midlands." />
</svelte:head>

<!-- Hero Section -->
<section class="section">
  <div class="container">
    <div style="text-align: center;">
      <h1 style="font-size: 2.5rem; margin-bottom: var(--space-4);">{$t('about.title')}</h1>
      <p style="font-size: 1rem; color: var(--text-gray); max-width: 35rem; margin: 0 auto;">
        {$t('about.subtitle')}
      </p>
    </div>
  </div>
</section>

<!-- Vision & Mission -->
<section class="section" style="background: var(--bg-gray);">
  <div class="container-wide">
    <div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-12);">
      <div class="card">
        <div style="color: var(--text-dark); margin-bottom: var(--space-4);">
          <svg style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
        </div>
        <h2 style="margin-bottom: var(--space-4);">{$t('about.vision.title')}</h2>
        <p style="font-size: 1rem; color: var(--text-gray);">
          {$t('about.vision.description')}
        </p>
      </div>
      
      <div class="card">
        <div style="color: var(--text-dark); margin-bottom: var(--space-4);">
          <svg style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 style="margin-bottom: var(--space-4);">{$t('about.mission.title')}</h2>
        <p style="font-size: 1rem; color: var(--text-gray);">
          {$t('about.mission.description')}
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Core Values -->
<section class="section">
  <div class="container-wide">
    <div style="text-align: center; margin-bottom: var(--space-12);">
      <h2 style="margin-bottom: var(--space-4);">{$t('about.values.title')}</h2>
    </div>
    
    <div class="grid-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); gap: var(--space-10);">
      {#each values as value}
        <div class="value-item" style="display: flex; align-items: flex-start; gap: var(--space-4); text-align: left; padding: var(--space-6); border-radius: var(--space-2); transition: all 0.2s ease;">
          <!-- Icon aligned left for LTR, right for RTL -->
          <div style="flex-shrink: 0; color: var(--text-dark); margin-top: var(--space-1); opacity: 0.8;">
            {@html value.icon}
          </div>
          
          <!-- Content -->
          <div style="flex: 1;">
            <h3 style="margin-bottom: var(--space-3); font-size: 1rem; font-weight: 600; line-height: 1.4; color: var(--text-dark);">
              {$t(value.title)}
            </h3>
            <p style="font-size: 0.875rem; line-height: 1.6; color: var(--text-gray); margin: 0;">
              {$t(value.description)}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>




<!-- CTA Section -->
<section class="section" style="background: var(--text-dark); color: var(--text-light);">
  <div class="container">
    <div style="text-align: center;">
      <h2 style="margin-bottom: var(--space-4); color: var(--text-light);">Ready to work with us?</h2>
      <p style="font-size: 1rem; margin-bottom: var(--space-6); color: var(--text-gray);">
        Let's discuss your next construction project and bring your vision to reality.
      </p>
      <a href="/contact" class="btn-primary" style="background: var(--text-light); color: var(--text-dark);">
        Get in Touch
      </a>
    </div>
  </div>
</section>