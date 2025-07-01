<!-- src/lib/components/Hero.svelte -->
<script>
  import { t } from '$lib/stores/locale.js';
</script>

<section class="hero bg-light text-dark" style="min-height: 80vh; display: flex; align-items: center;">
  <div class="container" style="max-width: 1200px;">
    <div style="text-align: center; max-width: 800px; margin: 0 auto;">
      <h1 style="margin-bottom: var(--space-6); font-size: 3rem; line-height: 1.2;">
        {$t('hero.title1')}
      </h1>
      <h2 style="margin-bottom: var(--space-8); font-size: 1.5rem; line-height: 1.4;">
        {$t('hero.title2')}
      </h2>
      
      <p style="margin-bottom: var(--space-10); font-size: 1.1rem; line-height: 1.6; max-width: 600px; margin-left: auto; margin-right: auto;">
        {$t('hero.subtitle')}
      </p>
      
      <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap;">
        <a href="/services" class="btn-primary" style="padding: var(--space-5) var(--space-8); font-size: 1rem;">
          {$t('hero.cta1')}
        </a>
        
        <a href="/contact" class="btn-secondary" style="padding: var(--space-5) var(--space-8); font-size: 1rem;">
          {$t('hero.cta2')}
        </a>
      </div>
    </div>
  </div>
</section>

