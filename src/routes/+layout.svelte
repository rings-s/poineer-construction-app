<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { locale, t } from '$lib/stores/locale.js';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let mounted = false;
  
	onMount(() => {
	  mounted = true;
	  locale.init();
	});
  </script>
  
  <svelte:head>
	<title>{mounted ? $t('hero.title1') + ' ' + $t('hero.title2') : 'Pioneer Consultants'}</title>
	<meta name="description" content={mounted ? $t('hero.subtitle') : 'Pioneer Consultants - Bringing Vision to Reality'} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </svelte:head>
  
  <!-- Header Component -->
  <Header />
  
  <!-- Main Content -->
  <main>
	<slot />
  </main>
  
  <!-- Footer -->
  <Footer />
  <style>
	.font-arabic {
	  font-family: var(--font-family-arabic);
	}
  </style>