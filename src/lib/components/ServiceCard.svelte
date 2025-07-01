<script>
  import { t } from '$lib/stores/locale.js';
  
  export let title = '';
  export let description = '';
  export let icon = '';
  export let link = '';
</script>

<a href={link} class="service-card" style="text-decoration: none; color: inherit; display: block; height: 100%; background: var(--bg-light); border-radius: var(--space-3); padding: var(--space-5); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); border: 1px solid rgba(0, 0, 0, 0.04); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden;">
  <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; text-align: left; position: relative; z-index: 2; min-height: 16rem;">
    <!-- Icon without background -->
    <div style="color: var(--text-dark); margin-bottom: var(--space-4); flex-shrink: 0; opacity: 0.8; transition: all 0.3s ease;">
      {@html icon}
    </div>
    
    <!-- Title with improved typography -->
    <h3 style="margin-bottom: var(--space-3); flex-shrink: 0; font-size: 1.125rem; font-weight: 600; line-height: 1.3; color: var(--text-dark);">
      {$t(title)}
    </h3>
    
    <!-- Description with better spacing -->
    <p style="margin-bottom: var(--space-3); flex-grow: 1; color: var(--text-gray); font-size: 0.875rem; line-height: 1.5; opacity: 0.9;">
      {$t(description)}
    </p>
    
    <!-- Enhanced CTA with arrow animation -->
    <div style="font-size: 0.8125rem; font-weight: 500; color: var(--text-dark); display: flex; align-items: center; gap: var(--space-2); margin-top: auto;">
      {$t('services.learnMore')}
      <span style="font-size: 0.875rem; transition: transform 0.2s ease; display: inline-block;">→</span>
    </div>
  </div>
  
  <!-- Subtle gradient overlay on hover -->
  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 100%); opacity: 0; transition: opacity 0.3s ease; z-index: 1;"></div>
</a>