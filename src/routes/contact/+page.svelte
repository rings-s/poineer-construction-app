<script>
  import { t } from '$lib/stores/locale.js';
  import ContactForm from '$lib/components/ContactForm.svelte';
  
  const contactInfo = [
    {
      icon: `<svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
      title: 'contact.info.email.title',
      content: 'contact.info.email.value',
      link: 'mailto:info@pioneerconsultants.com'
    },
    {
      icon: `<svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>`,
      title: 'contact.info.phone.title',
      content: 'contact.info.phone.value',
      link: 'tel:+441234567890'
    },
    {
      icon: `<svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
      title: 'contact.info.location.title',
      content: 'contact.info.location.value',
      link: null
    }
  ];
</script>

<svelte:head>
  <title>Contact - Pioneer Consultants Limited</title>
  <meta name="description" content="Get in touch with Pioneer Consultants Limited for your construction consultancy needs across the West Midlands." />
</svelte:head>

<!-- Hero Section -->
<section class="section">
  <div class="container">
    <div style="text-align: center;">
      <h1 style="font-size: 2.5rem; margin-bottom: var(--space-4);">{$t('contact.hero.title')}</h1>
      <p style="font-size: 1rem; color: var(--text-gray); max-width: 35rem; margin: 0 auto;">
        {$t('contact.hero.subtitle')}
      </p>
    </div>
  </div>
</section>

