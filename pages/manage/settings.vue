<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/manage" class="text-blue-600 hover:text-blue-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </NuxtLink>
            <h1 class="text-xl font-semibold text-gray-900">Site Settings</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <button @click="handleLogout" class="btn-secondary">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Site Identity -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Site Identity</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="form.siteName" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Site Name</label>
            </div>

            <div class="relative">
              <input 
                v-model="form.siteTagline" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Site Tagline</label>
            </div>

            <ImageUpload 
              v-model="form.logo" 
              label="Site Logo (optional)"
            />

            <ImageUpload 
              v-model="form.favicon" 
              label="Site Favicon (optional)"
            />
          </div>
        </div>

        <!-- Brand Colors -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Brand Colors</h2>
          
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input 
                  v-model="form.primaryColor" 
                  type="color" 
                  class="w-16 h-16 border-2 border-gray-300 rounded-lg cursor-pointer"
                >
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <input 
                  v-model="form.primaryColor" 
                  type="text" 
                  placeholder="#6495ed" 
                  class="form-input"
                  pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                >
              </div>
            </div>
            <p class="text-sm text-gray-600">
              This color will be used for buttons, links, and other brand elements across the site.
            </p>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Social Media Links</h2>
          
          <div class="space-y-4">
            <div v-for="(value, platform) in socialLinks" :key="platform" class="relative">
              <input 
                v-model="socialLinks[platform]" 
                type="url" 
                placeholder=" "
                class="form-input peer"
              >
              <label class="floating-label capitalize">{{ platform }} URL</label>
              <p class="text-xs text-gray-500 mt-1">e.g., https://{{ platform }}.com/yourcompany</p>
            </div>
          </div>
        </div>

        <!-- SEO Settings -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">SEO Settings</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <textarea 
                v-model="form.metaDescription" 
                placeholder=" " 
                rows="3" 
                class="form-input resize-none peer"
                maxlength="160"
              ></textarea>
              <label class="floating-label">Meta Description (160 chars max)</label>
              <p class="text-sm text-gray-500 mt-1">{{ form.metaDescription.length }}/160 characters</p>
            </div>

            <div class="relative">
              <input 
                v-model="form.keywords" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
              >
              <label class="floating-label">Keywords (comma separated)</label>
            </div>
          </div>
        </div>

        <!-- Contact Settings -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Global Contact Settings</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="form.contactEmail" 
                type="email" 
                placeholder=" " 
                class="form-input peer"
              >
              <label class="floating-label">Main Contact Email</label>
            </div>

            <div class="relative">
              <input 
                v-model="form.contactPhone" 
                type="tel" 
                placeholder=" " 
                class="form-input peer"
              >
              <label class="floating-label">Main Contact Phone</label>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end space-x-4">
          <NuxtLink to="/manage" class="btn-secondary">Cancel</NuxtLink>
          <button 
            type="submit" 
            :disabled="saving"
            class="btn-primary"
          >
            {{ saving ? 'Saving...' : 'Save Settings' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="successMessage" class="fixed top-20 right-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-xl z-50">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-green-700 font-medium">{{ successMessage }}</p>
      </div>
    </div>

    <div v-if="errorMessage" class="fixed top-20 right-4 p-4 bg-red-50 border border-red-200 rounded-lg shadow-xl z-50">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-700 font-medium">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: false
})

const { logout } = useAuth()
const { getSiteSettings } = useCMS()
const siteSettings = await getSiteSettings()

// Form data
const form = reactive({
  siteName: '',
  siteTagline: '',
  logo: '',
  favicon: '',
  primaryColor: '#6495ed',
  metaDescription: '',
  keywords: '',
  contactEmail: '',
  contactPhone: ''
})

// Social links (separate reactive object)
const socialLinks = reactive({
  facebook: '',
  twitter: '',
  instagram: '',
  linkedin: '',
  youtube: ''
})

// Component state
const loading = ref(true)
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Load existing content
onMounted(async () => {
  await loadContent()
})

const loadContent = async () => {
  try {
    const response = await $fetch('/api/cms/site-settings')
    
    if (response) {
      form.siteName = response.siteName || ''
      form.siteTagline = response.siteTagline || ''
      form.logo = response.logo || ''
      form.favicon = response.favicon || ''
      form.primaryColor = response.primaryColor || '#6495ed'
      form.metaDescription = response.metaDescription || ''
      form.keywords = response.keywords || ''
      form.contactEmail = response.contactEmail || ''
      form.contactPhone = response.contactPhone || ''
      
      // Parse social links JSON
      if (response.socialLinks) {
        try {
          const links = JSON.parse(response.socialLinks)
          Object.assign(socialLinks, links)
        } catch (e) {
          console.error('Failed to parse social links:', e)
        }
      }
    }
  } catch (error) {
    errorMessage.value = 'Failed to load settings'
    console.error('Failed to load settings:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  saving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const payload = {
      ...form,
      socialLinks: JSON.stringify(socialLinks)
    }

    await $fetch('/api/cms/site-settings', {
      method: 'POST',
      body: payload
    })

    successMessage.value = 'Site settings updated successfully!'
  } catch (error) {
    errorMessage.value = 'Failed to update settings. Please try again.'
    console.error('Failed to update settings:', error)
  } finally {
    saving.value = false
  }
}

const handleLogout = async () => {
  await logout()
}

// Clear messages after 5 seconds
watch([successMessage, errorMessage], () => {
  if (successMessage.value || errorMessage.value) {
    setTimeout(() => {
      successMessage.value = ''
      errorMessage.value = ''
    }, 5000)
  }
})

// SEO
useSeoMeta({
  title: `Site Settings | ${siteSettings.siteName} CMS`,
  robots: 'noindex, nofollow'
})
</script>