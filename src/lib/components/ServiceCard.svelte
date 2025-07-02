<script>
  import { t } from '$lib/stores/locale.js';
  
  export let title = '';
  export let description = '';
  export let icon = '';
  export let delay = 0;
</script>

<div class="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-lg dark:hover:shadow-gray-900/20 hover:-translate-y-1 transition-all duration-300 transform-gpu animate-fade-in-up"
     style="animation-delay: {delay}ms;">
  
  <!-- Icon -->
  <div class="mb-4 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
    {@html icon}
  </div>
  
  <!-- Title -->
  <h3 class="text-sm font-bold text-black dark:text-white mb-3 leading-tight" class:font-arabic={title.includes('ar.')}>
    {$t(title)}
  </h3>
  
  <!-- Description -->
  <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4" class:font-arabic={description.includes('ar.')}>
    {$t(description)}
  </p>
  
  <!-- Learn More Link -->
  <div class="flex items-center text-xs font-medium text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
    <span class:font-arabic={$t('services.learnMore').length > 10}>{$t('services.learnMore')}</span>
    <svg class="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
    </svg>
  </div>
  
  <!-- Hover Effect -->
  <div class="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
</div>