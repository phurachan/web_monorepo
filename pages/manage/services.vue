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
            <h1 class="text-xl font-semibold text-gray-900">Manage Services</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <button @click="openAddModal" class="btn-primary">Add Service</button>
            <NuxtLink to="/services" target="_blank" class="btn-secondary">View Live</NuxtLink>
            <button @click="handleLogout" class="btn-secondary">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Services List -->
      <div v-else class="space-y-6">
        <div v-for="service in services" :key="service.id" class="card p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-3">
                <div 
                  class="w-4 h-4 rounded-full border-2 border-white shadow"
                  :style="{ backgroundColor: service.color || '#6495ed' }"
                ></div>
                <h3 class="text-xl font-bold text-gray-900">{{ service.title }}</h3>
                <span v-if="!service.isActive" class="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Inactive</span>
              </div>
              
              <p class="text-gray-600 mb-4">{{ service.description }}</p>
              
              <div v-if="service.features?.length" class="mb-4">
                <p class="text-sm font-medium text-gray-700 mb-2">Features:</p>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="feature in service.features" 
                    :key="feature"
                    class="px-3 py-1 text-sm rounded-full text-white"
                    :style="{ backgroundColor: service.color || '#6495ed', opacity: 0.9 }"
                  >
                    {{ feature }}
                  </span>
                </div>
              </div>

              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span>Order: {{ service.order }}</span>
                <span>•</span>
                <span>Updated: {{ formatDate(service.updatedAt) }}</span>
              </div>
            </div>

            <div class="flex items-center space-x-2 ml-4">
              <button 
                @click="editService(service)"
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              
              <button 
                @click="toggleServiceStatus(service)"
                :class="service.isActive ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'"
                class="p-2 rounded-lg"
              >
                <svg v-if="service.isActive" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </button>
              
              <button 
                @click="deleteService(service)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="services.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No services</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating your first service.</p>
          <button @click="openAddModal" class="btn-primary mt-4">Add Service</button>
        </div>
      </div>
    </div>

    <!-- Service Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">
              {{ editingService ? 'Edit Service' : 'Add New Service' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Language Switcher -->
          <div class="bg-gray-50 p-4 rounded-lg mb-6">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium text-gray-900">Content Language</h3>
              <div class="flex items-center bg-white rounded-lg p-1 border">
                <button 
                  @click="currentLanguage = 'en'"
                  type="button"
                  :class="currentLanguage === 'en' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'"
                  class="px-3 py-1 rounded-md text-xs font-medium transition-colors"
                >
                  🇺🇸 EN
                </button>
                <button 
                  @click="currentLanguage = 'th'"
                  type="button"
                  :class="currentLanguage === 'th' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'"
                  class="px-3 py-1 rounded-md text-xs font-medium transition-colors"
                >
                  🇹🇭 TH
                </button>
              </div>
            </div>
          </div>

          <form @submit.prevent="saveService" class="space-y-6">
            <div class="relative">
              <input 
                v-model="serviceFormData.title[currentLanguage]" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Service Title ({{ currentLanguage.toUpperCase() }})</label>
            </div>

            <div class="relative">
              <textarea 
                v-model="serviceFormData.description[currentLanguage]" 
                placeholder=" " 
                rows="3" 
                class="form-input resize-none peer"
                required
              ></textarea>
              <label class="floating-label">Description ({{ currentLanguage.toUpperCase() }})</label>
            </div>

            <div class="relative">
              <input 
                v-model="serviceFormData.icon" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
              >
              <label class="floating-label">Icon Name (e.g., search, social, code)</label>
            </div>

            <div>
              <label class="form-label">Service Image</label>
              <ImageUpload 
                v-model="serviceFormData.image" 
                label="Service Image (optional)"
                help-text="Optional image for the service. Will be displayed in service cards and details."
              />
            </div>

            <!-- Color Picker -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Card Color</label>
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <input 
                    v-model="serviceFormData.color" 
                    type="color" 
                    class="w-16 h-16 border-2 border-gray-300 rounded-lg cursor-pointer"
                  >
                </div>
                <div class="flex-1">
                  <input 
                    v-model="serviceFormData.color" 
                    type="text" 
                    placeholder="#6495ed" 
                    class="form-input"
                    pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                  >
                  <p class="text-xs text-gray-500 mt-1">This color will be used for the service card's accent color</p>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Features ({{ currentLanguage.toUpperCase() }})</label>
              <div class="space-y-2">
                <div v-for="(feature, index) in serviceFormData.features" :key="index" class="flex space-x-2">
                  <input 
                    v-model="serviceFormData.features[index][currentLanguage]" 
                    type="text" 
                    class="form-input flex-1"
                    :placeholder="`Feature ${index + 1} (${currentLanguage.toUpperCase()})`"
                  >
                  <button 
                    @click="removeFeature(index)"
                    type="button"
                    class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
                <button 
                  @click="addFeature"
                  type="button"
                  class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
                >
                  + Add Feature
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="relative">
                <input 
                  v-model.number="serviceFormData.order" 
                  type="number" 
                  placeholder=" " 
                  class="form-input peer"
                  min="0"
                >
                <label class="floating-label">Display Order</label>
              </div>

              <div class="flex items-center space-x-3">
                <input 
                  v-model="serviceFormData.isActive" 
                  type="checkbox" 
                  id="isActive"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                >
                <label for="isActive" class="text-sm font-medium text-gray-700">Active</label>
              </div>
            </div>

            <div class="flex justify-end space-x-4 pt-4 border-t">
              <button @click="closeModal" type="button" class="btn-secondary">Cancel</button>
              <button type="submit" :disabled="saving" class="btn-primary">
                {{ saving ? 'Saving...' : 'Save Service' }}
              </button>
            </div>
          </form>
        </div>
      </div>
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
import { API_ENDPOINTS, buildApiUrl } from '~/constants/api'

definePageMeta({
  middleware: 'auth',
  layout: false
})

const { logout } = useAuth()
const { getSiteSettings } = useCMS()
const siteSettings = await getSiteSettings()

// Data
const services = ref([])
const loading = ref(true)
const saving = ref(false)
const showModal = ref(false)
const editingService = ref(null)
const successMessage = ref('')
const errorMessage = ref('')

// Language state for modal
const currentLanguage = ref('en')

// Multi-language service form
const serviceFormData = reactive({
  // Text fields as JSON {en: "English", th: "Thai"}
  title: { en: '', th: '' },
  description: { en: '', th: '' },
  // Features array with multi-language support
  features: [{ en: '', th: '' }],
  // Language-neutral fields
  icon: '',
  image: '',
  color: '#6495ed',
  order: 0,
  isActive: true
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

// Methods
onMounted(async () => {
  await loadServices()
})

const loadServices = async () => {
  try {
    // const { $fetch } = useNuxtApp()
    const data = await $fetch(buildApiUrl(API_ENDPOINTS.CMS.SERVICES.GET))
    // Ensure features are parsed as arrays (fallback parsing)
    services.value = data.map(service => ({
      ...service,
      features: typeof service.features === 'string' 
        ? JSON.parse(service.features) 
        : Array.isArray(service.features) 
          ? service.features 
          : []
    }))
  } catch (error) {
    errorMessage.value = 'Failed to load services'
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  editingService.value = null
  resetForm()
  showModal.value = true
}

const editService = (service) => {
  editingService.value = service
  
  // Parse multi-language fields
  serviceFormData.title = parseJsonField(service.title, { en: '', th: '' })
  serviceFormData.description = parseJsonField(service.description, { en: '', th: '' })
  
  // Parse features array
  const features = typeof service.features === 'string' ? JSON.parse(service.features) : service.features
  if (features.length > 0) {
    serviceFormData.features = features.map(feature => 
      typeof feature === 'object' ? feature : { en: feature || '', th: '' }
    )
  } else {
    serviceFormData.features = [{ en: '', th: '' }]
  }
  
  // Language-neutral fields
  serviceFormData.icon = service.icon || ''
  serviceFormData.image = service.image || ''
  serviceFormData.color = service.color || '#6495ed'
  serviceFormData.order = service.order
  serviceFormData.isActive = service.isActive
  
  currentLanguage.value = 'en'
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingService.value = null
  resetForm()
}

const resetForm = () => {
  serviceFormData.title = { en: '', th: '' }
  serviceFormData.description = { en: '', th: '' }
  serviceFormData.features = [{ en: '', th: '' }]
  serviceFormData.icon = ''
  serviceFormData.image = ''
  serviceFormData.color = '#6495ed'
  serviceFormData.order = 0
  serviceFormData.isActive = true
  currentLanguage.value = 'en'
}

const addFeature = () => {
  serviceFormData.features.push({ en: '', th: '' })
}

const removeFeature = (index) => {
  if (serviceFormData.features.length > 1) {
    serviceFormData.features.splice(index, 1)
  }
}

const saveService = async () => {
  saving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    // Filter out empty features and prepare multi-language data
    const filteredFeatures = serviceFormData.features.filter(feature => 
      feature.en.trim() || feature.th.trim()
    )
    
    const serviceData = {
      // Multi-language fields as JSON strings
      title: JSON.stringify(serviceFormData.title),
      description: JSON.stringify(serviceFormData.description),
      features: JSON.stringify(filteredFeatures),
      // Language-neutral fields
      icon: serviceFormData.icon,
      image: serviceFormData.image,
      color: serviceFormData.color,
      order: serviceFormData.order,
      isActive: serviceFormData.isActive
    }

    if (editingService.value) {
      await $fetch(buildApiUrl(API_ENDPOINTS.CMS.SERVICES.PUT(editingService.value.id)), {
        method: 'PUT',
        body: serviceData
      })
      successMessage.value = 'Service updated successfully!'
    } else {
      await $fetch(buildApiUrl(API_ENDPOINTS.CMS.SERVICES.POST), {
        method: 'POST',
        body: serviceData
      })
      successMessage.value = 'Service created successfully!'
    }

    closeModal()
    await loadServices()
  } catch (error) {
    errorMessage.value = 'Failed to save service'
  } finally {
    saving.value = false
  }
}

const toggleServiceStatus = async (service) => {
  try {
    // const { $fetch } = useNuxtApp()
    await $fetch(buildApiUrl(API_ENDPOINTS.CMS.SERVICES.PUT(service.id)), {
      method: 'PUT',
      body: {
        ...service,
        features: service.features,
        isActive: !service.isActive
      }
    })
    
    successMessage.value = `Service ${service.isActive ? 'deactivated' : 'activated'} successfully!`
    await loadServices()
  } catch (error) {
    errorMessage.value = 'Failed to update service status'
  }
}

const deleteService = async (service) => {
  if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
    try {
      // const { $fetch } = useNuxtApp()
      await $fetch(buildApiUrl(API_ENDPOINTS.CMS.SERVICES.DELETE(service.id)), {
        method: 'DELETE'
      })
      
      successMessage.value = 'Service deleted successfully!'
      await loadServices()
    } catch (error) {
      errorMessage.value = 'Failed to delete service'
    }
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
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
  title: `Manage Services | ${siteSettings.siteName} CMS`,
  robots: 'noindex, nofollow'
})
</script>