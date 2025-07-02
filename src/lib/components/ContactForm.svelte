<script>
  import { createEventDispatcher } from 'svelte';
  import { locale, t } from '$lib/stores/locale.js';

  const dispatch = createEventDispatcher();

  // Form state
  let currentStep = 1;
  const totalSteps = 3;
  let isSubmitting = false;
  let isSuccess = false;

  // Form data - only fields from docx
  let formData = {
    name: '',
    email: '',
    phone: '', // optional
    projectType: '',
    message: ''
  };

  // Validation errors
  let errors = {};

  // Step visibility states
  let stepVisible = false;

  // Project types from docx
  const projectTypes = [
    'BIM Modelling',
    'Structural Calculations', 
    'Building Drawings',
    'Interior Design',
    '3D Building Visualisation',
    'Construction Web Design'
  ];

  // Validation functions
  function validateStep(step) {
    errors = {};
    
    switch(step) {
      case 1:
        if (!formData.name.trim()) errors.name = $t('contact.form.fields.name.required');
        if (!formData.email.trim()) errors.email = $t('contact.form.fields.email.required');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Please enter a valid email';
        break;
      case 2:
        if (!formData.projectType) errors.projectType = 'Please select a project type';
        if (!formData.message.trim()) errors.message = $t('contact.form.fields.message.required');
        break;
      case 3:
        // Final review step - no additional validation needed
        break;
    }
    
    return Object.keys(errors).length === 0;
  }

  // Navigation functions
  function nextStep() {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        currentStep++;
        stepVisible = false;
        setTimeout(() => stepVisible = true, 100);
      }
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
      stepVisible = false;
      setTimeout(() => stepVisible = true, 100);
    }
  }

  // Submit function
  async function submitForm() {
    if (!validateStep(2)) return;

    isSubmitting = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      isSuccess = true;
      dispatch('success', formData);
      
      // Reset form after success
      setTimeout(() => {
        formData = {
          name: '', email: '', phone: '', projectType: '', message: ''
        };
        currentStep = 1;
        isSuccess = false;
        stepVisible = true;
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      isSubmitting = false;
    }
  }

  // Initialize step visibility
  import { onMount } from 'svelte';
  onMount(() => {
    setTimeout(() => stepVisible = true, 200);
  });
</script>

<div class="w-full max-w-4xl mx-auto">
  
  <!-- Progress Header -->
  <div class="mb-8 sm:mb-12">
    <div class="flex items-center justify-between mb-6">
      {#each Array(totalSteps) as _, i}
        <div class="flex items-center {i < totalSteps - 1 ? 'flex-1' : ''}">
          <!-- Step Circle -->
          <div class="relative">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 {
              i + 1 < currentStep ? 'bg-green-600 border-green-600 text-white' :
              i + 1 === currentStep ? 'bg-purple-600 border-purple-600 text-white' :
              'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
            }">
              {#if i + 1 < currentStep}
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
              {:else}
                <span class="text-sm font-bold">{i + 1}</span>
              {/if}
            </div>
            
            <!-- Step Label -->
            <div class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span class="text-xs font-medium text-gray-600 dark:text-gray-400 {
                i + 1 === currentStep ? 'text-purple-600 dark:text-purple-400' : ''
              }" class:font-arabic={$locale === 'ar'}>
                {#if i === 0}
                  {$t('contact.form.steps.contact')}
                {:else if i === 1}
                  {$t('contact.form.steps.project')}
                {:else}
                  {$t('contact.form.steps.review')}
                {/if}
              </span>
            </div>
          </div>
          
          <!-- Progress Line -->
          {#if i < totalSteps - 1}
            <div class="flex-1 h-0.5 mx-4 bg-gray-200 dark:bg-gray-700 relative">
              <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-green-600 transition-all duration-1000 {
                i + 1 < currentStep ? 'w-full' : 'w-0'
              }"></div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Form Container -->
  <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
    
    <!-- Step Content -->
    <div class="p-8 sm:p-12">
      
      {#if !isSuccess}
        <!-- Step 1: Contact Information -->
        {#if currentStep === 1}
          <div class="{stepVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'} transition-all duration-500">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-black text-black dark:text-white mb-2" class:font-arabic={$locale === 'ar'}>
                {$t('contact.form.steps.contactSubtitle')}
              </h3>
              <p class="text-gray-600 dark:text-gray-400" style="font-size: 0.875rem;" class:font-arabic={$locale === 'ar'}>
                We'll use this information to get in touch with you about your project.
              </p>
            </div>

            <div class="space-y-6">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" class:font-arabic={$locale === 'ar'}>
                  {$t('contact.form.fields.name.label')} *
                </label>
                <input
                  type="text"
                  bind:value={formData.name}
                  placeholder={$t('contact.form.fields.name.placeholder')}
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  class:border-red-500={errors.name}
                  class:font-arabic={$locale === 'ar'}
                />
                {#if errors.name}
                  <p class="text-red-500 text-xs mt-1" class:font-arabic={$locale === 'ar'}>{errors.name}</p>
                {/if}
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" class:font-arabic={$locale === 'ar'}>
                  {$t('contact.form.fields.email.label')} *
                </label>
                <input
                  type="email"
                  bind:value={formData.email}
                  placeholder={$t('contact.form.fields.email.placeholder')}
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  class:border-red-500={errors.email}
                  class:font-arabic={$locale === 'ar'}
                />
                {#if errors.email}
                  <p class="text-red-500 text-xs mt-1" class:font-arabic={$locale === 'ar'}>{errors.email}</p>
                {/if}
              </div>

              <!-- Phone (Optional) -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" class:font-arabic={$locale === 'ar'}>
                  {$t('contact.form.fields.phone.label')} <span class="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="tel"
                  bind:value={formData.phone}
                  placeholder={$t('contact.form.fields.phone.placeholder')}
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  class:font-arabic={$locale === 'ar'}
                />
              </div>
            </div>
          </div>
        {/if}

        <!-- Step 2: Project Details -->
        {#if currentStep === 2}
          <div class="{stepVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'} transition-all duration-500">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-black text-black dark:text-white mb-2" class:font-arabic={$locale === 'ar'}>
                {$t('contact.form.steps.projectSubtitle')}
              </h3>
              <p class="text-gray-600 dark:text-gray-400" style="font-size: 0.875rem;" class:font-arabic={$locale === 'ar'}>
                Help us understand your project requirements.
              </p>
            </div>

            <div class="space-y-6">
              <!-- Project Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3" class:font-arabic={$locale === 'ar'}>
                  {$t('contact.form.fields.subject.label')} *
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {#each projectTypes as type}
                    <button
                      type="button"
                      on:click={() => formData.projectType = type}
                      class="p-4 rounded-xl border-2 transition-all duration-200 text-left {
                        formData.projectType === type 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                      }"
                      class:font-arabic={$locale === 'ar'}
                      class:text-right={$locale === 'ar'}
                    >
                      <span class="text-xs sm:text-sm font-medium">{type}</span>
                    </button>
                  {/each}
                </div>
                {#if errors.projectType}
                  <p class="text-red-500 text-xs mt-2" class:font-arabic={$locale === 'ar'}>{errors.projectType}</p>
                {/if}
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" class:font-arabic={$locale === 'ar'}>
                  {$t('contact.form.fields.message.label')} *
                </label>
                <textarea
                  bind:value={formData.message}
                  rows="6"
                  placeholder={$t('contact.form.fields.message.placeholder')}
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  class:border-red-500={errors.message}
                  class:font-arabic={$locale === 'ar'}
                ></textarea>
                {#if errors.message}
                  <p class="text-red-500 text-xs mt-1" class:font-arabic={$locale === 'ar'}>{errors.message}</p>
                {/if}
              </div>
            </div>
          </div>
        {/if}

        <!-- Step 3: Review -->
        {#if currentStep === 3}
          <div class="{stepVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'} transition-all duration-500">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-black text-black dark:text-white mb-2" class:font-arabic={$locale === 'ar'}>
                {$t('contact.form.review.title')}
              </h3>
              <p class="text-gray-600 dark:text-gray-400" style="font-size: 0.875rem;" class:font-arabic={$locale === 'ar'}>
                {$t('contact.form.review.subtitle')}
              </p>
            </div>

            <!-- Review Content -->
            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" class:font-arabic={$locale === 'ar'}>Name</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white" class:font-arabic={$locale === 'ar'}>{formData.name}</p>
                </div>
                <div>
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" class:font-arabic={$locale === 'ar'}>Email</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{formData.email}</p>
                </div>
                {#if formData.phone}
                  <div>
                    <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" class:font-arabic={$locale === 'ar'}>Phone</span>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{formData.phone}</p>
                  </div>
                {/if}
                <div>
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" class:font-arabic={$locale === 'ar'}>Project Type</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white" class:font-arabic={$locale === 'ar'}>{formData.projectType}</p>
                </div>
              </div>
              
              {#if formData.message}
                <div class="pt-4 border-t border-gray-200 dark:border-gray-600">
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" class:font-arabic={$locale === 'ar'}>Project Description</span>
                  <p class="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed" class:font-arabic={$locale === 'ar'} class:text-right={$locale === 'ar'}>{formData.message}</p>
                </div>
              {/if}
            </div>
          </div>
        {/if}

      {:else}
        <!-- Success State -->
        <div class="text-center py-8 animate-scale-in">
          <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="text-2xl font-black text-black dark:text-white mb-4" class:font-arabic={$locale === 'ar'}>
            {$t('contact.form.success.title')}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto" style="font-size: 0.875rem;" class:font-arabic={$locale === 'ar'}>
            {$t('contact.form.success.message')}
          </p>
        </div>
      {/if}
    </div>

    <!-- Footer Actions -->
    {#if !isSuccess}
      <div class="bg-gray-50 dark:bg-gray-700/50 px-8 sm:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        <!-- Previous Button -->
        <button
          type="button"
          on:click={prevStep}
          disabled={currentStep === 1}
          class="w-full sm:w-auto px-6 py-3 text-gray-600 dark:text-gray-400 font-medium rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style="font-size: 0.875rem;"
          class:font-arabic={$locale === 'ar'}
        >
          {$t('contact.form.buttons.previous')}
        </button>

        <!-- Step Indicator -->
        <div class="flex items-center space-x-2">
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium" class:font-arabic={$locale === 'ar'}>
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <!-- Next/Submit Button -->
        {#if currentStep < totalSteps}
          <button
            type="button"
            on:click={nextStep}
            class="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 transform-gpu"
            style="font-size: 0.875rem;"
            class:font-arabic={$locale === 'ar'}
          >
            {$t('contact.form.buttons.next')}
          </button>
        {:else}
          <button
            type="button"
            on:click={submitForm}
            disabled={isSubmitting}
            class="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform-gpu flex items-center justify-center"
            style="font-size: 0.875rem;"
            class:font-arabic={$locale === 'ar'}
          >
            {#if isSubmitting}
              <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {$t('contact.form.buttons.sending')}
            {:else}
              {$t('contact.form.buttons.submit')}
            {/if}
          </button>
        {/if}

      </div>
    {/if}

  </div>
</div>

<style>
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scale-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
  }

  .animate-scale-in {
    animation: scale-in 0.6s ease-out forwards;
  }

  .font-arabic {
    font-family: var(--font-family-arabic);
    font-feature-settings: 'liga' 1, 'calt' 1;
    text-rendering: optimizeLegibility;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in-up,
    .animate-scale-in {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
</style>