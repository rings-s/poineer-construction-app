<script>
    import { onMount } from 'svelte';
    
    let sectionRef;
    let visible = false;
    
    onMount(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible = true;
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
      
      if (sectionRef) observer.observe(sectionRef);
      
      return () => observer.disconnect();
    });
  </script>
  
  <div bind:this={sectionRef} class:visible>
    <slot />
  </div>
  
  <style>
    div {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .visible {
      opacity: 1;
      transform: translateY(0);
    }
  </style>