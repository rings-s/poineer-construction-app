<script>
    export let title = '';
    export let description = '';
    export let icon = '';
    export let link = '';
    
    let hovered = false;
  </script>
  
  <a href={link} 
     class="block h-full neumorphic-card transition-all duration-300 hover:scale-105"
     on:mouseenter={() => hovered = true}
     on:mouseleave={() => hovered = false}>
    <div class="text-4xl mb-4 transition-transform duration-300" 
         class:scale-110={hovered}>
      {icon}
    </div>
    <h3 class="text-xl font-semibold mb-3">{title}</h3>
    <p class="text-neutral-600 dark:text-neutral-300">{description}</p>
    <div class="mt-4 text-primary-600 dark:text-primary-400 font-medium flex items-center">
      Learn more
      <svg class="w-4 h-4 ml-2 transition-transform duration-300" 
           class:translate-x-2={hovered}
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </a>