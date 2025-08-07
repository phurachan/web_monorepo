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
            <h1 class="text-xl font-semibold text-gray-900">Edit Home Page</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" target="_blank" class="btn-secondary">View Live</NuxtLink>
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
        <!-- Hero Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Hero Section</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="form.heroTitle" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Hero Title</label>
            </div>

            <div class="relative">
              <textarea 
                v-model="form.heroSubtitle" 
                placeholder=" " 
                rows="3" 
                class="form-input resize-none peer"
                required
              ></textarea>
              <label class="floating-label">Hero Subtitle</label>
            </div>

            <ImageUpload 
              v-model="form.heroImage" 
              label="Hero Image (optional)"
            />
          </div>
        </div>

        <!-- Call to Action Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Call to Action</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="form.ctaText" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">CTA Title</label>
            </div>

            <div class="relative">
              <input 
                v-model="form.ctaButtonText" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">CTA Button Text</label>
            </div>
          </div>
        </div>

        <!-- About Preview Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">About Preview</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="form.aboutTitle" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">About Section Title</label>
            </div>

            <div class="relative">
              <textarea 
                v-model="form.aboutDescription" 
                placeholder=" " 
                rows="4" 
                class="form-input resize-none peer"
                required
              ></textarea>
              <label class="floating-label">About Description</label>
            </div>

            <ImageUpload 
              v-model="form.aboutImage" 
              label="About Image (optional)"
            />
          </div>
        </div>

        <!-- People Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">People Section</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="form.peopleTitle" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">People Section Title</label>
            </div>

            <div class="relative">
              <textarea 
                v-model="form.peopleDescription" 
                placeholder=" " 
                rows="3" 
                class="form-input resize-none peer"
                required
              ></textarea>
              <label class="floating-label">People Section Description</label>
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
            {{ saving ? 'Saving...' : 'Save Changes' }}
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
  heroTitle: '',
  heroSubtitle: '',
  heroImage: '',
  ctaText: '',
  ctaButtonText: '',
  aboutTitle: '',
  aboutDescription: '',
  aboutImage: '',
  peopleTitle: '',
  peopleDescription: ''
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
    // const { $fetch } = useNuxtApp()
    const response = await $fetch('/api/cms/home-content')
    
    if (response) {
      form.heroTitle = response.heroTitle || ''
      form.heroSubtitle = response.heroSubtitle || ''
      form.heroImage = response.heroImage || ''
      form.ctaText = response.ctaText || ''
      form.ctaButtonText = response.ctaButtonText || ''
      form.aboutTitle = response.aboutTitle || ''
      form.aboutDescription = response.aboutDescription || ''
      form.aboutImage = response.aboutImage || ''
      form.peopleTitle = response.peopleTitle || 'Meet Our People'
      form.peopleDescription = response.peopleDescription || 'Get to know the talented individuals who drive our success and make exceptional results possible'
    }
  } catch (error) {
    errorMessage.value = 'Failed to load content'
    console.error('Failed to load content:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  saving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    // const { $fetch } = useNuxtApp()
    await $fetch('/api/cms/home-content', {
      method: 'POST',
      body: form
    })

    successMessage.value = 'Home page content updated successfully!'
  } catch (error) {
    errorMessage.value = 'Failed to update content. Please try again.'
    console.error('Failed to update content:', error)
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
  title: `Edit Home Page | ${siteSettings.siteName} CMS`,
  robots: 'noindex, nofollow'
})
</script>