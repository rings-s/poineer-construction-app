<script>
  import { t } from '$lib/stores/locale.js';
  import { onMount } from 'svelte';
  
  let animatedText = '';
  const fullText = 'Vision to Reality';
  
  onMount(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        animatedText = fullText.slice(0, index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  });
</script>

<section class="hero" style="position: relative; overflow: hidden;">
  <!-- Construction-themed SVG background shapes -->
  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.03; z-index: 0;">
    <!-- Crane silhouette -->
    <svg style="position: absolute; top: 10%; right: 10%; width: 120px; height: 120px;" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 3h-6V1.5L12 0 9 1.5V3H3c-1.1 0-2 .9-2 2v18h2V5h18v18h2V5c0-1.1-.9-2-2-2z"/>
      <path d="M11 7h2v10h-2z"/>
      <path d="M18 7h4v2h-4z"/>
    </svg>
    
    <!-- Building blocks -->
    <svg style="position: absolute; bottom: 15%; left: 8%; width: 80px; height: 80px;" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
    </svg>
    
    <!-- Geometric shapes -->
    <div style="position: absolute; top: 20%; left: 5%; width: 60px; height: 60px; border: 2px solid currentColor; border-radius: 8px; transform: rotate(45deg);"></div>
    <div style="position: absolute; bottom: 25%; right: 15%; width: 40px; height: 40px; border: 2px solid currentColor; border-radius: 50%;"></div>
    <div style="position: absolute; top: 60%; right: 5%; width: 0; height: 0; border-left: 25px solid transparent; border-right: 25px solid transparent; border-bottom: 45px solid currentColor;"></div>
  </div>
  
  <div class="container-wide" style="position: relative; z-index: 1;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-12); align-items: center; min-height: 70vh;">
      <!-- Left content -->
      <div>
        <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: var(--space-3); line-height: 1.1; color: var(--text-dark);">
          {$t('hero.title1')}
          <span style="display: block; color: var(--text-gray); font-weight: 600; border-right: 2px solid var(--text-dark); padding-right: var(--space-2); animation: blink 1s infinite;">
            {animatedText}
          </span>
        </h1>
        
        <p style="font-size: 1.125rem; line-height: 1.6; margin-bottom: var(--space-8); color: var(--text-gray); max-width: 28rem;">
          {$t('hero.subtitle')}
        </p>
        
        <div style="display: flex; gap: var(--space-4); align-items: center;">
          <a href="/services" class="btn-primary" style="padding: var(--space-4) var(--space-8);">
            {$t('hero.cta1')}
          </a>
          
          <a href="/contact" class="btn-secondary" style="padding: var(--space-4) var(--space-8);">
            {$t('hero.cta2')}
          </a>
        </div>
      </div>
      
      <!-- Right visual element -->
      <div style="display: flex; align-items: center; justify-content: center; position: relative;">
        <div style="width: 300px; height: 300px; background: linear-gradient(135deg, var(--text-dark) 0%, var(--text-gray) 100%); border-radius: var(--space-4); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
          <!-- Construction icon -->
          <svg style="width: 120px; height: 120px; color: var(--text-light); z-index: 2;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
          
          <!-- Geometric overlay -->
          <div style="position: absolute; top: 20px; right: 20px; width: 40px; height: 40px; border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 50%; z-index: 1;"></div>
          <div style="position: absolute; bottom: 30px; left: 30px; width: 30px; height: 30px; background: rgba(255, 255, 255, 0.2); border-radius: var(--space-1); transform: rotate(45deg); z-index: 1;"></div>
        </div>
      </div>
    </div>
  </div>
</section>