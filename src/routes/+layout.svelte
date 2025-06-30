<!-- src/routes/+layout.svelte (CSS-Only Version) -->
<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { browser } from '$app/environment';
	import { animations } from '$lib/utils/animations.js';
	
	let mounted = false;
	let currentPath = '';
	
	$: if (browser) {
	  currentPath = $page.url.pathname;
	}
	
	onMount(() => {
	  mounted = true;
	  animations.init();
	  
	  // Setup scroll animations
	  const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
		  if (entry.isIntersecting) {
			entry.target.classList.add('animate-in');
		  }
		});
	  }, { threshold: 0.1 });
	  
	  const observeElements = () => {
		document.querySelectorAll('.animate-on-scroll:not(.animate-in)').forEach(el => {
		  observer.observe(el);
		});
	  };
	  
	  // Initial observation
	  setTimeout(observeElements, 100);
	  
	  // Re-observe on navigation
	  const unsubscribe = page.subscribe(() => {
		if (mounted) {
		  setTimeout(observeElements, 300);
		}
	  });
	  
	  return () => {
		observer.disconnect();
		unsubscribe();
		animations.cleanup();
	  };
	});
  </script>
  
  <svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  </svelte:head>
  
  <div class="min-h-screen flex flex-col page-wrapper">
	<Header />
	
	<main class="flex-grow relative pt-16">
	  {#key currentPath}
		<div class="page-container page-fade-in">
		  <slot />
		</div>
	  {/key}
	</main>
	
	<Footer />
  </div>
  
  <style>
	.page-container {
	  width: 100%;
	  min-height: calc(100vh - 4rem);
	}
	
	.page-fade-in {
	  animation: pageEntry 0.5s ease-out forwards;
	}
	
	@keyframes pageEntry {
	  from {
		opacity: 0;
		transform: translateY(20px);
	  }
	  to {
		opacity: 1;
		transform: translateY(0);
	  }
	}
	
	:global(.animate-on-scroll) {
	  opacity: 0;
	  transform: translateY(30px);
	  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}
	
	:global(.animate-on-scroll.animate-in) {
	  opacity: 1;
	  transform: translateY(0);
	}
	
	/* Respect reduced motion preferences */
	@media (prefers-reduced-motion: reduce) {
	  .page-fade-in {
		animation: none;
	  }
	  
	  :global(.animate-on-scroll) {
		animation: none;
		transition: none;
		opacity: 1;
		transform: none;
	  }
	}
  </style>