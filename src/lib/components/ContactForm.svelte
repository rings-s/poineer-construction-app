<script>
  import { t } from '$lib/stores/locale.js';
  
  let formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };
  
  let isSubmitting = false;
  
  async function handleSubmit() {
    isSubmitting = true;
    await new Promise(resolve => setTimeout(resolve, 2000));
    isSubmitting = false;
    
    formData = { name: '', email: '', phone: '', subject: '', message: '' };
    alert($t('contact.form.success.message'));
  }
</script>

<div class="card p-8">
  <h3 class="text-accent m-4">
    {$t('contact.form.title')}
  </h3>
  
  
  <form on:submit|preventDefault={handleSubmit}>
    <div class="space-6">
      <div>
        <label for="name" class="label">
          {$t('contact.form.fields.name.label')}
        </label>
        <input 
          type="text" 
          id="name" 
          bind:value={formData.name} 
          required
          style="width: 100%; padding: var(--space-4); border: 1px solid var(--text-dark); border-radius: var(--space-1);"
          placeholder="{$t('contact.form.fields.name.placeholder')}" />
      </div>
      
      <div>
        <label for="email" class="label">
          {$t('contact.form.fields.email.label')}
        </label>
        <input 
          type="email" 
          id="email" 
          bind:value={formData.email} 
          required
          style="width: 100%; padding: var(--space-4); border: 1px solid var(--text-dark); border-radius: var(--space-1);"
          placeholder="{$t('contact.form.fields.email.placeholder')}" />
      </div>
      
      <div>
        <label for="phone" class="label">
          {$t('contact.form.fields.phone.label')}
        </label>
        <input 
          type="tel" 
          id="phone" 
          bind:value={formData.phone}
          style="width: 100%; padding: var(--space-4); border: 1px solid var(--text-dark); border-radius: var(--space-1);"
          placeholder="{$t('contact.form.fields.phone.placeholder')}" />
      </div>
      
      <div>
        <label for="subject" class="label">
          {$t('contact.form.fields.subject.label')}
        </label>
        <input 
          type="text" 
          id="subject" 
          bind:value={formData.subject} 
          required
          style="width: 100%; padding: var(--space-4); border: 1px solid var(--text-dark); border-radius: var(--space-1);"
          placeholder="{$t('contact.form.fields.subject.placeholder')}" />
      </div>
      
      <div>
        <label for="message" class="label">
          {$t('contact.form.fields.message.label')}
        </label>
        <textarea 
          id="message" 
          bind:value={formData.message} 
          required 
          rows="6"
          style="width: 100%; padding: var(--space-4); border: 1px solid var(--text-dark); border-radius: var(--space-1); resize: none;"
          placeholder="{$t('contact.form.fields.message.placeholder')}"></textarea>
      </div>
    </div>
    
    <button 
      type="submit" 
      disabled={isSubmitting}
      class="btn-primary m-6">
      {#if isSubmitting}
        {$t('contact.form.buttons.sending')}
      {:else}
        {$t('contact.form.buttons.submit')}
      {/if}
    </button>
  </form>
</div>

