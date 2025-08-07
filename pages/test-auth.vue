<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Authentication Test Page</h1>
      
      <div class="space-y-6">
        <div class="card p-6">
          <h2 class="text-xl font-bold mb-4">Cookie Status</h2>
          <p><strong>Auth Token (httpOnly):</strong> {{ !!authToken }}</p>
          <p><strong>Auth Status (accessible):</strong> {{ authStatus || 'None' }}</p>
          <p><strong>Token Length:</strong> {{ authToken?.length || 0 }}</p>
          <p><strong>Token Preview:</strong> {{ authToken?.substring(0, 20) || 'None' }}</p>
        </div>

        <div class="card p-6">
          <h2 class="text-xl font-bold mb-4">Auth State</h2>
          <p><strong>Is Authenticated:</strong> {{ isAuthenticated }}</p>
          <p><strong>User Email:</strong> {{ user?.email || 'None' }}</p>
          <p><strong>Loading:</strong> {{ isLoading }}</p>
        </div>

        <div class="card p-6">
          <h2 class="text-xl font-bold mb-4">API Test</h2>
          <button @click="testAuthApi" class="btn-primary mr-4">Test /api/auth/me</button>
          <button @click="clearCookie" class="btn-secondary">Clear Cookie</button>
          
          <div v-if="apiResult" class="mt-4 p-4 bg-gray-50 rounded">
            <p><strong>API Result:</strong></p>
            <pre>{{ JSON.stringify(apiResult, null, 2) }}</pre>
          </div>
          
          <div v-if="apiError" class="mt-4 p-4 bg-red-50 text-red-700 rounded">
            <p><strong>API Error:</strong></p>
            <pre>{{ apiError }}</pre>
          </div>
        </div>

        <div class="card p-6">
          <h2 class="text-xl font-bold mb-4">Navigation Test</h2>
          <NuxtLink to="/manage" class="btn-primary mr-4">Go to /manage</NuxtLink>
          <NuxtLink to="/login" class="btn-secondary">Go to /login</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const { user, isAuthenticated, isLoading, checkAuth } = useAuth()

// Get auth cookies directly
const authToken = useCookie('auth-token')
const authStatus = useCookie('auth-status')

// API test results
const apiResult = ref(null)
const apiError = ref(null)

// Test the auth API directly
const testAuthApi = async () => {
  apiResult.value = null
  apiError.value = null
  
  try {
    const response = await $fetch('/api/auth/me')
    apiResult.value = response
  } catch (error: any) {
    apiError.value = error.data || error.message || error
  }
}

// Clear cookies for testing
const clearCookie = () => {
  authToken.value = null
  authStatus.value = null
}

// Check auth on mount
onMounted(() => {
  checkAuth()
})

// SEO
useSeoMeta({
  title: 'Auth Test | DigitalFlow',
  robots: 'noindex, nofollow'
})
</script>