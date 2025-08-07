<template>
  <div class="min-h-screen">
    <!-- Top Navbar -->
    <TopNavbar />
    
    <!-- Navigation -->
    <nav class="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100" style="top: 40px;">
      <div class="container">
        <div class="flex justify-between items-center py-4">
          <NuxtLink to="/" class="text-2xl font-bold gradient-text">{{ siteSettings.siteName }}</NuxtLink>
          <div class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.home') }}</NuxtLink>
            <NuxtLink to="/services" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.services') }}</NuxtLink>
            <NuxtLink to="/about" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.about') }}</NuxtLink>
            <NuxtLink to="/team" class="text-blue-500 font-medium">{{ t('nav.team') }}</NuxtLink>
            <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.contact') }}</NuxtLink>
          </div>
          <button class="btn-primary hidden md:block">{{ t('common.getStarted') }}</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="section-padding gradient-bg text-white" style="padding-top: 140px;">
      <div class="container text-center">
        <h1 class="text-4xl lg:text-5xl font-bold mb-6">{{ t('team.meetPeople') }}</h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">
          {{ t('team.talentedTeam') }}
        </p>
      </div>
    </section>

    <!-- Team Section -->
    <section class="section-padding">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <!-- People Grid -->
        <div v-else-if="teamMembers.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="member in teamMembers" :key="member.id" class="card group hover:shadow-xl transition-all duration-300">
            <!-- Member Image -->
            <div class="relative overflow-hidden rounded-t-xl">
              <div v-if="member.image" class="aspect-square">
                <img 
                  :src="member.image" 
                  :alt="member.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                >
              </div>
              <div v-else class="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <svg class="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>

            <!-- Member Info -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-1">{{ member.name }}</h3>
              <p class="text-blue-600 font-medium mb-3">{{ member.position }}</p>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ member.description }}</p>

              <!-- Social Links -->
              <div class="flex space-x-3">
                <a 
                  v-if="member.email" 
                  :href="`mailto:${member.email}`" 
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </a>
                <a 
                  v-if="member.linkedin" 
                  :href="member.linkedin" 
                  target="_blank"
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  v-if="member.twitter" 
                  :href="member.twitter" 
                  target="_blank"
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h3>
          <p class="text-gray-600">We're building our showcase. Check back soon to meet the people behind our success!</p>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Our Values</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide our people and shape our approach to excellence
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
            <p class="text-gray-600">We stay ahead of digital trends and constantly explore new strategies to keep your business competitive.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
            <p class="text-gray-600">We deliver high-quality work and measurable results, ensuring every campaign exceeds expectations.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Collaboration</h3>
            <p class="text-gray-600">We work closely with our clients as partners, ensuring transparent communication and shared success.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding gradient-bg text-white">
      <div class="container text-center">
        <h2 class="text-3xl lg:text-4xl font-bold mb-6">{{ t('team.readyToWork') }}</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {{ t('team.letTalentedPeople') }}
        </p>
        <NuxtLink to="/contact" class="btn-primary bg-white text-blue-600 hover:bg-gray-100">{{ t('common.getInTouch') }}</NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <div class="text-2xl font-bold mb-4">{{ siteSettings.siteName }}</div>
            <p class="text-gray-400 mb-4">{{ t('footer.elevatingBrands') }}</p>
            <div class="grid grid-cols-3 gap-3 max-w-[156px]">
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <img src="/social_icons/icons8-facebook-50.png" alt="Facebook" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                <img src="/social_icons/icons8-instagram-50.png" alt="Instagram" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                <img src="/social_icons/icons8-line-50.png" alt="Line" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-colors">
                <img src="/social_icons/icons8-tiktok-50.png" alt="TikTok" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <img src="/social_icons/icons8-youtube-50.png" alt="YouTube" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <img src="/social_icons/icons8-linkedin-circled-50.png" alt="LinkedIn" class="w-7 h-7 object-contain">
              </a>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">{{ t('footer.services') }}</h4>
            <ul class="space-y-2 text-gray-400">
              <li><NuxtLink to="/services" class="hover:text-white transition-colors">{{ t('footer.seoOptimization') }}</NuxtLink></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.socialMediaMarketing') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.webDevelopment') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.ppcAdvertising') }}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">{{ t('footer.company') }}</h4>
            <ul class="space-y-2 text-gray-400">
              <li><NuxtLink to="/about" class="hover:text-white transition-colors">{{ t('footer.aboutUs') }}</NuxtLink></li>
              <li><NuxtLink to="/team" class="hover:text-white transition-colors">{{ t('footer.ourPeople') }}</NuxtLink></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.careers') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.blog') }}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">{{ t('footer.contact') }}</h4>
            <ul class="space-y-2 text-gray-400">
              <li>+1 (555) 123-4567</li>
              <li>hello@digitalflow.com</li>
              <li>123 Innovation Drive<br>Tech Valley, CA 94105</li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 {{ siteSettings.siteName }}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Fetch team members and site settings from API
const teamMembers = await $fetch('/api/cms/team')
const { getSiteSettings } = useCMS()
const { t, initLanguage } = useI18n()
const siteSettings = await getSiteSettings()
const loading = ref(false)

// Initialize language system
onMounted(() => {
  initLanguage()
})

useSeoMeta({
  title: `Our People | ${siteSettings.siteName} - Meet Our Talented Team`,
  description: `Meet the talented people at ${siteSettings.siteName}. Our experienced professionals are dedicated to helping you achieve success and drive exceptional results.`,
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>