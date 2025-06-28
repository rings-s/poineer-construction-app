<script>
    import { page } from '$app/stores';
  </script>
  
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-primary-600 mb-4">{$page.status}</h1>
      <h2 class="text-2xl font-semibold mb-4">
        {$page.status === 404 ? 'Page Not Found' : 'Something went wrong'}
      </h2>
      <p class="text-neutral-600 dark:text-neutral-300 mb-8">
        {$page.error?.message || 'The page you are looking for does not exist.'}
      </p>
      <a href="/" class="btn-primary inline-block">
        Go Back Home
      </a>
    </div>
  </div>