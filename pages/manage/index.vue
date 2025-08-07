<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-8">
            <NuxtLink to="/" class="text-2xl font-bold gradient-text">{{ siteSettings.siteName }}</NuxtLink>
            <span class="text-gray-400">|</span>
            <span class="text-gray-600">CMS Dashboard</span>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Welcome, {{ user?.name || user?.email }}</span>
            <button @click="handleLogout" class="btn-secondary">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Content Management System</h1>
        <p class="text-gray-600 mt-2">Manage your website content, images, and settings</p>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6zM21 7L9 7l-6 0"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Total Pages</p>
              <p class="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>
        
        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Services</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.services }}</p>
            </div>
          </div>
        </div>
        
        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">People</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.teamMembers }}</p>
            </div>
          </div>
        </div>
        
        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">FAQs</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.faqs }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Management Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Home Page -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Home Page</h3>
          </div>
          <p class="text-gray-600 mb-4">Manage hero section, about preview, and call-to-action content</p>
          <NuxtLink to="/manage/home" class="btn-primary">Edit Content</NuxtLink>
        </div>

        <!-- Services -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Services</h3>
          </div>
          <p class="text-gray-600 mb-4">Add, edit, and organize your service offerings and descriptions</p>
          <NuxtLink to="/manage/services" class="btn-primary">Manage Services</NuxtLink>
        </div>

        <!-- About Page -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">About Page</h3>
          </div>
          <p class="text-gray-600 mb-4">Update company mission, values, and team information</p>
          <NuxtLink to="/manage/about" class="btn-primary">Edit Content</NuxtLink>
        </div>

        <!-- People -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">People</h3>
          </div>
          <p class="text-gray-600 mb-4">Manage people profiles, photos, and descriptions - perfect for team members, customers, or partners</p>
          <NuxtLink to="/manage/team" class="btn-primary">Manage People</NuxtLink>
        </div>

        <!-- Contact Page -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Contact Page</h3>
          </div>
          <p class="text-gray-600 mb-4">Update contact information, business hours, and location details</p>
          <NuxtLink to="/manage/contact" class="btn-primary">Edit Contact</NuxtLink>
        </div>

        <!-- FAQs -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">FAQs</h3>
          </div>
          <p class="text-gray-600 mb-4">Manage frequently asked questions displayed on contact page</p>
          <NuxtLink to="/manage/faqs" class="btn-primary">Manage FAQs</NuxtLink>
        </div>

        <!-- Site Settings -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Site Settings</h3>
          </div>
          <p class="text-gray-600 mb-4">Configure site name, logo, colors, and social media links</p>
          <NuxtLink to="/manage/settings" class="btn-primary">Site Settings</NuxtLink>
        </div>
      </div>

      <!-- Page Links -->
      <div class="mt-8 grid md:grid-cols-2 gap-6">
        <!-- Direct Page Links -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Visit Pages</h3>
          <div class="grid grid-cols-2 gap-3">
            <NuxtLink to="/" target="_blank" class="btn-secondary flex items-center justify-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Home
            </NuxtLink>
            
            <NuxtLink to="/services" target="_blank" class="btn-secondary flex items-center justify-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Services
            </NuxtLink>
            
            <NuxtLink to="/about" target="_blank" class="btn-secondary flex items-center justify-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              About
            </NuxtLink>
            
            <NuxtLink to="/contact" target="_blank" class="btn-secondary flex items-center justify-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Contact
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: false
})

const { user, logout, checkAuth } = useAuth()
const { getSiteSettings } = useCMS()
const siteSettings = await getSiteSettings()

// Stats data
const stats = ref({
  services: 0,
  teamMembers: 0,
  faqs: 0
})

// Load stats on mount
onMounted(async () => {
  await checkAuth()
  await loadStats()
})

const loadStats = async () => {
  try {
    // const { $fetch } = useNuxtApp()
    
    const [servicesRes, teamRes, faqRes] = await Promise.all([
      $fetch('/api/cms/services'),
      $fetch('/api/cms/team'),
      $fetch('/api/cms/faqs')
    ])

    stats.value = {
      services: servicesRes?.length || 0,
      teamMembers: teamRes?.length || 0,
      faqs: faqRes?.length || 0
    }
  } catch (error) {
    console.error('Failed to load stats:', error)
    // Set default values if API calls fail
    stats.value = {
      services: 0,
      teamMembers: 0,
      faqs: 0
    }
  }
}

const handleLogout = async () => {
  await logout()
}

// SEO
useSeoMeta({
  title: `CMS Dashboard | ${siteSettings.siteName}`,
  description: `Content Management System dashboard for ${siteSettings.siteName}`,
  robots: 'noindex, nofollow'
})
</script>