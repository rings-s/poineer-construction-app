<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { browser } from '$app/environment';
	import { animations } from '$lib/utils/animations.js';
	
	let mounted = false;
	
	onMount(() => {
	  mounted = true;
	  
	  // Initialize animations
	  animations.init();
	  
	  // Intersection Observer for animations
	  const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
		  if (entry.isIntersecting) {
			entry.target.classList.add('animate-in');
		  }
		});
	  }, { threshold: 0.1 });
	  
	  document.querySelectorAll('.animate-on-scroll').forEach(el => {
		observer.observe(el);
	  });
	  
	  return () => {
		observer.disconnect();
		animations.destroy();
	  };
	});
	
	// Page transition state
	let transitioning = false;
	
	$: if (browser && mounted) {
	  transitioning = true;
	  setTimeout(() => transitioning = false, 300);
	}
  </script>
  
  <div class="min-h-screen flex flex-col">
	<Header />
	
	<main class="flex-grow relative overflow-hidden">
	  {#if transitioning}
		<div class="fixed inset-0 bg-primary-600 z-50 transition-transform duration-300"
			 style="transform: translateX({transitioning ? '0' : '100%'})">
		</div>
	  {/if}
	  
	  <slot />
	</main>
	
	<Footer />
  </div>
  
  <style>
	:global(.animate-on-scroll) {
	  opacity: 0;
	  transform: translateY(30px);
	  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}
	
	:global(.animate-on-scroll.animate-in) {
	  opacity: 1;
	  transform: translateY(0);
	}
  </style>