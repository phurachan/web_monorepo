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
            <h1 class="text-xl font-semibold text-gray-900">Edit Team Page Content</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <NuxtLink to="/team" target="_blank" class="btn-secondary">View Live</NuxtLink>
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

      <!-- Language Switcher -->
      <div v-else class="card p-4 mb-8">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Content Language</h3>
          <div class="flex items-center bg-gray-100 rounded-lg p-1">
            <button 
              @click="currentLanguage = 'en'"
              type="button"
              :class="currentLanguage === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              🇺🇸 English
            </button>
            <button 
              @click="currentLanguage = 'th'"
              type="button"
              :class="currentLanguage === 'th' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              🇹🇭 ไทย
            </button>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-2">
          Switch between languages to edit content. {{ currentLanguage === 'en' ? 'Editing English content' : 'กำลังแก้ไขเนื้อหาภาษาไทย' }}
        </p>
      </div>

      <!-- Form -->
      <form v-if="!loading" @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Hero Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Hero Section</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="formData.heroTitle[currentLanguage]" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Hero Title ({{ currentLanguage.toUpperCase() }})</label>
            </div>

            <div class="relative">
              <textarea 
                v-model="formData.heroSubtitle[currentLanguage]" 
                placeholder=" " 
                rows="3" 
                class="form-input resize-none peer"
                required
              ></textarea>
              <label class="floating-label">Hero Subtitle ({{ currentLanguage.toUpperCase() }})</label>
            </div>
            
            <!-- Hero Background Image -->
            <div>
              <label class="form-label">Hero Background Image</label>
              <ImageUpload 
                v-model="formData.heroImage" 
                label="Hero Section Background (optional)"
                help-text="Recommended: High-quality image, 1920x1080px or larger. Will be used as background for the hero section."
              />
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

// Language state
const currentLanguage = ref('en')

// Multi-language form data
const formData = reactive({
  // Text fields as JSON {en: "English", th: "Thai"}
  heroTitle: { en: '', th: '' },
  heroSubtitle: { en: '', th: '' },
  // Images (language-neutral)
  heroImage: ''
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

// Helper function to parse JSON with fallback
const parseJsonField = (jsonString, fallback) => {
  try {
    const parsed = JSON.parse(jsonString || '{}')
    return typeof parsed === 'object' && parsed !== null ? parsed : fallback
  } catch {
    return fallback
  }
}

const loadContent = async () => {
  try {
    const response = await $fetch('/api/cms/team-content')
    
    if (response) {
      // Parse multi-language text fields
      formData.heroTitle = parseJsonField(response.heroTitle, { en: '', th: '' })
      formData.heroSubtitle = parseJsonField(response.heroSubtitle, { en: '', th: '' })
      
      // Images (language-neutral)
      formData.heroImage = response.heroImage || ''
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
    // Prepare form data with JSON stringified multi-language fields
    const submitData = {
      // Text fields as JSON strings
      heroTitle: JSON.stringify(formData.heroTitle),
      heroSubtitle: JSON.stringify(formData.heroSubtitle),
      // Images (language-neutral)
      heroImage: formData.heroImage
    }

    await $fetch('/api/cms/team-content', {
      method: 'POST',
      body: submitData
    })

    successMessage.value = 'Team page content updated successfully!'
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
  title: `Edit Team Content | ${siteSettings.siteName} CMS`,
  robots: 'noindex, nofollow'
})
</script>