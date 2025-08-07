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
            <h1 class="text-xl font-semibold text-gray-900">Manage People</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <button @click="openAddModal" class="btn-primary">Add Person</button>
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

      <!-- People List -->
      <div v-else class="space-y-6">
        <div v-for="member in teamMembers" :key="member.id" class="card p-6">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4 flex-1">
              <!-- Member Image -->
              <div class="flex-shrink-0">
                <div v-if="member.image" class="w-16 h-16 rounded-full overflow-hidden">
                  <img :src="member.image" :alt="member.name" class="w-full h-full object-cover">
                </div>
                <div v-else class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>
              
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-xl font-bold text-gray-900">{{ member.name }}</h3>
                  <span v-if="!member.isActive" class="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Inactive</span>
                </div>
                
                <p class="text-blue-600 font-medium mb-2">{{ member.position }}</p>
                <p class="text-gray-600 mb-4">{{ member.description }}</p>
                
                <!-- Social Links -->
                <div class="flex items-center space-x-4 mb-4">
                  <a v-if="member.email" :href="`mailto:${member.email}`" class="text-gray-500 hover:text-blue-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </a>
                  <a v-if="member.linkedin" :href="member.linkedin" target="_blank" class="text-gray-500 hover:text-blue-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a v-if="member.twitter" :href="member.twitter" target="_blank" class="text-gray-500 hover:text-blue-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>

                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Order: {{ member.order }}</span>
                  <span>•</span>
                  <span>Updated: {{ formatDate(member.updatedAt) }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-2 ml-4">
              <button 
                @click="editMember(member)"
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              
              <button 
                @click="toggleMemberStatus(member)"
                :class="member.isActive ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'"
                class="p-2 rounded-lg"
              >
                <svg v-if="member.isActive" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </button>
              
              <button 
                @click="deleteMember(member)"
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
        <div v-if="teamMembers.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No people added</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by adding your first person.</p>
          <button @click="openAddModal" class="btn-primary mt-4">Add Person</button>
        </div>
      </div>
    </div>

    <!-- Person Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">
              {{ editingMember ? 'Edit Person' : 'Add New Person' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="saveMember" class="space-y-6">
            <div class="relative">
              <input 
                v-model="memberForm.name" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Full Name</label>
            </div>

            <div class="relative">
              <input 
                v-model="memberForm.position" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Position/Title</label>
            </div>

            <div class="relative">
              <textarea 
                v-model="memberForm.description" 
                placeholder=" " 
                rows="3" 
                class="form-input resize-none peer"
                required
              ></textarea>
              <label class="floating-label">Bio/Description</label>
            </div>

            <div class="relative">
              <input 
                v-model="memberForm.image" 
                type="url" 
                placeholder=" " 
                class="form-input peer"
              >
              <label class="floating-label">Profile Image URL</label>
            </div>

            <div class="relative">
              <input 
                v-model="memberForm.email" 
                type="email" 
                placeholder=" " 
                class="form-input peer"
              >
              <label class="floating-label">Email Address</label>
            </div>

            <div class="relative">
              <input 
                v-model="memberForm.linkedin" 
                type="url" 
                placeholder=" " 
                class="form-input peer"
              >
              <label class="floating-label">LinkedIn URL</label>
            </div>

            <div class="relative">
              <input 
                v-model="memberForm.twitter" 
                type="url" 
                placeholder=" " 
                class="form-input peer"
              >
              <label class="floating-label">Twitter URL</label>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="relative">
                <input 
                  v-model.number="memberForm.order" 
                  type="number" 
                  placeholder=" " 
                  class="form-input peer"
                  min="0"
                >
                <label class="floating-label">Display Order</label>
              </div>

              <div class="flex items-center space-x-3">
                <input 
                  v-model="memberForm.isActive" 
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
                {{ saving ? 'Saving...' : 'Save Person' }}
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
definePageMeta({
  middleware: 'auth',
  layout: false
})

const { logout } = useAuth()
const { getSiteSettings } = useCMS()
const siteSettings = await getSiteSettings()

// Data
const teamMembers = ref([])
const loading = ref(true)
const saving = ref(false)
const showModal = ref(false)
const editingMember = ref(null)
const successMessage = ref('')
const errorMessage = ref('')

// Team member form
const memberForm = reactive({
  name: '',
  position: '',
  description: '',
  image: '',
  email: '',
  linkedin: '',
  twitter: '',
  order: 0,
  isActive: true
})

// Methods
onMounted(async () => {
  await loadTeamMembers()
})

const loadTeamMembers = async () => {
  try {
    const data = await $fetch('/api/cms/team')
    teamMembers.value = data
  } catch (error) {
    errorMessage.value = 'Failed to load team members'
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  editingMember.value = null
  resetForm()
  showModal.value = true
}

const editMember = (member) => {
  editingMember.value = member
  memberForm.name = member.name
  memberForm.position = member.position
  memberForm.description = member.description
  memberForm.image = member.image || ''
  memberForm.email = member.email || ''
  memberForm.linkedin = member.linkedin || ''
  memberForm.twitter = member.twitter || ''
  memberForm.order = member.order
  memberForm.isActive = member.isActive
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingMember.value = null
  resetForm()
}

const resetForm = () => {
  memberForm.name = ''
  memberForm.position = ''
  memberForm.description = ''
  memberForm.image = ''
  memberForm.email = ''
  memberForm.linkedin = ''
  memberForm.twitter = ''
  memberForm.order = 0
  memberForm.isActive = true
}

const saveMember = async () => {
  saving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const memberData = {
      name: memberForm.name,
      position: memberForm.position,
      description: memberForm.description,
      image: memberForm.image,
      email: memberForm.email,
      linkedin: memberForm.linkedin,
      twitter: memberForm.twitter,
      order: memberForm.order,
      isActive: memberForm.isActive
    }

    if (editingMember.value) {
      await $fetch(`/api/cms/team/${editingMember.value.id}`, {
        method: 'PUT',
        body: memberData
      })
      successMessage.value = 'Person updated successfully!'
    } else {
      await $fetch('/api/cms/team', {
        method: 'POST',
        body: memberData
      })
      successMessage.value = 'Person created successfully!'
    }

    closeModal()
    await loadTeamMembers()
  } catch (error) {
    errorMessage.value = 'Failed to save team member'
  } finally {
    saving.value = false
  }
}

const toggleMemberStatus = async (member) => {
  try {
    await $fetch(`/api/cms/team/${member.id}`, {
      method: 'PUT',
      body: {
        ...member,
        isActive: !member.isActive
      }
    })
    
    successMessage.value = `Person ${member.isActive ? 'deactivated' : 'activated'} successfully!`
    await loadTeamMembers()
  } catch (error) {
    errorMessage.value = 'Failed to update team member status'
  }
}

const deleteMember = async (member) => {
  if (confirm(`Are you sure you want to delete "${member.name}"?`)) {
    try {
      await $fetch(`/api/cms/team/${member.id}`, {
        method: 'DELETE'
      })
      
      successMessage.value = 'Person deleted successfully!'
      await loadTeamMembers()
    } catch (error) {
      errorMessage.value = 'Failed to delete team member'
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
  title: `Manage People | ${siteSettings.siteName} CMS`,
  robots: 'noindex, nofollow'
})
</script>