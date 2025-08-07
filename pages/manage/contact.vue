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
            <h1 class="text-xl font-semibold text-gray-900">Edit Contact Page</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <NuxtLink to="/contact" target="_blank" class="btn-secondary">View Live</NuxtLink>
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
        <!-- Banner Image -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Banner Image</h2>
          <ImageUpload 
            v-model="form.bannerImage" 
            label="Contact Page Banner (optional)"
          />
        </div>

        <!-- Page Content -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Page Content</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="form.title" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Page Title</label>
            </div>

            <div class="relative">
              <textarea 
                v-model="form.subtitle" 
                placeholder=" " 
                rows="3" 
                class="form-input resize-none peer"
                required
              ></textarea>
              <label class="floating-label">Page Subtitle</label>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="form.phone" 
                type="tel" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Phone Number</label>
            </div>

            <div class="relative">
              <input 
                v-model="form.email" 
                type="email" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Email Address</label>
            </div>

            <div class="relative">
              <textarea 
                v-model="form.address" 
                placeholder=" " 
                rows="3" 
                class="form-input resize-none peer"
                required
              ></textarea>
              <label class="floating-label">Physical Address</label>
            </div>
          </div>
        </div>

        <!-- Business Hours -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Business Hours</h2>
          
          <div class="space-y-4">
            <div v-for="(hours, day) in businessHours" :key="day" class="flex items-center space-x-4">
              <div class="w-24">
                <label class="text-sm font-medium text-gray-700">{{ day }}</label>
              </div>
              <div class="flex-1">
                <input 
                  v-model="businessHours[day]" 
                  type="text" 
                  placeholder="e.g., 9:00 AM - 5:00 PM or Closed"
                  class="form-input"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Map Embed -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Map Integration</h2>
          
          <div class="space-y-4">
            <div class="relative">
              <input 
                v-model="form.mapEmbedUrl" 
                type="url" 
                placeholder=" " 
                class="form-input peer"
              >
              <label class="floating-label">Google Maps Embed URL (optional)</label>
            </div>
            <p class="text-sm text-gray-600">
              Go to Google Maps, search for your location, click "Share" → "Embed a map" and paste the src URL here.
            </p>
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
  title: '',
  subtitle: '',
  phone: '',
  email: '',
  address: '',
  mapEmbedUrl: '',
  bannerImage: ''
})

// Business hours (separate reactive object for easier management)
const businessHours = reactive({
  'Monday': '',
  'Tuesday': '',
  'Wednesday': '',
  'Thursday': '',
  'Friday': '',
  'Saturday': '',
  'Sunday': ''
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
    const response = await $fetch('/api/cms/contact-content')
    
    if (response) {
      form.title = response.title || ''
      form.subtitle = response.subtitle || ''
      form.phone = response.phone || ''
      form.email = response.email || ''
      form.address = response.address || ''
      form.mapEmbedUrl = response.mapEmbedUrl || ''
      form.bannerImage = response.bannerImage || ''
      
      // Parse business hours JSON
      if (response.businessHours) {
        try {
          const hours = JSON.parse(response.businessHours)
          Object.assign(businessHours, hours)
        } catch (e) {
          console.error('Failed to parse business hours:', e)
        }
      }
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
    const payload = {
      ...form,
      businessHours: JSON.stringify(businessHours)
    }

    await $fetch('/api/cms/contact-content', {
      method: 'POST',
      body: payload
    })

    successMessage.value = 'Contact page content updated successfully!'
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
  title: `Edit Contact Page | ${siteSettings.siteName} CMS`,
  robots: 'noindex, nofollow'
})
</script>