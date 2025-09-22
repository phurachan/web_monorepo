<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-very-light to-primary-light flex items-center justify-center p-4" style="display: flex !important; align-items: center !important; justify-content: center !important; min-height: 100vh !important;">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo -->
      <div class="text-center">
        <NuxtLink to="/" class="text-3xl font-bold gradient-text">{{ siteSettings.siteName }}</NuxtLink>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Admin Login</h2>
        <p class="mt-2 text-sm text-gray-600">Sign in to access the CMS dashboard</p>
      </div>

      <!-- Setup Form (shown if no admin exists) -->
      <form v-if="showSetup" @submit.prevent="handleSetup" class="mt-8 space-y-6">
        <div class="card p-8">
          <div class="mb-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Setup Admin Account</h3>
            <p class="text-gray-600">Create the first admin account to access the CMS.</p>
          </div>

          <div class="space-y-4">
            <div class="relative">
              <input 
                v-model="setupForm.name" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Full Name</label>
            </div>

            <div class="relative">
              <input 
                v-model="setupForm.email" 
                type="email" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Email Address</label>
            </div>

            <div class="relative">
              <input 
                v-model="setupForm.password" 
                type="password" 
                placeholder=" " 
                class="form-input peer"
                minlength="6"
                required
              >
              <label class="floating-label">Password (min 6 characters)</label>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="setupLoading"
            class="btn-primary w-full mt-6"
          >
            {{ setupLoading ? 'Creating...' : 'Create Admin Account' }}
          </button>

          <div v-if="setupError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-700 text-sm">{{ setupError }}</p>
          </div>
        </div>
      </form>

      <!-- Login Form -->
      <form v-else @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="card p-8">
          <div class="space-y-4">
            <div class="relative">
              <input 
                v-model="loginForm.email" 
                type="email" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Email Address</label>
            </div>

            <div class="relative">
              <input 
                v-model="loginForm.password" 
                type="password" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Password</label>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="loginLoading"
            class="btn-primary w-full mt-6"
          >
            {{ loginLoading ? 'Signing in...' : 'Sign In' }}
          </button>

          <div v-if="loginError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-700 text-sm">{{ loginError }}</p>
          </div>

          <div class="mt-4 text-center">
            <button 
              @click="checkSetupNeeded" 
              type="button" 
              class="text-sm text-blue-600 hover:text-blue-500"
            >
              Need to setup admin account?
            </button>
          </div>
        </div>
      </form>

      <!-- Success Message -->
      <div v-if="successMessage" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p class="text-green-700 font-medium">{{ successMessage }}</p>
      </div>

      <!-- Back to Home -->
      <div class="text-center">
        <NuxtLink to="/" class="text-blue-600 hover:text-blue-500 text-sm">
          ← Back to Website
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const { login, setupAdmin, isAuthenticated } = useAuth()
const { getSiteSettings } = useCMS()
const { t, initLanguage } = useI18n()
const siteSettings = await getSiteSettings()

// Initialize language system
onMounted(() => {
  initLanguage()
})

// Form data
const loginForm = reactive({
  email: '',
  password: ''
})

const setupForm = reactive({
  name: '',
  email: '',
  password: ''
})

// Component state
const showSetup = ref(false)
const loginLoading = ref(false)
const setupLoading = ref(false)
const loginError = ref('')
const setupError = ref('')
const successMessage = ref('')

// Check if user is already authenticated
watch(isAuthenticated, async (authenticated) => {
  if (authenticated) {
    await navigateTo('/manage')
  }
}, { immediate: true })

// Methods
const handleLogin = async () => {
  loginLoading.value = true
  loginError.value = ''

  const result = await login(loginForm.email, loginForm.password)

  if (result.success) {
    console.log('Login successful, waiting for cookie to be set...')
    
    // Wait a moment for the cookie to be set, then redirect
    setTimeout(async () => {
      console.log('Redirecting to /manage')
      await navigateTo('/manage', { replace: true })
    }, 500)
  } else {
    loginError.value = result.error
    loginLoading.value = false
  }
}

const handleSetup = async () => {
  setupLoading.value = true
  setupError.value = ''

  const result = await setupAdmin(
    setupForm.email, 
    setupForm.password, 
    setupForm.name
  )

  if (result.success) {
    successMessage.value = 'Admin account created successfully! You can now login.'
    showSetup.value = false
    // Reset setup form
    setupForm.name = ''
    setupForm.email = ''
    setupForm.password = ''
  } else {
    setupError.value = result.error
  }

  setupLoading.value = false
}

const checkSetupNeeded = () => {
  showSetup.value = true
  loginError.value = ''
}

// SEO
useSeoMeta({
  title: `Admin Login | ${siteSettings.siteName} CMS`,
  description: `Login to access the ${siteSettings.siteName} CMS dashboard`,
  robots: 'noindex, nofollow'
})
</script>