<!-- Contact Information -->
<section class="section" style="background: var(--bg-gray);">
  <div class="container-wide">
    <div class="grid-3" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: var(--space-6); margin-bottom: var(--space-12);">
      {#each contactInfo as info}
        <div class="card" style="text-align: center;">
          <div style="color: var(--text-dark); margin-bottom: var(--space-4); display: flex; justify-content: center;">
            {@html info.icon}
          </div>
          <h3 style="margin-bottom: var(--space-3);">{$t(info.title)}</h3>
          {#if info.link}
            <a href={info.link} style="color: var(--text-dark); text-decoration: none; font-weight: 500;">
              {$t(info.content)}
            </a>
          {:else}
            <p style="color: var(--text-gray);">{$t(info.content)}</p>
          {/if}
        </div>
      {/each}
    </div>
    
    <!-- Contact Form and Office Hours -->
    <div class="grid-2" style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-10);">
      <!-- Contact Form -->
      <div>
        <ContactForm />
      </div>
      
      <!-- Office Hours -->
      <div class="card">
        <h3 style="margin-bottom: var(--space-4);">{$t('contact.office.title')}</h3>
        <div style="margin-bottom: var(--space-4);">
          <div style="display: flex; justify-content: space-between; padding: var(--space-2) 0; border-bottom: 1px solid var(--bg-gray);">
            <span class="subtitle" style="color: var(--text-dark);">Monday - Friday</span>
            <span style="font-size: 0.75rem; color: var(--text-gray);">9:00 AM - 6:00 PM</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: var(--space-2) 0; border-bottom: 1px solid var(--bg-gray);">
            <span class="subtitle" style="color: var(--text-dark);">Saturday</span>
            <span style="font-size: 0.75rem; color: var(--text-gray);">10:00 AM - 4:00 PM</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: var(--space-2) 0;">
            <span class="subtitle" style="color: var(--text-dark);">Sunday</span>
            <span style="font-size: 0.75rem; color: var(--text-gray);">Closed</span>
          </div>
        </div>
        
        <div>
          <h4 class="subtitle" style="margin-bottom: var(--space-3); color: var(--text-dark);">{$t('contact.office.emergency')}</h4>
          <p style="font-size: 0.75rem;">
            {$t('contact.office.emergencyText')}
            <a href="tel:+447000000000" style="color: var(--text-dark); font-weight: 500;">
              +44 (0) 700 000 0000
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Service Area Section -->
<section class="section">
  <div class="container-wide">
    <h2 style="text-align: center; margin-bottom: var(--space-8);">{$t('contact.serviceArea.title')}</h2>
    <div style="aspect-ratio: 16/9; background: var(--bg-gray); border-radius: var(--space-2); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-8);">
      <div style="text-align: center;">
        <div style="color: var(--text-gray); margin-bottom: var(--space-3); display: flex; justify-content: center;">
          <svg style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
          </svg>
        </div>
        <p style="color: var(--text-gray); font-weight: 500;">Interactive Map Coming Soon</p>
        <p class="subtitle" style="margin-top: var(--space-2); color: var(--text-gray);">
          {$t('contact.serviceArea.subtitle')}
        </p>
      </div>
    </div>
    
    <!-- Service Areas List -->
    <div class="grid-3" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); gap: var(--space-6);">
      <div style="text-align: center;">
        <h4 class="subtitle" style="margin-bottom: var(--space-2); color: var(--text-dark);">Birmingham</h4>
        <p style="font-size: 0.75rem; color: var(--text-gray);">{$t('contact.serviceArea.areas.birmingham')}</p>
      </div>
      <div style="text-align: center;">
        <h4 class="subtitle" style="margin-bottom: var(--space-2); color: var(--text-dark);">Coventry</h4>
        <p style="font-size: 0.75rem; color: var(--text-gray);">{$t('contact.serviceArea.areas.coventry')}</p>
      </div>
      <div style="text-align: center;">
        <h4 class="subtitle" style="margin-bottom: var(--space-2); color: var(--text-dark);">Wolverhampton</h4>
        <p style="font-size: 0.75rem; color: var(--text-gray);">{$t('contact.serviceArea.areas.wolverhampton')}</p>
      </div>
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section class="section" style="background: var(--bg-gray);">
  <div class="container">
    <h2 style="text-align: center; margin-bottom: var(--space-8);">{$t('contact.faq.title')}</h2>
    
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      <details class="card">
        <summary style="cursor: pointer; font-weight: 600; font-size: 0.875rem; display: flex; justify-content: space-between; align-items: center;">
          {$t('contact.faq.questions.timeline.question')}
          <span style="font-size: 1.25rem; color: var(--text-gray);">+</span>
        </summary>
        <p style="margin-top: var(--space-3); font-size: 0.875rem; color: var(--text-gray);">
          {$t('contact.faq.questions.timeline.answer')}
        </p>
      </details>
      
      <details class="card">
        <summary style="cursor: pointer; font-weight: 600; font-size: 0.875rem; display: flex; justify-content: space-between; align-items: center;">
          {$t('contact.faq.questions.consultation.question')}
          <span style="font-size: 1.25rem; color: var(--text-gray);">+</span>
        </summary>
        <p style="margin-top: var(--space-3); font-size: 0.875rem; color: var(--text-gray);">
          {$t('contact.faq.questions.consultation.answer')}
        </p>
      </details>
      
      <details class="card">
        <summary style="cursor: pointer; font-weight: 600; font-size: 0.875rem; display: flex; justify-content: space-between; align-items: center;">
          {$t('contact.faq.questions.areas.question')}
          <span style="font-size: 1.25rem; color: var(--text-gray);">+</span>
        </summary>
        <p style="margin-top: var(--space-3); font-size: 0.875rem; color: var(--text-gray);">
          {$t('contact.faq.questions.areas.answer')}
        </p>
      </details>
      
      <details class="card">
        <summary style="cursor: pointer; font-weight: 600; font-size: 0.875rem; display: flex; justify-content: space-between; align-items: center;">
          {$t('contact.faq.questions.contractors.question')}
          <span style="font-size: 1.25rem; color: var(--text-gray);">+</span>
        </summary>
        <p style="margin-top: var(--space-3); font-size: 0.875rem; color: var(--text-gray);">
          {$t('contact.faq.questions.contractors.answer')}
        </p>
      </details>
    </div>
  </div>
</section>