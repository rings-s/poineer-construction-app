<script>
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    
    let formData = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
    
    let currentStep = 1;
    let isSubmitting = false;
    
    onMount(() => {
      animateStep();
    });
    
    function animateStep() {
      gsap.from('.form-step', {
        x: 50,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
    
    function nextStep() {
      if (currentStep < 3) {
        currentStep++;
        animateStep();
      }
    }
    
    function prevStep() {
      if (currentStep > 1) {
        currentStep--;
        animateStep();
      }
    }
    
    async function handleSubmit() {
      isSubmitting = true;
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      isSubmitting = false;
      alert('Thank you for your message! We will get back to you soon.');
      // Reset form
      formData = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      };
      currentStep = 1;
    }
  </script>
  
  <div class="glass-card">
    <h3 class="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Get in Touch</h3>
    
    <!-- Progress Bar -->
    <div class="mb-8">
      <div class="flex justify-between mb-2">
        <span class="text-sm text-neutral-600 dark:text-neutral-300">Step {currentStep} of 3</span>
        <span class="text-sm text-neutral-600 dark:text-neutral-300">
          {currentStep === 1 ? 'Contact Info' : currentStep === 2 ? 'Project Details' : 'Review & Submit'}
        </span>
      </div>
      <div class="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <div class="h-full bg-primary-600 transition-all duration-500"
             style="width: {(currentStep / 3) * 100}%"></div>
      </div>
    </div>
    
    <form on:submit|preventDefault={handleSubmit}>
      <!-- Step 1: Contact Information -->
      {#if currentStep === 1}
        <div class="form-step space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
              Full Name *
            </label>
            <input type="text" id="name" bind:value={formData.name} required
                   class="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600
                          bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white
                          focus:border-primary-600 focus:outline-none transition-colors" />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
              Email Address *
            </label>
            <input type="email" id="email" bind:value={formData.email} required
                   class="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600
                          bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white
                          focus:border-primary-600 focus:outline-none transition-colors" />
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
              Phone Number
            </label>
            <input type="tel" id="phone" bind:value={formData.phone}
                   class="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600
                          bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white
                          focus:border-primary-600 focus:outline-none transition-colors" />
          </div>
        </div>
      {/if}
      
      <!-- Step 2: Project Details -->
      {#if currentStep === 2}
        <div class="form-step space-y-4">
          <div>
            <label for="subject" class="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
              Subject *
            </label>
            <input type="text" id="subject" bind:value={formData.subject} required
                   class="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600
                          bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white
                          focus:border-primary-600 focus:outline-none transition-colors" />
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
              Message *
            </label>
            <textarea id="message" bind:value={formData.message} required rows="6"
                      class="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600
                             bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white
                             focus:border-primary-600 focus:outline-none transition-colors"></textarea>
          </div>
        </div>
      {/if}
      
      <!-- Step 3: Review & Submit -->
      {#if currentStep === 3}
        <div class="form-step space-y-4">
          <h4 class="font-semibold text-neutral-900 dark:text-white mb-4">Review Your Information</h4>
          
          <div class="space-y-2 text-sm">
            <p class="text-neutral-600 dark:text-neutral-300">
              <span class="font-medium">Name:</span> {formData.name}
            </p>
            <p class="text-neutral-600 dark:text-neutral-300">
              <span class="font-medium">Email:</span> {formData.email}
            </p>
            {#if formData.phone}
              <p class="text-neutral-600 dark:text-neutral-300">
                <span class="font-medium">Phone:</span> {formData.phone}
              </p>
            {/if}
            <p class="text-neutral-600 dark:text-neutral-300">
              <span class="font-medium">Subject:</span> {formData.subject}
            </p>
            <p class="text-neutral-600 dark:text-neutral-300">
              <span class="font-medium">Message:</span> {formData.message}
            </p>
          </div>
        </div>
      {/if}
      
      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-8">
        <button type="button" 
                on:click={prevStep}
                class="px-6 py-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 
                       dark:hover:text-white transition-colors"
                class:invisible={currentStep === 1}>
          ← Previous
        </button>
        
        {#if currentStep < 3}
          <button type="button" 
                  on:click={nextStep}
                  class="btn-primary">
            Next →
          </button>
        {:else}
          <button type="submit" 
                  disabled={isSubmitting}
                  class="btn-primary">
            {isSubmitting ? 'Sending...' : 'Submit Message'}
          </button>
        {/if}
      </div>
    </form>
  </div>